import React from 'react'
import PlaceHolderImage from "../assets/place1.jpg";

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
