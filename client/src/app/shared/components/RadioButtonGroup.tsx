import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { ChangeEvent } from "react";

type Props = {
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioButtonGroup({
  options,
  selectedValue,
  onChange,
}: Props) {
  return (
    <FormControl>
      <RadioGroup value={selectedValue} onChange={onChange}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={label}
            label={label}
            control={<Radio color="secondary" sx={{ py: 0.7 }} />}
            value={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
