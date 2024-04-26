import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "firebase/auth";

export type userState = {
  currentUser: User | null;
};

const INITIAL_STATE: userState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    signInUserStore: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    signOutUserStore: (state) => {
      state.currentUser = null;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { signInUserStore, signOutUserStore } = userSlice.actions;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
