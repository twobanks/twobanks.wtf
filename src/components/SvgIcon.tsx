'use client';

import { SvgIconProps } from "@/utils/types";

export function SvgIcon({ src, className }: SvgIconProps) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: src }} />;
}