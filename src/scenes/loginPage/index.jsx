import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { LinkedIn } from "@mui/icons-material";
import { FlexBetween, FlexCenter } from "components/Flex";
import LightLogo from "../../assets/light.png";
import DarkLogo from "../../assets/dark.png";
import SocialMe from "../../assets/socialme.svg";
import Loading from "components/Loading";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  const isAuth = Boolean(useSelector((state) => state.token));
  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth, navigate]);

  const [pageType, setPageType] = useState("login");
  return (
    <Box
      backgroundColor={theme.palette.background.alt}
      className="min-h-full h-fit"
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
        <FlexCenter>
          <p className="font-[Oswald] tracking-widest text-xl">
            CONNECTI
            <span className="text-cyan-400">FY</span>
          </p>
        </FlexCenter>
      </Box>
      <div
        style={{
          display: "flex",
          width: isNonMobileScreens ? "90%" : "100%",
          gap: isNonMobileScreens ? "2rem" : "0",
          margin: "auto",
          flexDirection: isNonMobileScreens ? "row" : "column",
        }}
      >
        {pageType == "login" && (
          <Box
            width={isNonMobileScreens ? "40%" : "100%"}
            height={isNonMobileScreens ? "90vh%" : "25vh"}
          >
            <img
              src={SocialMe}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </Box>
        )}
        <Box
          width={isNonMobileScreens ? "40%" : "100%"}
          p="3rem 2rem"
          m={isNonMobileScreens ? " auto auto" : "0"}
          borderRadius=".5rem"

          // backgroundColor={theme.palette.background.alt}
        >
          <Form pageType={pageType} setPageType={setPageType} />
        </Box>
      </div>
    </Box>
  );
};

export default LoginPage;
