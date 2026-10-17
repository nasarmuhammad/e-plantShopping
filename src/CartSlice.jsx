import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const getItemKey = (item) => {
  if (typeof item === 'string') {
    return item;
  }
  return item.id ?? item.name;
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const productKey = getItemKey(product);

      const existingItem = state.items.find(
        item => getItemKey(item) === productKey
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const productKey = getItemKey(action.payload);

      state.items = state.items.filter(
        item => getItemKey(item) !== productKey
      );
    },

    updateQuantity: (state, action) => {
      const { quantity } = action.payload;
      const productKey = getItemKey(action.payload);

      const existingItem = state.items.find(
        item => getItemKey(item) === productKey
      );

      if (!existingItem || !Number.isInteger(quantity)) {
        return;
      }

      if (quantity <= 0) {
        state.items = state.items.filter(
          item => getItemKey(item) !== productKey
        );
      } else {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
} = CartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => {
    const price = Number(
      String(item.cost).replace(/[^0-9.]/g, '')
    );

    return total + price * item.quantity;
  }, 0);

export default CartSlice.reducer;
