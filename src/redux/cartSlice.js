import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;

      // Always add a new entry to the cart
      state.items.push({
        id: `${newItem.id}-${Date.now()}`, // Ensure each entry is unique
        name: newItem.name,
        price: newItem.price,
        quantity: 1,
        totalPrice: newItem.price,
        imageUrl: newItem.imageUrl,
      });

      state.totalQuantity++;
      state.totalAmount += newItem.price;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
