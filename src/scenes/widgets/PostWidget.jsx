import * as React from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { apiService } from "services/CommonServices";
import { FlexBetween } from "components/Flex";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { timeAgo } from "utils/helper";
import Comment from "components/Comment";
import DeleteModal from "components/common-comps/DeleteModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PlaceholderImage from "../../assets/glass.png"; // Import your placeholder image
import DescriptionWithLinks from "./DescriptionWithLinks";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
  occupation,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const user = useSelector((state) => state.user);
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [userComment, setUserComment] = useState("");

  const theme = useTheme();
  const patchLike = async () => {
    const response = await apiService.updateLike(postId, token, loggedInUserId);
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  const handleDelete = async () => {
    const response = await apiService.deletePost(postId, token, loggedInUserId);
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    window.location.reload();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (close) => {
    if (close === 1) handleDelete();
    setOpen(false);
  };

  const addComment = async () => {
    const addComment = {
      id: user._id,
      comment: userComment,
      imageUrl: user.picturePath,
      name: `${user.firstName}+" "+${user.lastName}`,
    };
    const response = await apiService.addComment(postId, token, addComment);
    const updatedPost = await response.json();
    window.location.reload();
  };

  return (
    <WidgetWrapper mb="1.3rem">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        occupation={occupation}
      />
      <DescriptionWithLinks
        description={description}
        linkColor={theme.palette.mode === "dark" ? "cyan" : "#0390fc"}
      />

      {/* <Typography color={main} sx={{ m: "1rem 0" }} >
        {description}
      </Typography> */}
      {/* <Divider /> */}
      {picturePath && (
        <div
          style={{ position: "relative", minHeight: "10rem", minWidth: "100%" }}
        >
          <LazyLoadImage
            width="100%"
            height="auto"
            alt="post"
            style={{
              borderRadius: "0.8rem",
              marginTop: "0.8rem",
              minHeight: "18rem",
              minWidth: "100%",
            }}
            src={apiService.getImages(picturePath)}
            className={
              theme.palette.mode === "dark"
                ? "dark-placeholder"
                : "light-placeholder"
            }
          />
        </div>
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween
            gap="0.3rem"
            sx={{
              margin: "-.6rem",
            }}
          >
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem" margin=".3rem 0">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="0.3rem">
          <IconButton>
            <ShareOutlined />
          </IconButton>
          {loggedInUserId === postUserId && (
            <IconButton>
              <DeleteIcon
                color="error"
                onClick={handleClickOpen}
                cursor="pointer"
              />
            </IconButton>
          )}
        </FlexBetween>
      </FlexBetween>
      <FlexBetween>
        <Typography>{timeAgo(createdAt)}</Typography>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <Box
            style={{
              padding: ".3rem",
              border: "1px solid gray",
              borderRadius: ".5rem",
              margin: " 1rem 0",
            }}
          >
            <FlexBetween style={{ width: "100%" }}>
              <input
                label="Last Name"
                name="lastName"
                style={{
                  width: "90%",
                  padding: ".4rem",
                  outline: "none",
                  border: "none",
                  backgroundColor: "transparent",
                  color:
                    theme.palette.mode === "dark"
                      ? palette.common.white
                      : palette.common.black,
                }}
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                sx={{ gridColumn: "span 2" }}
                placeholder="Add a comment..."
              />
              <Button onClick={addComment}>Comment</Button>
            </FlexBetween>
          </Box>
          <div
            style={{
              maxHeight: "16rem",
              height: "fit-content",
              overflow: "scroll",
            }}
          >
            {comments.map((comment, i) => (
              <Comment key={i} comment={comment} />
            ))}
          </div>
        </Box>
      )}
      <DeleteModal open={open} handleClose={handleClose} />
    </WidgetWrapper>
  );
};

export default PostWidget;
