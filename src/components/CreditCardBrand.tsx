"use client";

import { FaCcVisa, FaCreditCard } from "react-icons/fa6";
import { SiMastercard } from "react-icons/si";

interface CreditCardBrandProps {
  brand: string;
  showName?: boolean;
}

const brandMap: Record<
  string,
  { name: string; Icon: typeof FaCreditCard; className?: string }
> = {
  visa: {
    name: "Visa",
    Icon: FaCcVisa,
  },
  master: {
    name: "Mastercard",
    Icon: SiMastercard ,
  },
};

export function CreditCardBrand({
  brand,
  showName = true,
}: CreditCardBrandProps) {
  const normalized = brand.toLowerCase();
  const config = brandMap[normalized] ?? {
    name: brand,
    Icon: FaCreditCard,
    className: "text-muted-foreground",
  };

  return (
    <span className="inline-flex items-center gap-2">
      <config.Icon className={`h-5 w-5 ${config.className}`} />
      {showName && <span>{config.name}</span>}
    </span>
  );
}