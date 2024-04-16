import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CardData } from "../types";

export type bookmarkState = {
  bookmarkList: CardData[];
};

const INITIAL_STATE: bookmarkState = {
  bookmarkList: [],
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: INITIAL_STATE,
  reducers: {
    addToBookmarks: (state, action: PayloadAction<CardData>) => {
      state.bookmarkList = [...state.bookmarkList, action.payload];
    },
  },
});


export const bookmarkReducer =   bookmarkSlice.reducer;
export const { addToBookmarks } = bookmarkSlice.actions;
export const selectBookmarks = (state: RootState) =>
  state.bookmark.bookmarkList;