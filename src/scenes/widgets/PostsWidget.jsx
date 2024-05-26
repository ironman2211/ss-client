import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { apiService } from "services/CommonServices";
import { Box, CircularProgress, IconButton } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { FlexBetween } from "components/Flex";
import SkeletonLoader from "./SkeletonLoader";
import { useTheme } from "@emotion/react";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    const response = await apiService.getAllPosts(token);
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setLoading(false);
  };

  const getUserPosts = async () => {
    const response = await apiService.getUserPosts(userId, token);
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setLoading(false);
  };
  const theme = useTheme();
  useEffect(() => {
    setLoading(true);
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? (
        <SkeletonLoader theme={theme.palette.mode} mainPage={true} />
      ) : (
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
              occupation,
              createdAt,
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
          {posts.length === 0 ? (
            <Box>
              <WidgetWrapper>
                <b>Post Unavailable : (</b>
              </WidgetWrapper>
            </Box>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default PostsWidget;
