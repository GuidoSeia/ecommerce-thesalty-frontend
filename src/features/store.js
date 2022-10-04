import { configureStore } from '@reduxjs/toolkit'
import watchesSlice from './watchesSlice'


export const store = configureStore({
    reducer: {
        [watchesSlice.reducerPath]: watchesSlice.reducer,
    }
})