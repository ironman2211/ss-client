import LightLogo from "../../assets/light.png";
import DarkLogo from "../../assets/dark.png";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Menu,
  Close,
  LinkedIn,
} from "@mui/icons-material";
import ChatIcon from '@mui/icons-material/Chat';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import {FlexBetween} from "components/Flex";
import ButtonOne from "components/common-comps/ButtonOne";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isDark = () => {
    return theme.palette.mode === "dark";
  };

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  const logOut = () => {
    window.localStorage.removeItem("token");
    dispatch(setLogout());
  };
  return (
    <FlexBetween padding=".1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <img
          src={isDark() ? LightLogo : DarkLogo}
          onClick={() => navigate("/home")}
          style={{ height: "5rem", width: "6rem", cursor: "pointer" }}
        />
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <PeopleAltIcon
            sx={{ fontSize: "25px" }}
            onClick={() => navigate("/people")}
            cursor="pointer"
            style={
              window.location.pathname === "/people"
                ? { color: "#324ea8" }
                : { color: theme.palette.mode }
            }
          />
          <ChatIcon
            sx={{ fontSize: "25px" }}
            onClick={() => navigate("/message")}
            cursor="pointer"
            style={
              window.location.pathname === "/message"
                ? { color: "#324ea8" }
                : { color: theme.palette.mode }
            }
          />
          <IconButton onClick={() => dispatch(setMode())}>
            {isDark() ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <ButtonOne content="Log Out" mode={isDark()} onClick={()=>logOut()} />
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <PeopleAltIcon
              sx={{ fontSize: "25px" }}
              onClick={() => navigate("/people")}
              cursor="pointer"
              style={
                window.location.pathname === "/people"
                  ? { color: "#324ea8" }
                  : { color: theme.palette.mode }
              }
            />
             <ChatIcon
              sx={{ fontSize: "25px" }}
              onClick={() => navigate("/message")}
              cursor="pointer"
              style={
                window.location.pathname === "/message"
                  ? { color: "#324ea8" }
                  : { color: theme.palette.mode }
              }
            />
            <ButtonOne content="Log Out" mode={isDark()} onClick={()=>logOut()} />
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
