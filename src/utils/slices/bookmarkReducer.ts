import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CardData } from "../types";

export type bookmarkState = {
  bookmarkList: {
    [key: string]: CardData[];
  };
};

const INITIAL_STATE: bookmarkState = {
  bookmarkList: { N1: [], N2: [], N3: [], N4: [], N5: [], N0: [] },
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: INITIAL_STATE,
  reducers: {
    addToBookmarks: (state, action: PayloadAction<CardData>) => {
      const level = action.payload.level;
      state.bookmarkList[level] = [
        ...state.bookmarkList[level],
        action.payload,
      ];
    },
    removeFromBookmarks: (state, action: PayloadAction<CardData>) => {
      const level = action.payload.level;
      state.bookmarkList[level] = state.bookmarkList[level].filter(
        (ele) => ele.grammar !== action.payload.grammar
      );
    },
  },
});

export const bookmarkReducer = bookmarkSlice.reducer;
export const { addToBookmarks, removeFromBookmarks } = bookmarkSlice.actions;
export const selectBookmarks = (state: RootState) =>
  state.bookmark.bookmarkList;
