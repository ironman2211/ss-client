import React from "react";
import { useTheme } from "@emotion/react";
import { IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const ButtonOne = ({ naviageTo, icon }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <IconButton
      onClick={() => navigate(naviageTo)}
      style={
        location.pathname === naviageTo
          ? { color: "#42a1f5" }
          : { color: theme.palette.mode === "dark" ? "white" : "black" }
      }
      cursor="pointer"
    >
      {icon}
    </IconButton>
  );
};

export default ButtonOne;
