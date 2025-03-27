import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type FilterState = {
  priority: string;
};

const initialState: FilterState = {
  priority: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPriority: (state, action: PayloadAction<string>) => {
      state.priority = action.payload;
    },
  },
});

export const { setPriority } = filterSlice.actions;

export const filterSelect = (state: RootState) => state.filter;

export default filterSlice.reducer;
