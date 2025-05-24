import { ComponentProps } from "react";
import { TextField } from "@mui/material";

export type InputProps = {
  label: string;
  required?: boolean;
  formSize?: string;
} & ComponentProps<typeof TextField>;
