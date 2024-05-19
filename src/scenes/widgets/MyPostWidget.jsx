import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { FlexBetween, FlexCenter, FlexStart } from "components/Flex";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { apiService } from "services/CommonServices";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [isImage, setIsImage] = useState(false); // Option to upload photo or not
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const navigate = useNavigate();

  const handlePost = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const response = await apiService.addPost(formData, token);
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
    setUploading(false);
    navigate("/home");

    window.location.reload();
  };
  const isNonMobileScreens = useMediaQuery("(min-width: 650px)");

  return (
    <WidgetWrapper>
      <FlexBetween>
        <UserImage
          image={picturePath}
          size={isNonMobileScreens ? "4rem" : "15%"}
        />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: isNonMobileScreens ? "85%" : "80%",
            borderBottom: "1px solid gray",
            // backgroundColor: palette.neutral.light,

            padding: ".3rem",
          }}
        />
      </FlexBetween>
      {isImage && !uploading && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {/* <Divider sx={{ margin: "1.25rem 0" }} /> */}

      {!uploading ? (
        <FlexBetween style={{ marginTop: "2rem" }}>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>

          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.default,
              backgroundColor: palette.primary.dark,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </FlexBetween>
      ) : (
        <div className="my-10 mx-2">
          <p>Uploading . . .</p>

          <LinearProgress />
        </div>
      )}
    </WidgetWrapper>
  );
};

export default MyPostWidget;
