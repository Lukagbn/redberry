import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "@/lib/slices/modalSlice";
import userSlice from "@/lib/slices/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      modal: modalSlice,
      user: userSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
