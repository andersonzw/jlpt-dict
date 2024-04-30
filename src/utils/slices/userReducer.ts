import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type userState = {
  currentUser: {
    uid: string | null;
    email: string | null;
  };
};

const INITIAL_STATE: userState = {
  currentUser: { uid: null, email: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    signInUserStore: (state, action: PayloadAction<{ uid: string|null, email: string|null }>) => {
      state.currentUser = action.payload;
  },
    signOutUserStore: (state) => {
      state.currentUser = { uid: null, email: null };
    },
  },
});

export const userReducer = userSlice.reducer;
export const { signInUserStore, signOutUserStore } = userSlice.actions;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
