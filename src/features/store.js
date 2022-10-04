import { configureStore } from '@reduxjs/toolkit'
import watchesSlice from './watchesSlice'


export default  configureStore({
    reducer: {
        [watchesSlice.reducerPath]: watchesSlice.reducer,
    }
})