import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
interface StateParams {
    isEditOpen: boolean;
    isManageOpen: boolean;
    isDataViewOpen: boolean;
    editScheduleName: string | undefined;
    editData: any;
}

const initialState: StateParams = {
    isEditOpen: false,
    isManageOpen: false,
    isDataViewOpen: false,
    editScheduleName: undefined,
    editData: null,
};

const mySchedule = createSlice({
    name: "mySchedule",
    initialState: initialState,
    reducers: {
        scheduleChange: (state: StateParams, action: PayloadAction<string>) => {
            state.editScheduleName = action.payload;
        },
        setEditData: (state: StateParams, action: PayloadAction<any>) => {
            // state.editData = action.payload;
        },
        editOpen: (state: StateParams) => {
            state.isEditOpen = true;
            state.isManageOpen = false;
            state.isDataViewOpen = false;
        },
        manageOpen: (state: StateParams) => {
            state.isManageOpen = true;
            state.isEditOpen = false;
            state.isDataViewOpen = false;
        },
        dataViewOpen: (state: StateParams) => {
            state.isDataViewOpen = true;
            state.isEditOpen = false;
            state.isManageOpen = false;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(, ()=>{
        // })
    },
});

export const {
    scheduleChange,
    setEditData,
    editOpen,
    manageOpen,
    dataViewOpen,
} = mySchedule.actions;

export default mySchedule.reducer;
