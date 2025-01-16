"use client";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

const ImageSlideShow = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState<number | null>(
    images.length ? 0 : null,
  );

  const hasMoreOnRight = () => {
    if (currentImage === null || currentImage === images.length - 1) {
      return false;
    }
    return true;
  };
  const hasMoreOnLeft = () => {
    if (currentImage === null || currentImage === 0) {
      return false;
    }
    return true;
  };

  const handleRightClick = () => {
    if (hasMoreOnRight()) {
      setCurrentImage((prev) => (prev !== null ? prev + 1 : null));
    }
  };

  const handleLeftClick = () => {
    if (hasMoreOnLeft()) {
      setCurrentImage((prev) => (prev !== null ? prev - 1 : null));
    }
  };

  return (
    <Paper
      sx={{
        position: "relative",
        height: { xs: "200px", sm: "300px", md: "400px", lg: "600px" },
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          zIndex: 10,
          transform: "translate(-50%, -50%)",
          left: "50%",
          bottom: "10px",
          gap: "10px",
        }}
      >
        <div>
          <IconButton
            style={{
              backgroundColor: "white",
            }}
            disabled={!hasMoreOnLeft()}
            onClick={handleLeftClick}
          >
            <ChevronLeft />
          </IconButton>
        </div>
        <div>
          <IconButton
            style={{
              backgroundColor: "white",
            }}
            disabled={!hasMoreOnRight()}
            onClick={handleRightClick}
          >
            <ChevronRight />
          </IconButton>
        </div>
      </div>
      <Image
        fill={true}
        alt="product-image"
        src={currentImage != null ? images[currentImage] : ""}
        style={{ objectFit: "cover" }}
      />
    </Paper>
  );
};

export default ImageSlideShow;
