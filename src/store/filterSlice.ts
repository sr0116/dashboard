import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
    region: string | null;
    category: string | null;
    year: number | null;
}

const initialState: FilterState = {
    region: null,
    category: null,
    year: null,
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setRegion(state, action: PayloadAction<string | null>) {
            state.region = action.payload;
        },
        setCategory(state, action: PayloadAction<string | null>) {
            state.category = action.payload;
        },
        setYear(state, action: PayloadAction<number | null>) {
            state.year = action.payload;
        }
    },
});

export const { setRegion, setCategory, setYear } = filterSlice.actions;
export default filterSlice.reducer;
