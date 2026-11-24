import { LOGO_PATH } from "@/utils/mocks";
import React, { useId } from "react";

type GradientDirection = "vertical" | "horizontal" | "diagonal";

interface LogoTwoBanksProps extends React.SVGProps<SVGSVGElement> {
  variant?: "flat" | "3d";
  fillColor?: string | string[];
  gradientDirection?: GradientDirection;
  extrusionColor?: string;
  secondaryExtrusionColor?: string;
}

// Cole aqui a string do seu "d" original

const GRADIENT_COORDS: Record<
  GradientDirection,
  { x1: string; y1: string; x2: string; y2: string }
> = {
  vertical: { x1: "0%", y1: "0%", x2: "0%", y2: "100%" },
  horizontal: { x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
  diagonal: { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
};

export function LogoTwoBanks({
  variant = "3d",
  fillColor = ["#38bdf8", "#278fbe"],
  gradientDirection = "vertical",
  extrusionColor = "#0e5381",
  secondaryExtrusionColor = "#062b4e",
  className = "w-44 sm:w-56 h-auto",
  style,
  ...props
}: LogoTwoBanksProps) {
  const uid = useId().replace(/:/g, "");
  const shapeId = `twobanks-shape-${uid}`;
  const gradId = `twobanks-grad-${uid}`;

  const isGradient = Array.isArray(fillColor);
  const gradientStops = isGradient
    ? fillColor.length > 0
      ? fillColor
      : ["#38bdf8", "#278fbe"]
    : [];

  const resolvedFill = isGradient ? `url(#${gradId})` : fillColor;
  const coords = GRADIENT_COORDS[gradientDirection];

  return (
    <svg
      viewBox="70 0 2500 1450"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      style={style}
      {...props}
    >
      <defs>
        <path id={shapeId} d={LOGO_PATH} />

        {isGradient && (
          <linearGradient id={gradId} {...coords}>
            {gradientStops.map((color, index) => {
              const offset =
                gradientStops.length === 1
                  ? "0%"
                  : `${(index / (gradientStops.length - 1)) * 100}%`;

              return (
                <stop
                  key={`${color}-${index}`}
                  offset={offset}
                  stopColor={color}
                />
              );
            })}
          </linearGradient>
        )}
      </defs>

      {variant === "3d" && (
        <>
          <use
            href={`#${shapeId}`}
            fill={secondaryExtrusionColor}
            transform="translate(28, 28)"
          />
          <use
            href={`#${shapeId}`}
            fill={extrusionColor}
            transform="translate(14, 14)"
          />
        </>
      )}

      <use href={`#${shapeId}`} fill={resolvedFill} />
    </svg>
  );
}