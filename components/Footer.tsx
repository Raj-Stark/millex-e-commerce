import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { RiTwitterLine } from "react-icons/ri";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "black",
        color: "white",
        padding: 2,
        marginTop: 15,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box
          sx={{
            flex: "1 1 0",
            margin: 1,
            maxWidth: { xs: "100%", sm: "calc(25% - 20px)" },
          }}
        >
          <Typography variant="h6" component="h3">
            About Us
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: "1 1 0",
            margin: 1,
            maxWidth: { xs: "100%", sm: "calc(25% - 20px)" },
          }}
        >
          <Typography variant="h6" component="h3">
            Subscribe to Our Newsletter
          </Typography>
          <Box
            component="form"
            action="#"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              type="email"
              name="email"
              placeholder="Your Email Address"
              variant="outlined"
              size="small"
              sx={{
                flex: 2.5,
                marginRight: 1,
                backgroundColor: "white",
                borderRadius: 1,
                height: 40,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                flex: 1,
                height: 40,
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            flex: "1 1 0",
            margin: 1,
            maxWidth: { xs: "100%", sm: "calc(25% - 20px)" },
          }}
        >
          <Typography variant="h6" component="h3">
            Follow Us
          </Typography>
          <Box sx={{ display: "flex" }}>
            <IconButton
              component="a"
              href="#"
              sx={{ color: "white", marginRight: 1 }}
            >
              <RiTwitterLine />
            </IconButton>
            <IconButton
              component="a"
              href="#"
              sx={{ color: "white", marginRight: 1 }}
            >
              <FaInstagram />
            </IconButton>
            <IconButton
              component="a"
              href="#"
              sx={{ color: "white", marginRight: 1 }}
            >
              <FaYoutube />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: "white", marginY: 2 }} />
      <Box
        sx={{
          textAlign: "center",
          padding: 1,
        }}
      >
        <Typography variant="body2" component="p">
          &copy; {new Date().getFullYear()} E-Commerce. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
