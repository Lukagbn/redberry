"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormGroup from "../FormGroup/FormGroup";
import Button from "@/components/Buttons/Button/Button";
import ModalFooter from "../ModalFooter/ModalFooter";
import BaseModal from "../../BaseModal";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { closeModal, openModal } from "@/lib/slices/modalSlice";

function Login() {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector((state) => state.modal.activeModal);
  const isOpen = activeModal === "login";
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | "">("");
  const handleClose = () => {
    dispatch(closeModal());
  };
  const goToRegister = () => {
    dispatch(openModal("register"));
  };
  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const inputValue = e.target.value;
    setEmail(inputValue);
    if (inputValue && !emailRegex.test(inputValue)) {
      setEmailError("Invalid email format!");
    } else if (e.target.value.length === 0) {
      setEmailError("Email required!");
    } else {
      setEmailError(null);
    }
  }
  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setPassword(inputValue);
    if (inputValue.length === 0) {
      setPasswordError("Password required!");
    } else {
      setPasswordError(null);
    }
  }
  async function handleLogIn(data: { email: string; password: string }) {
    try {
      const res = await fetch(
        "https://api.redclass.redberryinternship.ge/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        },
      );
      const result = await res.json();
      if (!res.ok) {
        setSubmitError("Wrong credentials!");
        return;
      }
      localStorage.setItem("token", result.data.token);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <BaseModal
      title="Welcome Back"
      open={isOpen}
      onClose={handleClose}
      text="Log in to continue your learning"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!email) {
            setEmailError("Email required!");
            return;
          }
          if (!password) {
            setPasswordError("Password required!");
            return;
          }
          handleLogIn({ email, password });
        }}
      >
        <FormGroup
          label="Email"
          input="email"
          placeHolder="Email"
          onChange={handleEmail}
          error={emailError}
          value={email}
        />
        <FormGroup
          label="Password"
          input="password"
          placeHolder="Password"
          onChange={handlePassword}
          error={passwordError}
          value={password}
        />
        <Button width="100%" height="47px" title="log in" />

        <span
          style={{
            color: "red",
            fontSize: "14px",
            display: "block",
            marginTop: "10px",
            height: "20px",
            textAlign: "center",
          }}
        >
          {submitError}
        </span>

        <ModalFooter
          text="Don’t have an account?"
          linkText="Sign Up"
          href={"#"}
          onClick={goToRegister}
        />
      </form>
    </BaseModal>
  );
}
export default Login;
