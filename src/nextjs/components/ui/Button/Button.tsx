import { Button as MUIButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Button({
  label,
  type,
  bgColor = "bg-primary",
  textColor = "text-green",
  isLoading = false,
  onClick,
  width,
  ...props
}: {
  label: string;
  type?: "submit";
  bgColor?: string;
  textColor?: string;
  isLoading?: boolean;
  onClick?: () => void;
  width?: string;
}) {
  if (!isLoading)
    return (
      <div>
        <MUIButton
          type={type}
          className={`${bgColor} ${textColor} ${width || "w-full"} py-4`}
          {...props}
          onClick={onClick}
        >
          {label}
        </MUIButton>
      </div>
    );
  else
    return (
      <LoadingButton className={"bg-gray-500 w-full py-4"} loading>
        {label}
      </LoadingButton>
    );
}
