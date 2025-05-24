import { ComponentProps } from "react";
import { Select } from "@mui/material";

export type SelectProps = {
  label: string;
  required?: boolean;
  placeholder?: string;
  options: { value: string | number; label: string }[];
  helperText?: string;
} & ComponentProps<typeof Select>;
