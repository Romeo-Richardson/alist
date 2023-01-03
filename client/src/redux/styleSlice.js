import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    styles: {
        textColor: 'white',
        primaryColor: 'hsl(235, 24%, 19%)',
        secondaryColor: 'hsl(235, 21%, 11%)'
    }
}

export const styleSlice = createSlice({
    name: 'styleSlice',
    initialState,
    reducers: {
        setStyles: (state, actions) => { state.styles = actions.payload }
    }
})

export const { setStyles } = styleSlice.actions

export const styleSliceReducer = styleSlice.reducer

