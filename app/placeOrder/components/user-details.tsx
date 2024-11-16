"use client";
import CommonButton from "@/components/button";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isCompleteDetails } from "../atom/user-details-atom";

const UserDetailsList = () => {
  const getCurrentUserEndpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}user/getCurrentUser`;
  const router = useRouter();
  const setIsCompleteDetail = useSetAtom(isCompleteDetails);

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: async () => {
      const response = await axios.get(getCurrentUserEndpoint, {
        withCredentials: true,
      });
      return response.data.user;
    },
  });

  const userDetails = userData
    ? [
        { label: "Name", value: userData.name },
        { label: "Email", value: userData.email },
        { label: "Address", value: userData?.address?.street },
        { label: "City", value: userData?.address?.city },
        { label: "State", value: userData?.address?.state },
        { label: "ZIP Code", value: userData?.address?.zip },
        { label: "Country", value: userData?.address?.country },
        { label: "Phone", value: userData.phone },
      ]
    : [];

  useEffect(() => {
    if (userData) {
      const isComplete = userDetails.every(
        (detail) => detail.value && detail.value.trim() !== ""
      );
      setIsCompleteDetail(isComplete);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, setIsCompleteDetail]);

  if (isLoading) {
    return (
      <Container className="max-w-2xl">
        <Paper className="p-4">
          {[...Array(8)].map((_, index) => (
            <ListItem key={index} className="py-2">
              <Skeleton className="h-6 w-full" />
            </ListItem>
          ))}
        </Paper>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="max-w-2xl">
        <Typography className="text-red-500">
          Error loading user data
        </Typography>
      </Container>
    );
  }

  return (
    <Paper>
      <Typography variant="h5" textAlign="left" pl={2} pt={2}>
        User Details
      </Typography>
      <List>
        {userDetails.map((detail, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize="18px" fontWeight="600">
                    {detail.label}
                  </Typography>
                  <Typography fontSize="16px">
                    {detail.value || "Not provided"}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>

      <Box px={2} py={2}>
        <CommonButton
          type="submit"
          sx={{ width: "100%" }}
          onClick={() => router.push("/profile")}
        >
          <Typography
            component="span"
            sx={{
              color: "#fff",
              textTransform: "capitalize",
              px: 2.8,
              py: 0.8,
            }}
          >
            Update Details
          </Typography>
        </CommonButton>
      </Box>
    </Paper>
  );
};

export default UserDetailsList;
