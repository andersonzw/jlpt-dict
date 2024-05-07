import { createSlice } from "@reduxjs/toolkit";
import { DataObjectType } from "../functions";

const INITIAL_STATE:DataObjectType = {
    jlptn0: [],
    jlptn1: [],
    jlptn2: [],
    jlptn3: [],
    jlptn4: [],
    jlptn5: [],
}
export const dataSlice = createSlice({
    name: "data",
    initialState: INITIAL_STATE,
    reducers:{
        addDataToStore: (state,action)=>{
            state.data = action.payload
        }
    }
})