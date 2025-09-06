import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  orders: [] // store completed orders
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i.id !== action.payload);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },

    // Checkout: moves items from cart to orders
    checkout: (state, action) => {
      const user = action.payload; // pass full user object from component
      if (!user) return;

      const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const newOrder = {
        id: Date.now(),
        items: state.items,
        total,
        status: "Processing",
        date: new Date().toLocaleString(),
        user: { ...user }, // store full user object including id
      };

      state.orders.push(newOrder);
      state.items = [];
    },


    markAsDelivered: (state, action) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) order.status = "Delivered";
    },

    cancelOrder: (state, action) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) order.status = "Cancelled";
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  checkout,
  markAsDelivered,
  cancelOrder
} = cartSlice.actions;

export default cartSlice.reducer;
