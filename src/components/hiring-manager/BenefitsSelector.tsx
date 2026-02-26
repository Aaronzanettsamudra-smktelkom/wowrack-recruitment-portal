import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getAllBenefits, addCustomBenefit, type BenefitOption } from "@/lib/benefitsStore";

interface BenefitsSelectorProps {
  selectedBenefits: string[];
  onBenefitsChange: (benefits: string[]) => void;
}

export default function BenefitsSelector({ selectedBenefits, onBenefitsChange }: BenefitsSelectorProps) {
  const [benefits, setBenefits] = useState<BenefitOption[]>(getAllBenefits());
  const [customInputs, setCustomInputs] = useState<string[]>(['']);

  const toggleBenefit = (id: string) => {
    if (selectedBenefits.includes(id)) {
      onBenefitsChange(selectedBenefits.filter((b) => b !== id));
    } else {
      onBenefitsChange([...selectedBenefits, id]);
    }
  };

  const handleAddCustom = (index: number) => {
    const label = customInputs[index]?.trim();
    if (!label) return;
    const newBenefit = addCustomBenefit(label);
    setBenefits(getAllBenefits());
    onBenefitsChange([...selectedBenefits, newBenefit.id]);
    const updated = [...customInputs];
    updated[index] = '';
    setCustomInputs(updated);
  };

  const addAnotherInput = () => {
    setCustomInputs([...customInputs, '']);
  };

  return (
    <div className="space-y-4">
      <Label>Benefits *</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="flex items-center space-x-2">
            <Checkbox
              id={`benefit-${benefit.id}`}
              checked={selectedBenefits.includes(benefit.id)}
              onCheckedChange={() => toggleBenefit(benefit.id)}
            />
            <Label htmlFor={`benefit-${benefit.id}`} className="font-normal cursor-pointer flex items-center gap-1.5">
              <span>{benefit.emoji}</span>
              <span>{benefit.label}</span>
            </Label>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-2">
        <Label className="text-sm text-muted-foreground">Others</Label>
        {customInputs.map((val, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              value={val}
              onChange={(e) => {
                const updated = [...customInputs];
                updated[i] = e.target.value;
                setCustomInputs(updated);
              }}
              placeholder="e.g., Optical Allowance"
              className="max-w-xs"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustom(i);
                }
              }}
            />
            <Button type="button" variant="outline" size="sm" onClick={() => handleAddCustom(i)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAnotherInput}
          className="text-sm text-primary hover:underline"
        >
          Add other benefit
        </button>
      </div>
    </div>
  );
}
