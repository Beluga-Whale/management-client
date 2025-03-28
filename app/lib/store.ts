import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./feature/filter/filterSlice";
import dialogSlice from "./feature/dialog/dialogSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      filter: filterSlice,
      dialog: dialogSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
