import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    increment: (state, action: PayloadAction<number>) => {
      const product = state.items.find(item => item.id === action.payload);
      if (product) product.quantity += 1;
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    decrement: (state, action: PayloadAction<number>) => {
      const product = state.items.find(item => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, increment, decrement, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
