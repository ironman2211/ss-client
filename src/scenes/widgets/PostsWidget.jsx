import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { apiService } from "apiHandled/common-services";
import { Box, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await apiService.getAllPosts(token);
    const data = await response.json();
    console.log(data);
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await apiService.getUserPosts(userId, token);
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          occupation,createdAt
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            occupation={occupation}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            createdAt={createdAt}
          />
        )
      )}
      {posts.length == 0 ? (
        <Box>
          <WidgetWrapper>
            <b>Post Unavailable : (</b>
          </WidgetWrapper>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default PostsWidget;
