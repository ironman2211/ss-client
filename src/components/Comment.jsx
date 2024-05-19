import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import { apiService } from "services/CommonServices";
import React from "react";
import { timeAgo } from "utils/helper";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
const Comment = ({ comment }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate=useNavigate();
  return (
    <>
      <Box
        padding=".8rem .3rem"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          gap: ".8rem",
        }}
      >
        <Box
          width={isNonMobileScreens ? "6%" : "10%"}
          style={{
            cursor: "pointer",
          }}
          // onClick={() => {
          //   navigate(`/profile/${comment.id}`);
          //   navigate(0);
          // }}
        >
          <img
            src={apiService.getImages(comment.imageUrl)}
            style={{
              height: "2rem",
              width: "2rem",
              margin: ".3rem 0",
              borderRadius: "50%",
            }}
          />
        </Box>
        <Box width="80%">
          <Typography
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            fontSize={isNonMobileScreens ? ".9rem" : ".7rem"}
          >
            <b>{comment?.name}</b>
          </Typography>
          <Typography
            marginTop=".4rem"
            width="100%"
            fontSize={isNonMobileScreens ? ".8rem" : ".6rem"}
          >
            {comment.comment}{" "}
          </Typography>
        </Box>

        <Box
          width={isNonMobileScreens ? "15%" : "40%"}
          style={{
            fontSize: ".7rem",
            color: "gray",
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            alignItems: "flex-end",
          }}
        >
          {timeAgo(comment.createdAt)}
          {/* <DeleteIcon color="error" style={{ cursor: "pointer" }} /> */}
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default Comment;
