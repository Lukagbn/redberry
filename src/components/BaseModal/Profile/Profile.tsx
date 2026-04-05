import React from "react";
import styles from "./Profile.module.scss";
import BaseModal from "../BaseModal";
import { closeModal } from "@/lib/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

function Profile() {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector((state) => state.modal.activeModal);
  const isOpen = activeModal === "profile";
  function handleLogOut() {
    localStorage.removeItem("user");
    handleClose();
    window.location.reload();
  }
  const handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <BaseModal title="My Profile" onClose={handleClose} open={isOpen}>
      <div className={styles.profileModal}>
        <p>Settings</p>
        <button className={styles.logoutBtn} onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </BaseModal>
  );
}

export default Profile;
