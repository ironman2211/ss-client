import LightLogo from "../../assets/light.png";
import DarkLogo from "../../assets/dark.png";
import { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
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
  Modal,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Menu,
  Close,
  LinkedIn,
} from "@mui/icons-material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import { FlexBetween, FlexCenter } from "components/Flex";
import ButtonOne from "components/common-comps/ButtonOne";
import StickyFooter from "components/StickyFooter";
import MyPostWidget from "scenes/widgets/MyPostWidget";

const Navbar = ({ isAuth }) => {
  console.log(isAuth);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width: 650px)");
  const { token } = useSelector;

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isNonMobileScreens ? 600 : 350,
    outline:"none",
    // bgcolor: "background.paper",
    // boxShadow: 24,
  };

  const logOut = () => {
    window.localStorage.removeItem("token");
    dispatch(setLogout());
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {}, [window.location.pathname]);
  if (isAuth)
    return (
      <>
        <FlexBetween
          width="100%"
          backgroundColor={theme.palette.background.alt}
          p="1rem 6%"
          textAlign="center"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
          style={{
            justifyContent: isNonMobileScreens ? "" : "center",
          }}
        >
          <p className="font-[Oswald] tracking-widest text-xl">
            CONNECTI
            <span className="text-cyan-400">FY</span>
          </p>
          {isNonMobileScreens && (
            <FlexBetween className="w-[25rem]">
              <IconButton onClick={handleOpen} cursor="pointer">
                <AddAPhotoIcon sx={{ fontSize: "25px" }} />
              </IconButton>
              <ButtonOne
                naviageTo="/home"
                icon={<HomeIcon sx={{ fontSize: "25px" }} />}
              />
              <ButtonOne
                naviageTo="/people"
                icon={<PeopleAltIcon sx={{ fontSize: "25px" }} />}
              />

              <IconButton onClick={() => dispatch(setMode())}>
                {isDark() ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <IconButton onClick={() => logOut()}>
                <LogoutIcon />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>
        {!isNonMobileScreens && (
          <>
            <footer className="fixed bottom-0 left-0 right-0 z-50">
              <FlexBetween
                className="w-[20rem] px-5 py-2"
                backgroundColor={theme.palette.background.alt}
                width="100%"
              >
                <ButtonOne
                  naviageTo="/home"
                  icon={<HomeIcon sx={{ fontSize: "25px" }} />}
                />
                <ButtonOne
                  naviageTo="/people"
                  icon={<PeopleAltIcon sx={{ fontSize: "25px" }} />}
                />
                <IconButton onClick={handleOpen} cursor="pointer">
                  <AddAPhotoIcon sx={{ fontSize: "25px" }} />
                </IconButton>

                <ButtonOne
                  naviageTo="/message"
                  icon={<ChatIcon sx={{ fontSize: "25px" }} />}
                />
                {/* <IconButton onClick={() => dispatch(setMode())}>
                  {isDark() ? (
                    <DarkMode sx={{ fontSize: "25px" }} />
                  ) : (
                    <LightMode sx={{ color: dark, fontSize: "25px" }} />
                  )}
                </IconButton> */}
                <IconButton onClick={() => logOut()}>
                  <LogoutIcon />
                </IconButton>
              </FlexBetween>
            </footer>
          </>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <MyPostWidget
              picturePath={"https://i.pravatar.cc/300"}
              marginBottom="1rem"
            />
          </Box>
        </Modal>
      </>
    );
  else
    return (
      <FlexBetween
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        style={{
          justifyContent: isNonMobileScreens && isAuth ? "" : "center",
        }}
      >
        <p className="font-[Oswald] tracking-widest text-xl">
          CONNECTI
          <span className="text-cyan-400">FY</span>
        </p>
      </FlexBetween>
    );
};

export default Navbar;
