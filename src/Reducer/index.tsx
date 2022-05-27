import { configureStore } from "@reduxjs/toolkit";
import myScheduleReducer from "./my-schedule";
import SopReducer from "./sop-management";
const store = configureStore({
    reducer: {
        mySchedule: myScheduleReducer,
        sopManagement: SopReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
