import { Button } from "@mui/material";
import React from "react";

const ButtonOne = ({ mode, onClick, content }) => {
  return (
    <Button
      variant="outlined"
      color={mode ? "primary" : "secondary"}
      onClick={onClick}
      sx={{ padding: ".4rem", width: "6rem" }}
    >
      {content}
    </Button>
  );
};

export default ButtonOne;
