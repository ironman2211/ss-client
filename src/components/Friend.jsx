import { PersonAddOutlined } from "@mui/icons-material";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import UserImage from "./UserImage";
import CheckIcon from '@mui/icons-material/Check';
import { apiService } from "apiHandled/common-services";
import { FlexBetween } from "./Flex";
const Friend = ({ friendId, name, subtitle, userPicturePath, occupation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { palette } = useTheme();
  // const primaryLight = palette.primary.light;
  // const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const patchFriend = async () => {
    const response = await apiService.getAllFriends(friendId,token);
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="50px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
          style={{
            cursor:"pointer"
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            cursor="pointer"
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {_id !== friendId && (<Button
        sx={{
          fontSize: ".8rem",
          textTransform: "capitalize",
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          justifyContent: "center",
          
        }}
        onClick={() => patchFriend()}
      >
        {isFriend ? <CheckIcon sx={{color:"red"}}/> : <PersonAddOutlined color="red" />}
        {
          isFriend ? (<Typography color="red">Following</Typography>) : (<Typography> Follow</Typography>)
        }


      </Button>)}
    </FlexBetween>
  );
};

export default Friend;
