import { forwardRef } from "react";
import { FormControl, FormLabel, TextareaAutosize } from "@mui/material";
import { TextareaProps } from "./type";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      required = false,
      placeholder,
      formSize = "w-full",
      formheight = "h-full",
      error,
      helperText,
      ...props
    },
    _ref,
  ) => {
    return (
      <div className="pb-5">
        <FormControl className="${formSize formheight}">
          <FormLabel
            className="font-bold text-primary"
            required={required}
            style={{ fontFamily: "Zen Maru Gothic, sans-serif" }}
            sx={{ fontSize: "15px" }}
          >
            {label}
          </FormLabel>
          <TextareaAutosize
            {...props}
            className={`p-3 border rounded h-44 ${
              error ? "border-red-600" : "border-neutral-300"
            }`}
            ref={_ref}
            placeholder={placeholder}
          />
          {error && (
            <p className="text-[#d32e2e] text-xs pl-3 pt-1">{helperText}</p>
          )}
        </FormControl>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
