import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface StateParams {
    taskId: string[];
}

const initialState: StateParams = {
    taskId: [],
};

const sopManagement = createSlice({
    name: "sopManagement",
    initialState: initialState,
    reducers: {
        setTaskId: (state: StateParams, action: PayloadAction<string[]>) => {
            state.taskId = action.payload;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(, ()=>{
        // })
    },
});

export const { setTaskId } = sopManagement.actions;

export default sopManagement.reducer;
