import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
const AlertModal = ({title,description}) => {
  const [open, setOpen] = useState(true);
  setTimeout(() => {
    setOpen(false);
  }, 600);
  return (
    <Dialog open={open}>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <DialogTitle id="alert-dialog-title" textAlign="center">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" fontSize="1rem">
            <Typography>{description}</Typography>
          </DialogContentText>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AlertModal;
