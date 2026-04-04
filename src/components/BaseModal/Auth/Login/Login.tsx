"use client";
import React, { ChangeEvent } from "react";
import FormGroup from "../FormGroup/FormGroup";
import Button from "@/components/Buttons/Button/Button";
import ModalFooter from "../ModalFooter/ModalFooter";

function Login({ goToRegister }: { goToRegister: () => void }) {
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    console.log("The entire event:", e);
    console.log("Target Object:", e.target);
    console.log("Native Browser Event:", e.nativeEvent);
    console.log("Current Value:", e.target.value);
  }
  return (
    <>
      <FormGroup label="Email" input="email" />
      <FormGroup label="password" input="password" onChange={handleInput} />
      <Button width="100%" height="47px" title="log in" />

      <ModalFooter
        text="Don’t have an account?"
        linkText="Sign Up"
        href={"#"}
        onClick={goToRegister}
      />
    </>
  );
}

export default Login;
