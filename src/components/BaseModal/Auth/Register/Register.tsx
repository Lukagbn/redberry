"use client";
import React, { act, ChangeEvent, useEffect, useState } from "react";
import BaseModal from "../../BaseModal";
import FormGroup from "../FormGroup/FormGroup";
import Button from "@/components/Buttons/Button/Button";
import styles from "./Register.module.scss";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { closeModal, openModal } from "@/lib/slices/modalSlice";
import ModalFooter from "../ModalFooter/ModalFooter";
import GoBack from "@/components/Icons/GoBack";

function Register() {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector((state) => state.modal.activeModal);
  const isOpen = activeModal === "register";
  const [activeIndex, setActiveIndex] = useState<number | 0>(0);
  const [email, setEmail] = useState<string | "">("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState<string | "">("");
  const [repassword, setRePassword] = useState<string | "">("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [rePasswordError, setRePasswordError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | "">("");
  const [userNameError, setUserNameError] = useState<string | "">("");
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | "">("");
  const [submitError, setSubmitError] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleClose = () => {
    dispatch(closeModal());
  };
  const goToLogIn = () => {
    dispatch(openModal("login"));
  };
  const handleNext = async () => {
    if (activeIndex === 0) {
      if (!email) {
        setEmailError("Email is required");
        return;
      }
      if (emailError) {
        return;
      }
    }
    if (activeIndex === 1) {
      if (password.length === 0) {
        setPasswordError("Password required!");
        return;
      }
      if (repassword.length === 0) {
        setRePasswordError("Repeat password is required!");
        return;
      } else if (password !== repassword) {
        setPasswordError("Passwords must match!");
        setRePasswordError("Passwords must match!");
        return;
      } else {
        setPasswordError("");
        setRePasswordError("");
      }
      if (password.length < 3) {
        setPasswordError("Password should be at least 3 characters long!");
        return;
      }
    }
    if (activeIndex === 2) {
      if (!userName) {
        setUserNameError("Username required!");
        return;
      }
      await handleRegister();
    }
    if (activeIndex < 2) return setActiveIndex((prev) => prev + 1);
  };
  const handleBack = () => {
    if (activeIndex <= 0) return setActiveIndex(0);
    setActiveIndex(activeIndex - 1);
  };
  const renderStepContent = () => {
    return (
      <>
        <div style={{ display: activeIndex === 0 ? "block" : "none" }}>
          <FormGroup
            label="Email*"
            input="email"
            placeHolder="Email"
            error={emailError}
            value={email ?? ""}
            onChange={handleEmail}
          />
        </div>
        <div style={{ display: activeIndex === 1 ? "block" : "none" }}>
          <FormGroup
            label="Password*"
            input="password"
            placeHolder="password"
            error={passwordError}
            value={password}
            onChange={handlePassword}
          />
          <FormGroup
            label="Confirm Password*"
            input="password"
            placeHolder="password"
            error={rePasswordError}
            value={repassword}
            onChange={handleRePassword}
          />
        </div>
        <div style={{ display: activeIndex === 2 ? "block" : "none" }}>
          <FormGroup
            label="Username*"
            input="text"
            placeHolder="Username"
            error={userNameError}
            onChange={handleUserName}
          />
          {imagePreview ? (
            <div className={styles.filePreview}>
              <img
                src={imagePreview}
                className={styles.previewThumb}
                alt="avatar preview"
              />
              <div className={styles.previewInfo}>
                <p className={styles.previewName}>{image?.name}</p>
                <p className={styles.previewSize}>
                  Size ·{" "}
                  {image ? (image.size / (1024 * 1024)).toFixed(1) + " MB" : ""}
                </p>
                <button
                  className={styles.changeBtn}
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                >
                  Change
                </button>
              </div>
            </div>
          ) : (
            <FormGroup
              label="Upload Avatar*"
              input="file"
              placeHolder=""
              accept="image/png,image/jpeg,image/webp"
              error={imageError}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const allowed = ["image/png", "image/jpeg", "image/webp"];
                if (!allowed.includes(file.type)) {
                  setImageError("Only PNG, JPG and WEBP are allowed!");
                  return;
                }
                setImageError("");
                setImage(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          )}
        </div>
      </>
    );
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
    const input = e.target.value;
    setPassword(input);
    if (input.length < 3) {
      setPasswordError("Password should be at least 3 characters long!");
    } else {
      setPasswordError(null);
    }
  }
  function handleRePassword(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setRePassword(input);
    if (input !== password) {
      setRePasswordError("Passwords must match");
    } else {
      setRePasswordError(null);
    }
  }
  function handleUserName(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setUserName(input);
    if (input.length < 3) {
      setUserNameError("Username must be 3 characters long!");
    } else {
      setUserNameError("");
    }
  }
  async function handleRegister() {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", repassword);
      formData.append("username", userName);
      if (image) formData.append("avatar", image);

      const res = await fetch(
        "https://api.redclass.redberryinternship.ge/api/register",
        {
          method: "POST",
          body: formData,
        },
      );
      const result = await res.json();
      if (!res.ok) {
        setSubmitError(result.message || "Registration failed!");
        return;
      }
      localStorage.setItem("token", result.data.token);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
      setSubmitError("Something went wrong!");
    }
  }
  return (
    <BaseModal
      title="Create Account"
      open={isOpen}
      onClose={handleClose}
      text="Join and start learning today"
    >
      {activeIndex > 0 && <GoBack onClick={handleBack} />}
      <div className={styles.stepper}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={
              i <= activeIndex
                ? { backgroundColor: "#4F46E5" }
                : { backgroundColor: "#EEEDFC" }
            }
          ></div>
        ))}
      </div>
      <div>{renderStepContent()}</div>
      <Button
        width="100%"
        height="47px"
        title={activeIndex === 2 ? "sign up" : "Next"}
        onClick={handleNext}
      />
      <span
        style={{
          color: "red",
          fontSize: "14px",
          display: "block",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        {submitError}
      </span>
      <ModalFooter
        text="Already have an account?"
        linkText="Log In"
        href={"#"}
        onClick={goToLogIn}
      />
    </BaseModal>
  );
}

export default Register;
