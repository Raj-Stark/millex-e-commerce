import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

interface CommonButtonProps extends ButtonProps {}

const CommonButton = ({ sx = {}, ...props }: CommonButtonProps) => {
  return (
    <Button
      disableRipple
      disableFocusRipple
      variant="contained"
      sx={{
        ...sx,
        bgcolor: "secondary.main",
        ":hover": {
          bgcolor: "primary.main",
        },
      }}
      {...props}
    />
  );
};

export default CommonButton;
