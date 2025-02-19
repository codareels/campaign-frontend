import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Payout {
  country: string;
  amount: number;
}

interface PayoutInputProps {
  payout: Payout;
  onUpdate: (payout: Payout) => void;
  onRemove: () => void;
}

const countries = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
];

export const PayoutInput = ({ payout, onUpdate, onRemove }: PayoutInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={payout.country}
        onValueChange={(value) => onUpdate({ ...payout, country: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="number"
        value={payout.amount}
        onChange={(e) =>
          onUpdate({ ...payout, amount: parseFloat(e.target.value) })
        }
        placeholder="Amount"
        className="w-[120px]"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="h-10 w-10"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};