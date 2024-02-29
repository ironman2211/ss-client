import { Box } from "@mui/material";
import { apiService } from "apiHandled/common-services";
import ImgAndPlaceHolder from "./ImgAndPlaceHolder";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <ImgAndPlaceHolder
        style={{ objectFit: "cover", borderRadius: "50%",padding: ".4rem", }}
        width={size}
        height={size}
        alt="image_unavailable"
        src={apiService.getImages(image)}
      />
    </Box>
  );
};

export default UserImage;
