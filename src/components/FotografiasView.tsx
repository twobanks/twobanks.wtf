"use client";

import { PhotoItem } from "@/data/fotografias";
import Image from "next/image";
import {
  Aperture,
  ArrowUpRight,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  Maximize2,
  Mountain,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/components/patterns";

interface FotografiasViewProps {
  photos: PhotoItem[];
}

interface IndexedPhoto {
  photo: PhotoItem;
  index: number;
}

function formatDate(isoDate: string) {
  const datePart = isoDate.split("T")[0];
  const [y, m, d] = datePart.split("-");
  if (!y || !m || !d) return isoDate;
  return `${d}/${m}/${y}`;
}

function formatCoordinates(lat: number, lng: number) {
  return `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`;
}

function distributeIntoMasonryColumns(
  items: PhotoItem[],
  columnCount: number
): IndexedPhoto[][] {
  const columns: IndexedPhoto[][] = Array.from({ length: columnCount }, () => []);
  const columnHeights = new Array<number>(columnCount).fill(0);

  items.forEach((photo, index) => {
    let shortestCol = 0;
    for (let i = 1; i < columnCount; i++) {
      if (columnHeights[i] < columnHeights[shortestCol]) {
        shortestCol = i;
      }
    }

    columns[shortestCol].push({ photo, index });
    const aspectRatio =
      photo.width > 0 && photo.height > 0 ? photo.height / photo.width : 1;
    columnHeights[shortestCol] += aspectRatio;
  });

  return columns;
}

export function FotografiasView({ photos }: FotografiasViewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const orderedPhotos = useMemo(() => {
    return [...photos].sort((a, b) => b.capturedAt.localeCompare(a.capturedAt));
  }, [photos]);

  const twoColumns = useMemo(
    () => distributeIntoMasonryColumns(orderedPhotos, 2),
    [orderedPhotos]
  );

  const threeColumns = useMemo(
    () => distributeIntoMasonryColumns(orderedPhotos, 3),
    [orderedPhotos]
  );

  const selectedPhoto =
    selectedIndex !== null ? (orderedPhotos[selectedIndex] ?? null) : null;

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || orderedPhotos.length === 0) return null;
      return (prev - 1 + orderedPhotos.length) % orderedPhotos.length;
    });
  }, [orderedPhotos.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || orderedPhotos.length === 0) return null;
      return (prev + 1) % orderedPhotos.length;
    });
  }, [orderedPhotos.length]);

  useEffect(() => {
    if (selectedPhoto === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedPhoto, handleClose, handlePrev, handleNext]);

  function renderPinCard({ photo, index }: IndexedPhoto) {
    return (
      <button
        key={photo.id}
        type="button"
        onClick={() => setSelectedIndex(index)}
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-background text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Image
          src={photo.imageUrl}
          alt={photo.title}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          className="block h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        {/* Gradiente para leitura sobre a foto */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300"
        />

        {/* Botão de Ampliar */}
        <span
          aria-hidden="true"
          className="absolute top-3 right-3 p-2 rounded-xl border border-border bg-surface-1 text-white backdrop-blur-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
        >
          <Maximize2 className="size-3.5 text-white" />
        </span>

        {/* Rodapé do Pin: Título, Local e Câmera */}
        <div className="absolute inset-x-0 bottom-0 p-4 space-y-2">
          <div>
            <h2 className="font-semibold text-sm text-white leading-snug">
              {photo.title}
            </h2>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground max-w-full">
              <MapPin className="size-3 text-white shrink-0" />
              <span className="truncate" title={photo.location.name}>{photo.location.name}</span>
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/15 text-[11px] text-muted-foreground opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300">
            <span className="inline-flex items-center gap-1.5 truncate">
              <Camera className="size-3 text-white shrink-0" />
              <span className="truncate" title={photo.camera.model}>{photo.camera.model}</span>
            </span>
            <span className="shrink-0 tabular-nums text-subtle-foreground">
              {formatDate(photo.capturedAt)}
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Cabeçalho */}
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Fotografias
        </h1>
        <p className="text-sm text-subtle-foreground mt-1">
          Registros de trilhas, pedais e paisagens capturados pelo caminho.
        </p>
      </header>

      {/* Grade Masonry estilo Pinterest */}
      {orderedPhotos.length === 0 ? (
        <EmptyState
          icon={Camera}
          title="Nenhuma fotografia cadastrada ainda."
          description="Suas imagens de trilhas, pedais e paisagens aparecerão aqui."
          className="mt-6"
        />
      ) : (
        <section aria-label="Galeria de fotografias">
          {/* Mobile: 1 coluna */}
          <div className="flex flex-col gap-4 sm:hidden">
            {orderedPhotos.map((photo, index) => renderPinCard({ photo, index }))}
          </div>

          {/* Tablet: 2 colunas escalonadas */}
          <div className="hidden sm:flex lg:hidden gap-4 items-start">
            {twoColumns.map((col, colIndex) => (
              <div key={colIndex} className="flex-1 flex flex-col gap-4 min-w-0">
                {col.map((item) => renderPinCard(item))}
              </div>
            ))}
          </div>

          {/* Desktop: 3 colunas escalonadas */}
          <div className="hidden lg:flex gap-4 items-start">
            {threeColumns.map((col, colIndex) => (
              <div key={colIndex} className="flex-1 flex flex-col gap-4 min-w-0">
                {col.map((item) => renderPinCard(item))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Modal / Lightbox Ampliado */}
      {selectedPhoto && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl max-h-[92vh] rounded-2xl border border-border bg-surface-1 overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_340px] shadow-sm"
          >
            {/* Área da Imagem Ampliada */}
            <div className="relative bg-background flex items-center justify-center min-h-[42vh] sm:min-h-[55vh] lg:min-h-[75vh] max-h-[60vh] lg:max-h-[92vh] p-3 sm:p-6">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                width={selectedPhoto.width}
                height={selectedPhoto.height}
                loading="eager"
                className="max-h-full max-w-full object-contain rounded-lg select-none"
              />

              {orderedPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl border border-border bg-surface-1 text-white hover:bg-surface-2 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="size-4 text-white" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Próxima foto"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl border border-border bg-surface-1 text-white hover:bg-surface-2 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="size-4 text-white" />
                  </button>
                </>
              )}

              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg border border-border bg-surface-1 text-[11px] font-medium text-muted-foreground tabular-nums">
                {selectedIndex + 1} / {orderedPhotos.length}
              </span>
            </div>

            {/* Painel Lateral de Metadados (Câmera + Geolocalização) */}
            <aside className="border-t lg:border-t-0 lg:border-l border-border bg-surface-1 p-5 sm:p-6 flex flex-col justify-between gap-6 overflow-y-auto max-h-[38vh] lg:max-h-[92vh]">
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <h2 className="text-lg font-bold tracking-tight text-foreground">
                      {selectedPhoto.title}
                    </h2>
                    <p className="inline-flex items-center gap-1.5 text-xs text-subtle-foreground">
                      <Calendar className="size-3.5 text-white" />
                      {formatDate(selectedPhoto.capturedAt)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Fechar visualização"
                    className="p-2 rounded-xl border border-border bg-background text-white hover:bg-surface-2 transition-colors cursor-pointer shrink-0"
                  >
                    <X className="size-4 text-white" />
                  </button>
                </div>

                {selectedPhoto.description && (
                  <p className="text-xs leading-relaxed text-subtle-foreground">
                    {selectedPhoto.description}
                  </p>
                )}

                {/* Bloco 1: Câmera & EXIF */}
                <div className="rounded-xl border border-border bg-background/60 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg border border-border bg-surface-1">
                      <Camera className="size-3.5 text-white" />
                    </span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Câmera & EXIF
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <p className="font-semibold text-foreground">
                      {selectedPhoto.camera.model}
                    </p>
                    {selectedPhoto.camera.lens && (
                      <p className="inline-flex items-center gap-1.5 text-subtle-foreground">
                        <Aperture className="size-3.5 text-white shrink-0" />
                        {selectedPhoto.camera.lens}
                      </p>
                    )}
                  </div>

                  {(selectedPhoto.camera.focalLength ||
                    selectedPhoto.camera.aperture ||
                    selectedPhoto.camera.shutterSpeed ||
                    selectedPhoto.camera.iso !== undefined) && (
                    <div className="grid grid-cols-4 gap-2 pt-2.5 border-t border-border text-center tabular-nums">
                      <div>
                        <p className="text-[10px] uppercase text-subtle-foreground">Focal</p>
                        <p className="mt-0.5 text-xs font-semibold text-foreground">
                          {selectedPhoto.camera.focalLength ?? "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-subtle-foreground">Abertura</p>
                        <p className="mt-0.5 text-xs font-semibold text-foreground">
                          {selectedPhoto.camera.aperture ?? "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-subtle-foreground">Obturador</p>
                        <p className="mt-0.5 text-xs font-semibold text-foreground">
                          {selectedPhoto.camera.shutterSpeed ?? "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-subtle-foreground">ISO</p>
                        <p className="mt-0.5 text-xs font-semibold text-foreground">
                          {selectedPhoto.camera.iso ?? "—"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bloco 2: Geolocalização */}
                <div className="rounded-xl border border-border bg-background/60 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg border border-border bg-surface-1">
                      <MapPin className="size-3.5 text-white" />
                    </span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Geolocalização
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <p className="font-semibold text-foreground">
                      {selectedPhoto.location.name}
                    </p>
                    <p className="text-subtle-foreground">{selectedPhoto.location.region}</p>

                    <div className="pt-2 flex flex-col gap-1.5 text-subtle-foreground tabular-nums">
                      <span className="inline-flex items-center gap-1.5">
                        <Compass className="size-3.5 text-white shrink-0" />
                        {formatCoordinates(
                          selectedPhoto.location.latitude,
                          selectedPhoto.location.longitude
                        )}
                      </span>

                      {selectedPhoto.location.elevationMeters !== undefined && (
                        <span className="inline-flex items-center gap-1.5">
                          <Mountain className="size-3.5 text-white shrink-0" />
                          {selectedPhoto.location.elevationMeters.toLocaleString("pt-BR")} m de altitude
                        </span>
                      )}
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps?q=${selectedPhoto.location.latitude},${selectedPhoto.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full rounded-lg border border-border bg-surface-1 px-3 py-2 text-xs font-medium text-foreground hover:bg-surface-2 transition-colors"
                  >
                    <span>Ver local no mapa</span>
                    <ArrowUpRight className="size-3.5 text-white" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
    </main>
  );
}