import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    title: string;
    chartType: string | null;   // ← 여기가 중요!
}

interface UiState {
    mode: "compact" | "full";
    modal: ModalState | null;
}

const initialState: UiState = {
    mode: "compact",
    modal: null,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setMode(state, action) {
            state.mode = action.payload;
        },
        openModal(state, action) {
            state.modal = {
                title: action.payload.title,
                chartType: action.payload.chartType,
            };
        },
        closeModal(state) {
            state.modal = null;
        }
    }
});

export const { setMode, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
