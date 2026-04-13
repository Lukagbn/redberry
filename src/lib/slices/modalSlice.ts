import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  activeModal: "login" | "register" | "profile" | "enrolled" | "warning" | null;
}

const initialState: ModalState = {
  activeModal: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<
        "login" | "register" | "profile" | "enrolled" | "warning"
      >,
    ) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
