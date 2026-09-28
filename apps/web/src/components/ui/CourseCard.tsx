import React from "react"
import { Link } from "react-router-dom"
import { Badge } from "./Badge"
import { Button } from "./Button"

export interface CourseCardProps {
  id: string
  code: string
  title: string
  department: string
  level: string
  term: string
  credits: string
  duration: string
  instructor: string
  spec: string
  thumbnailUrl: string
  progressPercent?: number
  progressLabel?: string
}

export const CourseCard: React.FC<CourseCardProps> = ({
  id,
  code,
  title,
  department,
  level,
  term,
  credits,
  instructor,
  spec,
  thumbnailUrl,
  progressPercent = 45,
  progressLabel = "Week 5 of 14",
}) => {
  return (
    <article className="group flex flex-col bg-white border border-black/[0.04] rounded-3xl overflow-hidden shadow-[0px_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0px_12px_36px_rgba(0,105,79,0.08)] hover:-translate-y-0.5 transition-all duration-300">
      {/* Top Section: Visual Thumbnail */}
      <div className="relative h-44 bg-surface-container-high overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-on-primary bg-primary/90 px-2.5 py-0.5 rounded-sm border border-primary/40 shadow-sm">
            {code}
          </span>
          <Badge variant="success" className="bg-surface-container-lowest/90 backdrop-blur-sm text-[#007255] border-transparent font-mono">
            {credits}
          </Badge>
        </div>

        {/* Bottom Thumbnail Overlay Tags */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-mono">
          <span>{department}</span>
          <span>{term}</span>
        </div>
      </div>

      {/* Bottom Section: Title, Metadata, and Emerald Progress Bar */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant font-label-md">
            <span>{level}</span>
            <span>•</span>
            <span className="truncate">{instructor}</span>
          </div>

          <h3 className="font-headline-sm font-bold text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            <Link to={`/courses/${id}`}>
              {title}
            </Link>
          </h3>

          <p className="text-xs text-on-surface-variant line-clamp-2">
            Compute quota: <strong className="text-on-surface font-mono">{spec}</strong>
          </p>
        </div>

        {/* Emerald Progress Bar */}
        <div className="space-y-1.5 pt-2 border-t border-outline-variant/40">
          <div className="flex justify-between items-center text-xs text-on-surface-variant font-mono">
            <span>Curriculum Progress</span>
            <span className="font-semibold text-primary">{progressLabel}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-1 flex items-center justify-between">
          <span className="text-xs font-mono text-on-surface-variant">
            ABET / ECTS Mapped
          </span>
          <Link to={`/courses/${id}`}>
            <Button variant="primary" size="sm">
              Inspect Syllabus
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
