import { forwardRef } from "react";
import { TextField, FormControl, FormLabel } from "@mui/material";
import { InputProps } from "./type";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, required = false, placeholder, formSize = "w-full", ...props },
    _ref,
  ) => {
    return (
      <div className="pb-5">
        <FormControl className={formSize}>
          <FormLabel
            className="font-bold text-primary"
            required={required}
            style={{ fontFamily: "Zen Maru Gothic, sans-serif" }}
            sx={{ fontSize: "15px" }}
          >
            {label}
          </FormLabel>
          <TextField
            {...props}
            inputRef={_ref}
            placeholder={placeholder}
            sx={{
              input: {
                "&::placeholder": {
                  fontFamily: "Zen Maru Gothic, sans-serif",
                },
              },
            }}
          />
        </FormControl>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
