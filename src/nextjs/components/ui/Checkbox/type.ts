import { ComponentProps } from "react";
import { Checkbox } from "@mui/material";

export type CheckboxProps = {
  label: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
} & ComponentProps<typeof Checkbox>;
