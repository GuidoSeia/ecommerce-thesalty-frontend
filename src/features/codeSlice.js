import { createSlice } from "@reduxjs/toolkit";

export const codeSlice = createSlice({
    name: "code",
    initialState: {
        codeState: false,
    },
    reducers: {
        codeTrue: (state) => {
            state.codeState = true;
        }
    }
})

export const { codeTrue } = codeSlice.actions

export default codeSlice.reducer