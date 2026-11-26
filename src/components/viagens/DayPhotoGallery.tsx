"use client"

import { TripPhoto } from "@/utils/types/viagens"
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react"
import { useEffect, useState } from "react"

export default function DayPhotoGallery({ photos }: { photos: TripPhoto[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (selectedIndex === null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null)
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % photos.length
        )
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev - 1 + photos.length) % photos.length
        )
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [selectedIndex, photos.length])

  if (!photos || photos.length === 0) return null

  const activePhoto = selectedIndex !== null ? photos[selectedIndex] : null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface-1 text-left focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            <img
              src={photo.url}
              alt={photo.caption || `Foto ${index + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {(photo.caption || photo.location) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3.5">
                {photo.caption && (
                  <p className="text-xs font-medium text-white line-clamp-2">
                    {photo.caption}
                  </p>
                )}
                {photo.location && (
                  <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <MapPin className="size-3 text-brand-blue" />
                    {photo.location}
                  </span>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-surface-1 text-muted-foreground hover:text-white border border-border"
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedIndex(
                    (prev) =>
                      prev === null
                        ? 0
                        : (prev - 1 + photos.length) % photos.length
                  )
                }}
                className="absolute left-4 p-2.5 rounded-full bg-surface-1 text-muted-foreground hover:text-white border border-border"
                aria-label="Anterior"
              >
                <ChevronLeft className="size-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedIndex((prev) =>
                    prev === null ? 0 : (prev + 1) % photos.length
                  )
                }}
                className="absolute right-4 p-2.5 rounded-full bg-surface-1 text-muted-foreground hover:text-white border border-border"
                aria-label="Próxima"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          <div
            className="max-w-4xl w-full space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.url}
              alt={activePhoto.caption || "Foto ampliada"}
              className="max-h-[78vh] w-full object-contain rounded-xl"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <span>{activePhoto.caption}</span>
              {activePhoto.location && (
                <span className="text-subtle-foreground">{activePhoto.location}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}