import { configureStore } from '@reduxjs/toolkit'
import productsApi from './productsApi'
import usersAPI from './usersAPI'
import loggedSlice from './loggedSlice'
import cartSlice from './cartSlice'
import codeSlice from './codeSlice'
import couponApi from './couponApi'

export default  configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [usersAPI.reducerPath]: usersAPI.reducer,
        [couponApi.reducerPath]: couponApi.reducer,
        logged: loggedSlice,
        cart: cartSlice,
        code: codeSlice,
    },
    middleware: (getAllCities) => getAllCities({
        immutableCheck: false,
        serializableCheck: false
    })
})