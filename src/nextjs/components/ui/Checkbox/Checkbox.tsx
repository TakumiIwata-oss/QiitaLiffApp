import { forwardRef } from "react";
import { Checkbox as MUICheckbox, FormControlLabel } from "@mui/material";
import { CheckboxProps } from "./type";

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error = false, helperText, ...props }, _ref) => {
    return (
      <div className="pb-5">
        <FormControlLabel
          control={<MUICheckbox {...props} inputRef={_ref} />}
          label={label}
          sx={{
            "& .MuiFormControlLabel-label": {
              fontFamily: "Zen Maru Gothic, sans-serif",
            },
          }}
        />
        {error && (
          <p className="text-[#d32e2e] text-xs pl-3 pt-1">{helperText}</p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
