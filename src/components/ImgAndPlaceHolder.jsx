import React from 'react'
import PlaceHolderImage from "../assets/placeholder.png";

const ImgAndPlaceHolder = ({src,alt,...props}) => {
  const handleImageError = (event) => {
    event.target.src = PlaceHolderImage;
  };

  return (
    <img
      src={src}
      onError={handleImageError}
      alt={alt}
      {...props}
    />
  )
}

export default ImgAndPlaceHolder
