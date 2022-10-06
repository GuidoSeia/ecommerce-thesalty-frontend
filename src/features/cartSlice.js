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
    
    decrementQuantity: (state, action) => {
    const itemInCart = state.cart.find((item) => item._id === action.payload._id);
    if (itemInCart.quantity === 1) {
        const removeItem = state.cart.filter(
            (item) => item._id !== action.payload._id);
            state.cart = removeItem;
        
    } else {
        itemInCart.quantity--;
    }
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