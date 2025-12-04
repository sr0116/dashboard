// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";

import salesReducer from "./salesSlice";
import filterReducer from "./filterSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
    reducer: {
        sales: salesReducer,
        filters: filterReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
