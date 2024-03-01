import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",

  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.5rem",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"

}));

export default WidgetWrapper;
