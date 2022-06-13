import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface StateParams {
    sequence: {
        [key: string]: string[]
    };
}

interface SequenceParams {
    key: string
    value: string[]
}


const initialState: StateParams = {
    sequence: {},
};


const sopManagement = createSlice({
    name: "sopManagement",
    initialState: initialState,
    reducers: {
        setSequence: (state: StateParams, action: PayloadAction<SequenceParams>) => {            
            const {key, value} = action.payload;
            state.sequence[key] = value;
        }
        // setTaskId: (state: StateParams, action: PayloadAction<string[]>) => {
        //     state.taskId = action.payload;
        // },
    },
    extraReducers: (builder) => {
        // builder.addCase(, ()=>{
        // })
    },
});

export const {setSequence} = sopManagement.actions;

export default sopManagement.reducer;
