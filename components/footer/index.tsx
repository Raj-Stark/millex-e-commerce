import { Box, Container, Divider, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import footerStyles from "./footer.module.css";
import {
  AddIcCall,
  Instagram,
  LocationOn,
  WhatsApp,
} from "@mui/icons-material";
import { BUSINESS_WHATSAPP_NUMBER } from "@/constants";
import { getWhatsappLink } from "@/utils";
import axios from "axios";

const Footer = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_LOCAL_URL}category`,
  );

  console.log("data", data);

  return (
    <Container
      component={"footer"}
      sx={{
        bgcolor: "#000",
        color: "#fff",
        "&.MuiContainer-root": {
          maxWidth: "100vw",
        },
        py: "24px",
      }}
    >
      <Container maxWidth="xl" sx={{ px: 0 }}>
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
          className={footerStyles["footer-inner-container"]}
        >
          <Box style={{ flexGrow: 1 }}>
            <a style={{ display: "flex" }} href="/">
              <div className={footerStyles["logo-container"]}>
                <Image src="/assets/logo.svg" alt="logo" fill />
              </div>
            </a>
            <Typography variant="h4" fontWeight="bold">
              Farm Gear
            </Typography>
            <Typography>
              High quality farm equipment for
              <br /> Farmers and Millers.
            </Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={1}
              marginTop={"20px"}
            >
              <LocationOn style={{ marginLeft: "-4px" }} />
              <Typography>
                65/1 &apos;O&apos; Road Belgachia, Howrah - 711108
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={1} marginTop={1}>
              <AddIcCall style={{ marginLeft: "-4px" }} />
              <a
                style={{
                  textDecoration: "none",
                }}
                href="tel://+91-708-067-2653"
              >
                <Typography color="white">+91-708-067-2653</Typography>
              </a>
            </Box>
          </Box>
          <Box
            className={footerStyles["categories-section"]}
            style={{
              flexGrow: 1,
            }}
          >
            <Typography variant="h5">Categories</Typography>
            <Divider
              sx={{
                background: "#9AA7BB3f",
                width: "150px",
                marginY: "20px",
              }}
            />
            <ul className={footerStyles["category-link-list"]}>
              {data &&
                data.categories.map((item: any) => {
                  return (
                    <li
                      style={{
                        display: "flex",
                      }}
                      className={footerStyles["category-link-list-item"]}
                      key={item._id}
                    >
                      <a
                        style={{
                          textDecoration: "none",
                        }}
                        href={`/ItemByCategory/${item._id}`}
                      >
                        <Typography variant="body2" color="secondary.main">
                          {item.name}
                        </Typography>
                      </a>
                    </li>
                    // <CategoryBox
                    //   key={item._id}
                    //   text={item.name}
                    //   imgUrl={item.image}
                    //   categoryId={item._id}
                    // />
                  );
                })}
            </ul>
          </Box>
        </div>
        <Divider
          sx={{
            background: "#9AA7BB3f",
            marginX: 2,
            marginY: "30px",
          }}
        />
        <div className={footerStyles["footer-bottom-container"]}>
          <Box>
            <ul className={footerStyles["social-links-list-style"]}>
              <li className={footerStyles["social-links-list-item-style"]}>
                <a
                  className={footerStyles["social-link"]}
                  href="https://www.instagram.com/vishal_screen_works/"
                >
                  <Instagram />
                  <Typography>Instagram</Typography>
                </a>
              </li>
              <li className={footerStyles["social-links-list-item-style"]}>
                <a
                  className={footerStyles["social-link"]}
                  href={getWhatsappLink(BUSINESS_WHATSAPP_NUMBER, {
                    text: "Hello, I am interested in your products.",
                  })}
                >
                  <WhatsApp />
                  <Typography>Whatsapp</Typography>
                </a>
              </li>
            </ul>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <a
              style={{
                color: "white",
                textDecorationColor: "white",
              }}
              href="/sitemap.xml"
            >
              <Typography>Sitemap</Typography>
            </a>
            <Typography>© 2024 Farm Gear. All Right Reserved</Typography>
          </Box>
        </div>
      </Container>
    </Container>
  );
};

export default Footer;
