import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const FlexStart = styled(Box)({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
});

const FlexCenter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const FlexWrap = styled(Box)({
  display: "flex",
  justifyContent: "start",
  gap: "1.5rem",
  alignItems: "center",
  flexWrap: "wrap",
});

export { FlexBetween, FlexStart, FlexCenter, FlexWrap };
