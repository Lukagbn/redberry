"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormGroup from "../FormGroup/FormGroup";
import Button from "@/components/Buttons/Button/Button";
import ModalFooter from "../ModalFooter/ModalFooter";
import styles from "./Login.module.scss";

function Login({
  onClose,
  goToRegister,
}: {
  onClose: () => void;
  goToRegister: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const inputValue = e.target.value;
    setEmail(inputValue);
    if (!emailRegex.test(inputValue)) {
      setEmailError("Invalid email format!");
    } else {
      setEmailError(null);
    }
  }
  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setPassword(inputValue);
    if (inputValue.length < 3) {
      setPasswordError("Invalid Password!");
    } else {
      setPasswordError(null);
    }
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let hasError = false;

    if (!email) {
      setEmailError("Email is required!");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Password is required!");
      hasError = true;
    }
    if (emailError || passwordError) {
      hasError = true;
    }
    if (!hasError) {
      handleLogIn({ email, password });
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
        setError("Wrong Creditails!");
        return;
      }
      localStorage.setItem("user", result.data.token);
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <FormGroup
        label="Email"
        input="email"
        onChange={handleEmail}
        error={emailError}
      />
      <FormGroup
        label="password"
        input="password"
        onChange={handlePassword}
        error={passwordError}
      />
      <Button width="100%" height="47px" title="log in" />
      <span className={styles.loginError}>{error ? error : null}</span>

      <ModalFooter
        text="Don’t have an account?"
        linkText="Sign Up"
        href={"#"}
        onClick={goToRegister}
      />
    </form>
  );
}

export default Login;
