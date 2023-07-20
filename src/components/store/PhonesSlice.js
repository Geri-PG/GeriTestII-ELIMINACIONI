import { createSlice } from "@reduxjs/toolkit";

const PhonesSlice = createSlice({
  name: "phones",
  initialState: {
    items: [],
    count: 0,
    isLoading: false,
  },
  reducers: {
    setPhones: (state, action) => {
      state.items = action.payload;
      state.count = 9;
      state.isLoading = false;
    },
    updateCount: (state, action) => {
      state.count += action.payload;
    },
    addPhone: (state, action) => {
      state.items.push(action.payload);
    },
    updatePhone: (state, action) => {
      const updatedProduct = action.payload;
      const productIndex = state.items.findIndex(
        (phone) => phone.id === updatedProduct.id
      );
      if (productIndex !== -1) {
        state.items[productIndex].title = updatedProduct.title;
        state.items[productIndex].description = updatedProduct.description;
        state.items[productIndex].brand = updatedProduct.brand;
      }
    },
    deletePhone: (state, action) => {
      const idToDelete = action.payload;
      state.items = state.items.filter((phone) => phone.id !== idToDelete);
    },
  },
});

export const { setPhones, updateCount, addPhone, updatePhone, deletePhone } =
  PhonesSlice.actions;
export default PhonesSlice.reducer;
