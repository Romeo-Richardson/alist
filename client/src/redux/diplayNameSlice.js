import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayName: 'A - L I S T'
}

export const displayNameSlice = createSlice({
    name: 'displayName',
    initialState,
    reducers: {
        setDisplayName: (state, actions) => { state.displayName = actions.payload }
    }
})

export const { setDisplayName } = displayNameSlice.actions

export const displayNameSliceReducer = displayNameSlice.reducer