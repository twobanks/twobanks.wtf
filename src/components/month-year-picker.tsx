"use client";

import { CalendarIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MESES = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);

const ANOS = Array.from({ length: 11 }, (_, i) => 2020 + i);

type Props = {
  ano: number;
  mes: number; // 1-12
};

export function MonthYearPicker({ ano, mes }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = React.useState(false);
  const [selectedMes, setSelectedMes] = React.useState(
    String(mes).padStart(2, "0")
  );
  const [selectedAno, setSelectedAno] = React.useState(String(ano));

  function aplicar() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mes", `${selectedAno}-${selectedMes}`);
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 min-w-[140px]">
        <CalendarIcon className="h-4 w-4" />
        {String(mes).padStart(2, "0")}/{ano}
      </PopoverTrigger>

      <PopoverContent className="w-auto p-4" align="center">
        <div className="flex gap-2">
          <Select
            value={selectedMes}
            onValueChange={(value, _eventDetails) => {
              if (value) setSelectedMes(value);
            }}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MESES.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedAno}
            onValueChange={(value, _eventDetails) => {
              if (value) setSelectedAno(value);
            }}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ANOS.map((a) => (
                <SelectItem key={a} value={String(a)}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            onClick={aplicar}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Aplicar
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}