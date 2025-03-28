import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TaskDto } from "@/types";

type DialogEditState = {
  dialogEdit: boolean;
  task: TaskDto | undefined;
};

// NOTE - initialState
const initialState: DialogEditState = {
  dialogEdit: false,
  task: undefined,
};

// NOTE - payLoad Type
export type DialogEditPayload = {
  dialogEdit: boolean;
  task: TaskDto | undefined;
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setDialogEdit: (state, action: PayloadAction<boolean>) => {
      state.dialogEdit = action.payload;
    },
    setDialogEditTask: (state, action: PayloadAction<TaskDto | undefined>) => {
      state.task = action.payload;
    },
  },
});

export const { setDialogEdit, setDialogEditTask } = dialogSlice.actions;

export const dialogSelect = (state: RootState) => state.dialog;

export default dialogSlice.reducer;
