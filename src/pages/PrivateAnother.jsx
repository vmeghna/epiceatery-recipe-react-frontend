import React from "react";
import { useUser } from "../Context/Usercontext";
import Home from "./home";
import Login from "./login";
import Profile from "./Profile";

const PrivateAnother = () => {
  const uid = localStorage.getItem("UID");
  //   const { email } = useUser();
  return uid ? <Profile /> : <Login />;
};

export default PrivateAnother;
