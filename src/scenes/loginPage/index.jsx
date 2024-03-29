import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { LinkedIn } from "@mui/icons-material";
import { FlexBetween } from "components/Flex";
import LightLogo from "../../assets/light.png";
import DarkLogo from "../../assets/dark.png";
import SocialMe from "../../assets/socialme.svg";
import Loading from "components/Loading";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      backgroundColor={theme.palette.background.alt}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
        sx={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        }}
      >
        <FlexBetween>
          <img
            style={{
              height: "6rem",
              width: "7rem",
            }}
            src={theme.palette.mode === "dark" ? LightLogo : DarkLogo}
          />
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
            }}
          >
            {" "}
            Social Space /
            <b
              style={{
                color: "gray",
              }}
            >
              {" "}
              Sign In To Continue
            </b>
          </p>
        </FlexBetween>
      </Box>
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <img
          src={SocialMe}
          style={{
            height: "40%",
            width: "40%",
            padding: "2rem",
            display: isNonMobileScreens ? "block" : "none",
            marginLeft: "5%",
          }}
        />
        <Box
          width={isNonMobileScreens ? "40%" : "100%"}
          p="3rem"
          m={isNonMobileScreens ? "0rem 5rem auto auto" : "0"}
          borderRadius=".5rem"

          // backgroundColor={theme.palette.background.alt}
        >
          <Form />
        </Box>
      </div>
    </Box>
  );
};

export default LoginPage;
