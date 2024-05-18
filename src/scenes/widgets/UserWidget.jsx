import {
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import { FlexCenter, FlexBetween, FlexStart } from "components/Flex";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "services/CommonServices";

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const currUser = useSelector((state) => state.user);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const getUser = async () => {
    if (currUser._id !== userId) {
      const response = await apiService.getUser(userId, token);
      const data = await response.json();
      setUser(data);
    } else {
      setUser(currUser);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
    posts,
    description,
    picturePath,
  } = user;
  return (
    <WidgetWrapper>
      <FlexCenter gap="2rem" padding="1rem" size="85px">
        <UserImage image={picturePath} size="85px" />
      </FlexCenter>
      <FlexCenter
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <Typography
          variant="h4"
          color={dark}
          fontWeight="500"
          sx={{
            "&:hover": {
              color: dark,
              cursor: "pointer",
            },
          }}
        >
          {"@" + firstName.charAt(0).toUpperCase()}
        </Typography>
      </FlexCenter>
      <FlexCenter style={{ marginTop: "-.5rem" }}>
        <b>
          {firstName.charAt(0).toUpperCase() + "_" + firstName.slice(1)}
          {lastName}
        </b>
      </FlexCenter>
      {true && <FlexCenter gap="1rem">{description}</FlexCenter>}
      <FlexBetween padding="1rem" color={palette.secondary}>
        <Typography color={medium}>{friends.length} Following</Typography>
        <Typography color={medium}>{posts.length} Posts</Typography>
      </FlexBetween>

      <Divider />

      <Box p="1.5rem .5rem">
        <FlexBetween>
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="medium" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
        </FlexBetween>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="medium" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
        <FlexBetween></FlexBetween>
      </Box>

      <Divider />

      <Box p="1.5rem .5rem">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
