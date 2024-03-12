import PeopleIcon from "@mui/icons-material/People";
import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { apiService } from "apiHandled/common-services";
import {FlexCenter,FlexBetween} from "components/Flex";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const getFriends = async () => {
    const response = await apiService.getUserFriends(userId, token);
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <FlexBetween gap="2rem" padding="1rem .5rem">
        <Typography
          fontWeight="500"
          sx={{
            cursor: "pointer",
            color: palette.neutral.dark,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            justifyContent: "center",
            fontSize:isNonMobileScreens?"1.3rem":".9rem"
          }}
        >
          <PeopleIcon />
          Friends
        </Typography>
      </FlexBetween>
      <Divider />
      <Box display="flex" flexDirection="column" gap="1.5rem" padding="1rem 0">
        {friends.map((friend, index) => (
          <Friend
          
            key={index}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
        <FlexCenter>
          <Typography>
            {friends.length == 0 ? "You Don't Have Any Friends" : ""}
          </Typography>
        </FlexCenter>
      </Box>
      
    </WidgetWrapper>
  );
};

export default FriendListWidget;
