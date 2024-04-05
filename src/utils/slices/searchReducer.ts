import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type SearchState = {
  search: '';
};

const INITIAL_STATE: SearchState = {
  search: '',
};

export const searchSlice = createSlice({
  name: "search",
  initialState: INITIAL_STATE,
  reducers: {
    add: (state, action: PayloadAction<object>) => {
      state.searchHistory = [...state.searchHistory, action.payload];
    },
  },
});


export const historyReducer =   historySlice.reducer;
export const { addToHistory } = historySlice.actions;
export const selectSearchHistory = (state: RootState) =>
  state.history.searchHistory;