import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import People from "scenes/widgets/People";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import WidgetWrapper from "components/WidgetWrapper";

const FriendPage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        backgroundColor="background.default"
      >
        <Box flexBasis={isNonMobileScreens ? "22%" : undefined}  >
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "75%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >

          <FriendListWidget userId={_id} />

          <Box m="2rem 0" />
          <People userId={_id} />

        </Box>

      </Box>
    </Box>
  );
};

export default FriendPage;
