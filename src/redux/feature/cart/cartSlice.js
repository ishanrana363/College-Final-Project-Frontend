import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
}

const calculateAddToCart = (product)=>{
    const selectItems = product.reduce((acc, item)=> acc + item.quantity,0 );
    const totalPrice = product.reduce((acc, item)=> acc + item.price * item.quantity, 0);
    return  { selectItems,  totalPrice}
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart : (state,action)=>{
            const isExists = state.products.find(product =>product._id === action.payload._id);
            console.log(isExists);
            if(!isExists){
                state.products.push({...action.payload,quantity : 1});
                Swal.fire({
                    title: 'Product added to cart',
                    text: 'Product added to cart.',
                    icon:'success',
                    confirmButtonText: "OK",
                })
            }else{
                Swal.fire({
                    title: 'Product already in cart',
                    text: 'Product already in cart.',
                    icon:'warning',
                    confirmButtonText: "OK",
                })
            }
            const total = calculateAddToCart(state.products);
            state.selectedItems = total.selectItems;
            state.totalPrice = total.totalPrice;
        }
    }
    
});


export const {addToCart} = cartSlice.actions

export default cartSlice.reducer;