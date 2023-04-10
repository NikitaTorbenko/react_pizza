import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTotalPrice } from "../../utils/totalPrice";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findPizza = state.items.find((el) => el.id === action.payload.id);

      if (findPizza) {
        findPizza.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = getTotalPrice(state.items);
    },
    minusItem(state, action) {
      const findPizza = state.items.find((el) => el.id === action.payload);

      if (findPizza && findPizza.count !== 1) {
        findPizza.count--;
      }

      state.totalPrice = getTotalPrice(state.items);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = getTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
