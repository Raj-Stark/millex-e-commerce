import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { format } from "date-fns";
import { Review } from "@/types/review-types";

interface Props {
  reviews: Review[];
}

const ReviewList = ({ reviews }: Props) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper", mt: 6 }}>
      {reviews.map((item) => {
        return (
          <Box key={item._id}>
            <ListItem alignItems="flex-start" sx={{ paddingLeft: 0 }}>
              <ListItemText
                primary={
                  <Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        {item.userId.name}
                      </Typography>
                      <Typography>
                        {format(new Date(item.createdAt), "yyyy-MM-dd")}
                      </Typography>
                    </Box>

                    <Rating
                      name="rating"
                      precision={0.5}
                      defaultValue={item.rating}
                      readOnly
                      sx={{ mb: 2, mt: 1 }}
                    />
                  </Box>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.primary", display: "inline" }}
                    >
                      {item.comment}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
          </Box>
        );
      })}
    </List>
  );
};

export default ReviewList;
