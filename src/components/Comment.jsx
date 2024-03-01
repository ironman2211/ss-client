import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { timeAgo } from 'utils/helper';

const Comment = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box display="flex" gap=".8rem" padding="1rem .3rem"  >
    <img
      src="https://random.imagecdn.app/100/100"
      style={{
        height: "2rem",
        width: "2rem",
        margin:".3rem 0",
        borderRadius: "50%",
      }}
    />
    <Box width="100%">
      <Typography
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontSize={isNonMobileScreens ? ".9rem" : ".7rem"}
      >
        <b>User Nme</b>
     
      </Typography>
      <Typography
        marginTop=".4rem"
        width="100%"
        fontSize={isNonMobileScreens ? ".8rem" : ".6rem"}
      >
        thi is my functking  djkasndjknas dasjdkljasnldkjnasjkfd asjfah;dlfba foiajsodfjas dasifhjrweuihf
      </Typography>
      <span style={{ fontSize: ".7rem" ,color:"gray" }}>
          {timeAgo("2024-03-01T18:47:00.521Z")}
        </span>
    </Box>
  </Box>
  )
}

export default Comment
