import {
  Compass,
  Download,
  Layers,
  Map as MapIcon,
  Maximize,
  Minimize,
  Minus,
  Mountain,
  Plus,
} from 'lucide-react';
import type { Map as MapboxMap } from 'mapbox-gl';

interface TripMapControlsProps {
  is3D: boolean;
  isSatellite: boolean;
  isFullscreen: boolean;
  bearing: number;
  mapRef: React.RefObject<MapboxMap | null>;
  plannedSegmentsList: [number, number][][];
  tripSlug: string;
  tripTitle: string;
  onToggle3D: () => void;
  onToggleStyle: () => void;
  onToggleFullscreen: () => void;
  onDownloadGPX: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
}

export function TripMapControls({
  is3D,
  isSatellite,
  isFullscreen,
  bearing,
  mapRef,
  plannedSegmentsList,
  tripSlug,
  tripTitle,
  onToggle3D,
  onToggleStyle,
  onToggleFullscreen,
  onDownloadGPX,
  onZoomIn,
  onZoomOut,
  onRotate,
}: TripMapControlsProps) {
  const map = mapRef.current;

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 p-1 bg-surface-1/90 backdrop-blur-md border border-border rounded-xl shadow-lg">
      <button
        type="button"
        onClick={onToggle3D}
        className={`p-2 rounded-lg transition-colors ${
          is3D
            ? 'bg-surface-2 text-[#5EACCF]'
            : 'text-subtle-foreground hover:bg-surface-2'
        }`}
        title={is3D ? 'Visão 2D' : 'Visão 3D'}
      >
        {is3D ? <MapIcon size={18} /> : <Mountain size={18} />}
      </button>

      <button
        type="button"
        onClick={onToggleStyle}
        className={`p-2 rounded-lg transition-colors ${
          isSatellite
            ? 'bg-surface-2 text-[#5EACCF]'
            : 'text-subtle-foreground hover:bg-surface-2'
        }`}
        title={isSatellite ? 'Modo Vetorial' : 'Modo Satélite'}
      >
        <Layers size={18} />
      </button>

      <button
        type="button"
        onClick={onRotate}
        className="p-2 rounded-lg text-subtle-foreground hover:bg-surface-2 transition-colors"
        title="Girar Mapa"
      >
        <Compass
          size={18}
          style={{
            transform: `rotate(${-bearing}deg)`,
            transition: 'transform 0.2s linear',
          }}
        />
      </button>

      <div className="h-[1px] w-full bg-surface-2 my-0.5" />

      <button
        type="button"
        onClick={onZoomIn}
        className="p-2 rounded-lg text-subtle-foreground hover:bg-surface-2 transition-colors"
        title="Aumentar Zoom"
      >
        <Plus size={18} />
      </button>

      <button
        type="button"
        onClick={onZoomOut}
        className="p-2 rounded-lg text-subtle-foreground hover:bg-surface-2 transition-colors"
        title="Diminuir Zoom"
      >
        <Minus size={18} />
      </button>

      <div className="h-[1px] w-full bg-surface-2 my-0.5" />

      <button
        type="button"
        onClick={onDownloadGPX}
        className="p-2 rounded-lg text-subtle-foreground hover:bg-surface-2 hover:text-[#5EACCF] transition-colors"
        title="Baixar Trajeto (.gpx)"
      >
        <Download size={18} />
      </button>

      <button
        type="button"
        onClick={onToggleFullscreen}
        className="p-2 rounded-lg text-subtle-foreground hover:bg-surface-2 transition-colors"
        title={isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia'}
      >
        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
      </button>
    </div>
  );
}
