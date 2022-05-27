import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
interface StateParams {}

const initialState: StateParams = {};

const sopManagement = createSlice({
    name: "sopManagement",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(, ()=>{
        // })
    },
});

export const {} = sopManagement.actions;

export default sopManagement.reducer;
