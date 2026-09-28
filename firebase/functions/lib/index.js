"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollUserAutomated = exports.paymentWebhook = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");
admin.initializeApp();
const db = admin.firestore();
// Constant / Config for webhook signature validation
const WEBHOOK_SECRET = process.env.PAYMENT_WEBHOOK_SECRET || "eduos-payment-webhook-secret-production";
/**
 * 1. Hardened Payment Webhook with Signature Verification & Input Validation
 * Addresses SEC-09, SEC-10, SEC-12, and SEC-16.
 */
exports.paymentWebhook = functions
    .runWith({ maxInstances: 10, timeoutSeconds: 30, memory: "256MB" })
    .https.onRequest(async (req, res) => {
    // Enforce POST method only
    if (req.method !== "POST") {
        res.status(405).send({ success: false, error: "Method Not Allowed" });
        return;
    }
    // SEC-09: Cryptographic Webhook Signature Verification
    const signature = (req.headers["x-webhook-signature"] || req.headers["x-signature"]);
    if (!signature) {
        functions.logger.warn("Payment Webhook rejected: Missing x-webhook-signature header");
        res.status(401).send({ success: false, error: "Unauthorized: Missing webhook signature" });
        return;
    }
    try {
        const payloadString = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
        const computedHmac = crypto
            .createHmac("sha256", WEBHOOK_SECRET)
            .update(payloadString)
            .digest("hex");
        const signatureBuffer = Buffer.from(signature, "hex");
        const computedBuffer = Buffer.from(computedHmac, "hex");
        if (signatureBuffer.length !== computedBuffer.length ||
            !crypto.timingSafeEqual(signatureBuffer, computedBuffer)) {
            functions.logger.warn("Payment Webhook rejected: Invalid cryptographic signature");
            res.status(403).send({ success: false, error: "Forbidden: Signature verification failed" });
            return;
        }
    }
    catch (sigErr) {
        functions.logger.error("Error during signature verification:", sigErr);
        res.status(403).send({ success: false, error: "Forbidden: Signature evaluation error" });
        return;
    }
    const { event, data } = req.body || {};
    if (event === "payment.success") {
        // SEC-10: Input Validation & Sanitization
        if (!data || typeof data !== "object") {
            res.status(400).send({ success: false, error: "Malformed payload data" });
            return;
        }
        const { studentId, courseId, amount, gateway, txnId } = data;
        const idRegex = /^[a-zA-Z0-9_-]{3,64}$/;
        if (typeof studentId !== "string" || !idRegex.test(studentId) ||
            typeof courseId !== "string" || !idRegex.test(courseId) ||
            typeof txnId !== "string" || !idRegex.test(txnId) ||
            typeof amount !== "number" || amount <= 0 ||
            typeof gateway !== "string") {
            res.status(400).send({ success: false, error: "Invalid payment field parameters" });
            return;
        }
        try {
            const enrollmentId = `${studentId}_${courseId}`;
            const batch = db.batch();
            // 1. Log Payment transaction
            const paymentRef = db.collection("payments").doc(txnId);
            batch.set(paymentRef, {
                id: txnId,
                studentId,
                courseId,
                amount,
                status: "success",
                gateway,
                createdAt: new Date().toISOString(),
            });
            // 2. Update Enrollment to active
            const enrollmentRef = db.collection("enrollments").doc(enrollmentId);
            batch.set(enrollmentRef, {
                id: enrollmentId,
                studentId,
                courseId,
                status: "active",
                enrolledAt: new Date().toISOString(),
                progressPercentage: 0,
            }, { merge: true });
            // 3. Initialize Progress
            const progressRef = db.collection("progress").doc(enrollmentId);
            batch.set(progressRef, {
                id: enrollmentId,
                studentId,
                courseId,
                completedLessons: [],
                notes: {},
                quizScores: {},
                updatedAt: new Date().toISOString(),
            }, { merge: true });
            await batch.commit();
            functions.logger.info(`Successfully verified and processed payment for enrollment: ${enrollmentId}`);
            res.status(200).send({ success: true, message: "Webhook processed and enrolled." });
            return;
        }
        catch (error) {
            // SEC-16: Never leak internal database errors or stack traces to client
            functions.logger.error("Payment Webhook execution failed:", {
                message: error?.message,
                stack: error?.stack,
            });
            res.status(500).send({ success: false, error: "Internal processing error. Reference logged." });
            return;
        }
    }
    res.status(400).send({ success: false, message: "Unhandled webhook event type." });
});
/**
 * 2. Automate Course Enrolling on direct manual creation
 */
exports.enrollUserAutomated = functions.firestore
    .document("enrollments/{enrollmentId}")
    .onCreate(async (snapshot, context) => {
    const enrollmentData = snapshot.data();
    if (!enrollmentData)
        return;
    const { studentId, courseId } = enrollmentData;
    try {
        functions.logger.info(`Automating resources check for Student: ${studentId}, Course: ${courseId}`);
        await db.collection("notifications").add({
            recipientId: studentId,
            type: "enrollment_success",
            title: "Welcome to your new Program!",
            message: "You have been enrolled successfully. Click here to launch the Course Player.",
            read: false,
            createdAt: new Date().toISOString(),
        });
    }
    catch (err) {
        functions.logger.error("Failed to automate enrollment post-actions:", err);
    }
});
//# sourceMappingURL=index.js.map