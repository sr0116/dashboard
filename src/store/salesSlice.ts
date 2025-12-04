import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SalesState {
    data: any[];
    loading: boolean;
    error: string | null;
}

const initialState: SalesState = {
    data: [],
    loading: false,
    error: null,
};

const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setSalesData(state, action: PayloadAction<any[]>) {
            state.data = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setLoading, setSalesData, setError } = salesSlice.actions;
export default salesSlice.reducer;
