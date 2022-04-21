import { configureStore } from "@reduxjs/toolkit";
import myScheduleReducer from "./my-schedule";
const store = configureStore({
    reducer: {
        mySchedule: myScheduleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
