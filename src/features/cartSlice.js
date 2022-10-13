import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        orderNumber: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item._id === action.payload._id);
            if (itemInCart && itemInCart.stock > 0) {
                toast.success("Added to cart");
                itemInCart.quantity++;
                itemInCart.stock--;
            } else {
                if(action.payload.stock > 0){
                    state.cart.push({ ...action.payload, stock: action.payload.stock - 1, quantity: 1 });
                    toast.success("Added to cart");
                }
            }
        }
        ,

        decrementQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item._id === action.payload._id);                
            if (itemInCart.quantity === 1) {
                toast.error("Product removed");
                const removeItem = state.cart.filter(
                    (item) => item._id !== action.payload._id);
                state.cart = removeItem;
            } else {
                toast.warning("Removed",{
                });
                itemInCart.quantity--;
            }
        },

        removeCart: (state, action) => {
            state.cart = []
        },

        newOrder: (state, action) => {
            state.orderNumber = action.payload
        }
    },
});

export default cartSlice.reducer

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    removeCart,
    newOrder
} = cartSlice.actions;