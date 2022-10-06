import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
name: 'cart',
initialState: {
    cart: [],
},
reducers: {
    addToCart: (state, action) => {
        const itemInCart = state.cart.find((item) => item._id === action.payload._id);
        if (itemInCart && itemInCart.stock != 0) {
            itemInCart.quantity++;
            itemInCart.stock--;
        } else {
            state.cart.push({ ...action.payload, stock:action.payload.stock-1  ,quantity: 1 });
        }
    }
    ,
    incrementQuantity: (state, action) => {
    const item = state.cart.find((item) => item.id === action.payload);
    item.quantity++;
    },
    decrementQuantity: (state, action) => {
    const item = state.cart.find((item) => item.id === action.payload);
    if (item.quantity === 1) {
        item.quantity = 1
    } else {
        item.quantity--;
    }
    },
    removeItem: (state, action) => {
    const removeItem = state.cart.filter((item) => item.id !== action.payload);
    state.cart = removeItem;
    },
},
});

export default cartSlice.reducer

export const {
addToCart,
incrementQuantity,
decrementQuantity,
removeItem,
} = cartSlice.actions;