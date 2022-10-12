import { configureStore } from '@reduxjs/toolkit'
import productsApi from './productsApi'
import usersAPI from './usersAPI'
import loggedSlice from './loggedSlice'
import cartSlice from './cartSlice'
import codeSlice from './codeSlice'
import couponApi from './couponApi'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import refreshSlice from './refreshSlice'

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const rootReducer = combineReducers({
    cart: cartSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default  configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [usersAPI.reducerPath]: usersAPI.reducer,
        [couponApi.reducerPath]: couponApi.reducer,
        logged: loggedSlice,
        refresh: refreshSlice,
        code: codeSlice,
        cart: persistedReducer
    },
    middleware: (getAllCities) => getAllCities({
        immutableCheck: false,
        serializableCheck: false
    })
})