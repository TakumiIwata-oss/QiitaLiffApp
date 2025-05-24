import { ComponentProps } from "react";
import { TextareaAutosize } from "@mui/material";

export type TextareaProps = {
  label: string;
  required?: boolean;
  formSize?: string;
  formheight?: string;
  error?: boolean;
  helperText?: string;
} & ComponentProps<typeof TextareaAutosize>;
