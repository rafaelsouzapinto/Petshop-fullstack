import { Button, ButtonProps } from "@mui/material";

type CustomVariant = "primary" | "secondary" | "delete";

interface PrimaryButtonProps extends ButtonProps {
  variantStyle?: CustomVariant;
}

const styleMap: Record<CustomVariant, object> = {
  primary: {
    backgroundColor: "#779bd0",
    color: "#f5e6d9",
    margin: "5px",
    "&:hover": {
      backgroundColor: "#3e6caf",
    },
  },
  secondary: {
    backgroundColor: "#f5e6d9",
    color: "#779bd0",
    margin: "5px",
    "&:hover": {
      backgroundColor: "#e0d4c5",
    },
  },
  delete: {
    backgroundColor: "#e85151",
    color: "#fff",
    margin: "5px",
    "&:hover": {
      backgroundColor: "#b23e3e",
    },
  },
};

export default function PrimaryButton({
  children,
  variantStyle = "primary",
  sx,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{
        ...styleMap[variantStyle],
        ...sx, //permite sobrepor, caso necessário
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
