import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postData: false
}

export const postDataSlice = createSlice({
    name: 'postDataSlice',
    initialState,
    reducers: {
        setPostData: (state, actions) => { state.postData = actions.payload }
    }
})

export const postDataSliceReducer = postDataSlice.reducer

export const setPostData = postDataSlice.actions