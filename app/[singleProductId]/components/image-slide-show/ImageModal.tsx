import React from "react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperContainer from "./SwiperContainer";
import Modal from "@/components/Modal";
import { useClickAway } from "@/hooks/useClickAway";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/pagination";

interface Props {
  closeModal: () => void;
  images: string[];
  activeImage: number | undefined;
}

const ImageModal = ({ closeModal, images, activeImage }: Props) => {
  const modalImageRef = useClickAway<HTMLImageElement>(() => {
    closeModal();
  });
  return (
    <Modal closeModal={closeModal}>
      <Swiper
        modules={[Zoom, Navigation, Pagination]}
        zoom={true}
        navigation
        pagination={{ clickable: true }}
        initialSlide={activeImage}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {images.map((item: string) => {
          return (
            <SwiperSlide
              key={item}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SwiperContainer
                className="swiper-zoom-container"
                style={{
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={modalImageRef}
                  className={`swiper-zoom-target`}
                  src={item}
                  alt="carousel-image"
                />
              </SwiperContainer>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Modal>
  );
};

export default ImageModal;
