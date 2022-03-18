import { configureStore } from '@reduxjs/toolkit'
import GridTable from './GridTable';
const store = configureStore({
    reducer: {
        grid: GridTable
    }
});

export default store;