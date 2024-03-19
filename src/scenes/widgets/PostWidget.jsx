import * as React from "react";

import Input from "@mui/material/Input";

import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  OtherHouses,
  ShareOutlined,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { apiService } from "apiHandled/common-services";
import { FlexBetween, FlexCenter } from "components/Flex";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { isNonMobileScreens, timeAgo } from "utils/helper";
import Comment from "components/Comment";
import DeleteModal from "components/common-comps/DeleteModal";

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
  console.log();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [userComment, setUserComment] = useState("");
  
  const theme = useTheme();
  // console.log(comments);
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
    if (close == 1) handleDelete();
    setOpen(false);
  };

  const addComment = async () => {
    console.log(userComment);
    const addComment = {
      id: user._id,
      comment: userComment,
      imageUrl: user.picturePath,
      name: user.firstName+"_"+user.lastName,
    };
    console.log(addComment);
    const response = await apiService.addComment(postId, token, addComment);
    // const updatedPost = await response.json();
    // dispatch(setPost({ post: updatedPost }));
    // window.location.reload();
    //APi to add comment
  };

  return (
    <WidgetWrapper m="1.3rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        occupation={occupation}
      />
      <Typography color={main} sx={{ m: "1rem 0" }}>
        {description}
      </Typography>
      <Divider />
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={apiService.getImages(picturePath)}
        />
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
          <Box style={{
            // backgroundColor:"red",
            padding:".3rem",
            border:"1px solid gray",
            borderRadius:".5rem",
            margin:" 1rem 0",
          }}>

          <FlexBetween style={{ width: "100%" }}>
            <input
              label="Last Name"
              name="lastName"
              style={{
                width: "90%",
                padding: ".4rem",
                outline:"none",
                border:"none",
                backgroundColor:"transparent",
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
              height: "16rem",
              // backgroundColor: "red",
              overflow:"scroll"
            }}
          >
            {comments.map((comment, i) => (
              <Comment comment={comment} />
            ))}
          </div>
          {/* <Divider /> */}
        </Box>
      )}
      <DeleteModal open={open} handleClose={handleClose} />
    </WidgetWrapper>
  );
};

export default PostWidget;
