import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FlexBetween } from "components/Flex";
const DeleteModal = ({open = false, handleClose}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          textAlign="center"
          fontSize="1.4rem"
        >
          {"Delete this post ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" fontSize="1rem">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <FlexBetween
          style={{
            width: "15rem",
            margin: "1rem auto",
          }}
        >
          <Button variant="outlined" onClick={()=>handleClose(0)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={()=>handleClose(1)}
            autoFocus
          >
            Delete
          </Button>
        </FlexBetween>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
