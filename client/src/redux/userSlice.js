import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: false
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserData: (state, actions) => { state.userData = actions.payload }
    }
})

export const userSliceReducer = userSlice.reducer

export const { setUserData } = userSlice.actions