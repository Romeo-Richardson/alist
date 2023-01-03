import { configureStore } from '@reduxjs/toolkit'
import { userSliceReducer } from '../redux/userSlice'
import { postDataSliceReducer } from '../redux/postDataSlice'
import { themeReducer } from '../redux/themeSlice'
import { styleSliceReducer } from '../redux/styleSlice'
import { displayNameSliceReducer } from '../redux/diplayNameSlice'
import(displayNameSliceReducer)

export const store = configureStore({
    reducer: {
        reduceUserSlice: userSliceReducer,
        reducePostData: postDataSliceReducer,
        reduceTheme: themeReducer,
        reduceStyles: styleSliceReducer,
        reduceDisplayName: displayNameSliceReducer
    }
})