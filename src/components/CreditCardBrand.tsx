"use client";

import { CreditCardIcon } from "lucide-react";


interface CreditCardBrandProps {
  brand: string;
  showName?: boolean;
}

const brandMap: Record<
  string,
  { name: string; Icon: typeof CreditCardIcon; className?: string }
> = {
  visa: {
    name: "Visa",
    Icon: CreditCardIcon,
  },
  master: {
    name: "Mastercard",
    Icon: CreditCardIcon ,
  },
};

export function CreditCardBrand({
  brand,
  showName = true,
}: CreditCardBrandProps) {
  const normalized = brand.toLowerCase();
  const config = brandMap[normalized] ?? {
    name: brand,
    Icon: CreditCardIcon,
    className: "text-muted-foreground",
  };

  return (
    <span className="inline-flex items-center gap-2">
      <config.Icon className={`h-5 w-5 ${config.className}`} />
      {showName && <span>{config.name}</span>}
    </span>
  );
}