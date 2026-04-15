"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import BaseModal from "../BaseModal";
import { closeModal } from "@/lib/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import FormGroup from "../Auth/FormGroup/FormGroup";
import User from "@/components/Icons/User/User";
import Button from "@/components/Buttons/Button/Button";
import { setUser } from "@/lib/slices/userSlice";

interface UserApiResponse {
  data: UserProps;
}
interface UserProps {
  age: number;
  avatar: string;
  email: string;
  fullName: string;
  id: number;
  mobileNumber: string;
  profileComplete: boolean;
  username: string;
}

function Profile() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  const activeModal = useAppSelector((state) => state.modal.activeModal);
  const [user, setLocalUser] = useState<UserProps | null>(null);
  const [username, setUsername] = useState<string | "">("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | "">("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | "">("");
  const isOpen = activeModal === "profile";
  const handleClose = () => {
    dispatch(closeModal());
  };
  async function fetchUser() {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        "https://api.redclass.redberryinternship.ge/api/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result: UserApiResponse = await res.json();
      setLocalUser(result.data);
      dispatch(setUser(result.data));
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdate() {
    if (username && (username.length < 3 || username.length > 50)) return;
    try {
      const formData = new FormData();
      formData.append("full_name", username);
      formData.append("mobile_number", phone);
      if (age) formData.append("age", String(age));
      if (image) formData.append("avatar", image);

      const res = await fetch(
        "https://api.redclass.redberryinternship.ge/api/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        },
      );
      const result = await res.json();
      if (res.ok) {
        setLocalUser(result.data);
        dispatch(setUser(result.data));
        alert("Profile updated successfully");
        handleClose();
      } else {
        console.log(result);
      }
      if (!username) {
        setUsernameError("Username required!");
      }
      if (!age) {
        setAgeError("Age required!");
      }
      if (!phone) {
        setPhoneError("Mobilephone required!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleLogOut() {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        "https://api.redclass.redberryinternship.ge/api/logout",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
          body: "",
        },
      );
      if (res.ok) {
        console.log("Logged out successfully");
      }
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("token");
      window.location.reload();
    }
  }
  function handleuserName(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setUsername(input);
    if (input.length < 3) {
      setUsernameError("Username must be at least 3 characters!");
    } else if (input.length > 50) {
      setUsernameError("Username should not exceed 50 characters!");
    } else {
      setUsernameError(null);
    }
  }
  function handlePhone(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value.replace(/\D/g, "");
    setPhone(input);
    if (!input.startsWith("5")) {
      setPhoneError("Georgian mobile numbers must start with 5");
    } else if (input.length !== 9) {
      setPhoneError("Mobile number must be exactly 9 digits");
    } else {
      setPhoneError(null);
    }
  }
  function handleAge(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setAge(Number(input));
    if (input === "" || input === null) {
      setAgeError(null);
      return;
    }
    const num = parseInt(input, 10);
    if (num < 16) {
      setAgeError("You must be at least 16 years old to enroll");
    } else if (num > 120) {
      setAgeError("Please enter a valid age");
    } else {
      setAgeError(null);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
  if (!user) return;
  return (
    <BaseModal title="Profile" onClose={handleClose} open={isOpen}>
      <div className={styles.profileModal}>
        <div className={styles.avatarWrapper}>
          <User
            margin="0px"
            src={imagePreview ?? user.avatar}
            profileComplete={userData?.profileComplete ?? null}
          />
          <div className={styles.usernameWrapper}>
            <h3 className={styles.username}>{user.username}</h3>
            {user.profileComplete ? (
              <p className={styles.complete}>Profile is Complete</p>
            ) : (
              <p className={styles.incomplete}>Incomplete profile</p>
            )}
          </div>
        </div>
        <FormGroup
          label="Full Name"
          placeHolder={user.username}
          input={"text"}
          success={!!username && !usernameError}
          error={usernameError}
          onChange={handleuserName}
        />
        <div className={styles.emailWrapper}>
          <p className={styles.label}>Email</p>
          <div className={styles.email}>
            <span>{user.email}</span>
          </div>
        </div>
        <div className={styles.profileBottomWrapper}>
          <FormGroup
            label="Mobile number"
            placeHolder={String(user.mobileNumber)}
            input={"text"}
            maxLength={9}
            success={!!phone && !phoneError}
            error={phoneError ? " " : null}
            onChange={handlePhone}
            value={phone}
          />
          <FormGroup
            label="Age"
            placeHolder={String(user.age ?? 16)}
            input={"number"}
            maxWidth="85px"
            success={!!age && !ageError}
            error={ageError ? " " : null}
            value={age ? String(age) : ""}
            onChange={handleAge}
          />
        </div>
        {phoneError && <span className={styles.error}>{phoneError}</span>}
        {ageError && <span className={styles.error}>{ageError}</span>}
        <FormGroup
          label="Upload Avatar"
          input="file"
          placeHolder="Username"
          error={imageError}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const allowed = ["image/png", "image/jpeg", "image/webp"];
            if (!allowed.includes(file.type)) {
              setImageError("Only PNG, JPG and WEBP are allowed!");
              return;
            }
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
          }}
        />
        <Button
          title="Update Profile"
          height="47px"
          width="100%"
          onClick={handleUpdate}
        />
        <Button
          title="Log Out"
          height="47px"
          width="100%"
          onClick={handleLogOut}
        />
      </div>
    </BaseModal>
  );
}

export default Profile;
