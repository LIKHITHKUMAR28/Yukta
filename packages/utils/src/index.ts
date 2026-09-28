export function formatDate(dateString: string): string {
  if (!dateString) return ""
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return dateString
  }
}

export function formatPrice(price: number | string): string {
  if (typeof price === "string") {
    if (price.toLowerCase() === "free") return "Free"
    return price
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function truncateText(text: string, length: number): string {
  if (!text) return ""
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}
