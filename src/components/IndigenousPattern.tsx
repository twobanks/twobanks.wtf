import React from "react";

interface IndigenousPatternProps {
  className?: string;
  height?: number;
  mode?: "svg" | "image";
  imageSrc?: string;
  invertInDark?: boolean;
}

export function IndigenousPattern({
  className = "",
  height = 20,
  mode = "svg",
  imageSrc = "/images/indigenous-border.png",
  invertInDark = true,
}: IndigenousPatternProps) {
  const filterId = React.useId();
  const patternId = React.useId();

  if (mode === "image") {
    return (
      <div
        aria-hidden="true"
        className={`w-full select-none pointer-events-none bg-repeat-x bg-left-top ${
          invertInDark ? "dark:invert" : ""
        } ${className}`}
        style={{
          height: `${height}px`,
          backgroundImage: `url("${imageSrc}")`,
          backgroundSize: `auto ${height}px`,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{ height: `${height}px` }}
    >
      <svg
        width="100%"
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-full"
      >
        <defs>
          {/* Textura sutil de pincel/nanquim para evitar linhas digitais "lisas" demais */}
          <filter id={filterId} x="-5%" y="-15%" width="110%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.18"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <pattern
            id={patternId}
            width="44"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <g filter={`url(#${filterId})`}>
              {/* Borda superior e inferior firmes */}
              <line
                x1="0"
                y1="1.8"
                x2="44"
                y2="1.8"
                stroke="currentColor"
                strokeWidth="2.4"
                className="text-zinc-900 dark:bg-zinc-500"
              />
              <line
                x1="0"
                y1="18.2"
                x2="44"
                y2="18.2"
                stroke="currentColor"
                strokeWidth="2.4"
                className="text-zinc-900 dark:bg-zinc-900"
              />

              {/* Losango duplo central */}
              <polygon
                points="22,3.5 32,10 22,16.5 12,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinejoin="miter"
                className="text-zinc-600 dark:text-zinc-500"
              />
              <polygon
                points="22,6.8 26.8,10 22,13.2 17.2,10"
                fill="currentColor"
                className="text-[#F5B114]"
              />

              {/* Divisores verticais duplos entre módulos */}
              <line
                x1="3.5"
                y1="4"
                x2="3.5"
                y2="16"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-zinc-600 dark:text-zinc-600"
              />
              <line
                x1="40.5"
                y1="4"
                x2="40.5"
                y2="16"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-zinc-600 dark:text-zinc-600"
              />
            </g>
          </pattern>
        </defs>

        <rect width="100%" height={height} fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}