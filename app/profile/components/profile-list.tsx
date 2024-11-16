"use client";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";

import SellIcon from "@mui/icons-material/Sell";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { userAtom } from "@/commonAtoms/userAtom";

const listItems = [
  { name: "My Orders", icon: <SellIcon /> },
  { name: "My Wishlist", icon: <FavoriteIcon /> },
  { name: "Logout", icon: <LogoutIcon /> },
];

const ProfileList = () => {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}auth/logout`;

      const response = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error("Something went wrong !!!");
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("Logout Successfully !!");

      setUser({
        isLoggedIn: false,
        name: "",
        userId: "",
      });
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to Logout !!");
    },
  });

  const handleListClick = (item: any) => {
    if (item.name === "Logout") {
      logout();
    }

    if (item.name === "My Orders") {
      router.push("/orderList");
    }

    if (item.name === "My Wishlist") {
      router.push("/wishlist");
    }
  };

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Stack spacing={2}>
        {listItems.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{ color: "primary.main" }}
            onClick={() => handleListClick(item)}
          >
            <ListItemIcon sx={{ color: "secondary.main" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </Stack>
    </List>
  );
};

export default ProfileList;
