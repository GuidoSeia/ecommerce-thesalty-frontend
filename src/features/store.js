import { configureStore } from '@reduxjs/toolkit'
import productsApi from './productsApi'


export default  configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
    }
})