import { configureStore } from '@reduxjs/toolkit'
import productsApi from './productsApi'
import usersAPI from './usersAPI'
import loggedSlice from './loggedSlice'
import cartSlice from './cartSlice'

export default  configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [usersAPI.reducerPath]: usersAPI.reducer,
        logged: loggedSlice,
        cart: cartSlice
    },
    middleware: (getAllCities) => getAllCities({
        immutableCheck: false,
        serializableCheck: false
    })
})