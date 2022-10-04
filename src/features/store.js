import { configureStore } from '@reduxjs/toolkit'
import productsApi from './productsApi'
import usersAPI from './usersAPI'
import loggedSlice from './loggedSlice'


export default  configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [usersAPI.reducerPath]: usersAPI.reducer,
        logged: loggedSlice,
    },
    middleware: (getAllCities) => getAllCities({
        immutableCheck: false,
        serializableCheck: false
    })
})