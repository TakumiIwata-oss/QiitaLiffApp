import { forwardRef } from "react";
import {
  Select as MUISelect,
  FormControl,
  FormLabel,
  MenuItem,
} from "@mui/material";
import { SelectProps } from "./type";

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, required = false, placeholder, options, helperText, ...props },
    _ref,
  ) => {
    return (
      <div className="pb-5">
        <FormControl className="w-1/2">
          <FormLabel
            className="font-bold text-primary"
            required={required}
            style={{ fontFamily: "Zen Maru Gothic, sans-serif" }}
            sx={{ fontSize: "15px" }}
          >
            {label}
          </FormLabel>
          <MUISelect
            {...props}
            inputRef={_ref}
            displayEmpty
            defaultValue=""
            sx={{
              "& .MuiSelect-select": {
                fontFamily: "Zen Maru Gothic, sans-serif",
              },
            }}
          >
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </MUISelect>
          {props.error && (
            <p className="text-[#d32e2e] text-xs pl-3 pt-1">{helperText}</p>
          )}
        </FormControl>
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
