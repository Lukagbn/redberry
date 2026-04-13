import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: UserProps | null = null;

const userSlice = createSlice({
  name: "user",
  initialState: initialState as UserProps | null,
  reducers: {
    setUser(_, action: PayloadAction<UserProps>) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
