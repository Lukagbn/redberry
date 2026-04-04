"use client";
import React from "react";
import FormGroup from "../FormGroup/FormGroup";
import Button from "@/components/Buttons/Button/Button";
import ModalFooter from "../ModalFooter/ModalFooter";

function Register({ goToLogin }: { goToLogin: () => void }) {
  return (
    <>
      <FormGroup label="Email" input="email" />
      <Button width="100%" height="47px" title="Next" />
      <ModalFooter
        text="Already have an account?"
        href={"#"}
        linkText="Log In"
        onClick={goToLogin}
      />
    </>
  );
}

export default Register;
