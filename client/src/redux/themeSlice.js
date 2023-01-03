import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'Dark'
}

export const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setTheme: (state, actions) => { state.theme = actions.payload }
    }
})

export const { setTheme } = themeSlice.actions

export const themeReducer = themeSlice.reducer