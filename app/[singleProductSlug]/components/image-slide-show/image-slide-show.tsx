"use client";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import styles from "./styles.module.css";
import ImageModal from "./ImageModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import SwiperContainer from "./SwiperContainer";

const ImageSlideShow = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState<number | null>(
    images.length ? 0 : null,
  );

  const [showModal, setShowModal] = useState(false);

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
      {showModal && (
        <ImageModal
          images={images}
          activeImage={currentImage ?? undefined}
          closeModal={() => {
            setShowModal(false);
          }}
        />
      )}

      <Swiper
        modules={[Navigation, Pagination]}
        zoom={true}
        navigation
        pagination={{ clickable: true }}
        initialSlide={currentImage ?? undefined}
      >
        {images.map((item: string) => {
          return (
            <SwiperSlide
              key={item}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <button
                style={{
                  all: "unset",
                }}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <img
                  src={item}
                  className={styles["slide-show-image"]}
                  alt="carousel-image"
                />
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Paper>
  );
};

export default ImageSlideShow;
