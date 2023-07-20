import { configureStore } from "@reduxjs/toolkit";
import phonesReducer from "./PhonesSlice";

const Store = configureStore({
  reducer: {
    phones: phonesReducer,
  },
});

export default Store;
