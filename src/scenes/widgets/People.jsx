import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PeopleWidget from "./PeopleWidget";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { apiService } from "services/CommonServices";

const People = () => {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.friends);
  const getUsers = async () => {
    const response = await apiService.getAllUsers(token);
    const data = await response.json();
    console.log(friends);
    const arrayOfIds = friends.map((obj) => obj._id);

    const filterCurrUser = data.filter((user) => user._id !== _id);
    const filterFriends = filterCurrUser.filter(
      (obj) => !arrayOfIds.includes(obj._id)
    );

    console.log(filterFriends);
    setUsers(filterFriends);
  };

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!users)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  return (
    <div
      style={{
        display: "flex",
        gap: ".8rem",
        flexWrap: isNonMobileScreens ? "wrap" : "",
        width: "100%",
        overflow: "scroll",
      }}
    >
      {users?.map((user) => (
        <PeopleWidget key={user._id} user={user} />
      ))}
    </div>
  );
};

export default People;
