import { Box } from "@mui/material";
import { apiService } from "services/CommonServices";
import ImgAndPlaceHolder from "./ImgAndPlaceHolder";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <ImgAndPlaceHolder
        style={{ objectFit: "cover", borderRadius: "50%", border:"2px solid gray"}}
        width={size}
        height={size}
        alt="image_unavailable"
        src={apiService.getImages(image)}
      />
    </Box>
  );
};

export default UserImage;
