"use client";
import React from "react";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Profile from "./Profile/Profile";

function ModalManager() {
  return (
    <>
      <Login />
      <Register />
      <Profile />
    </>
  );
}

export default ModalManager;
