import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface StateParams {
    sequence: string[];
}

const initialState: StateParams = {
    sequence: [],
};

const sopManagement = createSlice({
    name: "sopManagement",
    initialState: initialState,
    reducers: {
        // setTaskId: (state: StateParams, action: PayloadAction<string[]>) => {
        //     state.taskId = action.payload;
        // },
    },
    extraReducers: (builder) => {
        // builder.addCase(, ()=>{
        // })
    },
});

export const {} = sopManagement.actions;

export default sopManagement.reducer;
