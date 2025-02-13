import { Box, SxProps } from "@mui/material";
import { useWindowSize } from "@uidotdev/usehooks";
import React, { ReactNode } from "react";

const SwiperContainer = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => {
  const { width, height } = useWindowSize();

  if (!width || !height) return null;
  let boxStyle: SxProps;

  if (width >= height) {
    boxStyle = {
      height: "100dvh",
      width: "auto",
      maxWidth: "100dvw",
    };
  } else {
    boxStyle = {
      width: "100dvw",
      height: "auto",
      maxHeight: "100dvh",
    };
  }
  return (
    <Box sx={boxStyle} {...props}>
      {children}
    </Box>
  );
};

export default SwiperContainer;
