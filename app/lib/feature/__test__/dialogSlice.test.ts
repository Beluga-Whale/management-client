import { createAction } from "@reduxjs/toolkit";
import dialogReduce, {
  setDialogEdit,
  setDialogEditTask,
} from "../dialog/dialogSlice";
import "@testing-library/jest-dom";
import dayjs from "dayjs";

describe("dialogSlice", () => {
  it("should return the initial state", () => {
    // NOTE - สร้าง action ปลอมๆที่ไม่มีอยู่ใน reducer เพื่อให้มันไม่รู้จัก
    const unkownAction = createAction("unknown");
    // NOTE - ส่ง undefined ไปเพื่อให้ reducer ใช้ initialState

    expect(dialogReduce(undefined, unkownAction())).toEqual({
      dialogEdit: false,
      task: undefined,
    });
  });

  it("should handler setDialogEdit", () => {
    const previousState = {
      dialogEdit: false,
      task: undefined,
    };
    const newState = dialogReduce(previousState, setDialogEdit(true));
    expect(newState).toEqual({
      dialogEdit: true,
      task: undefined,
    });
  });
  it("should handler setDialogEditTask", () => {
    const previousState = {
      dialogEdit: false,
      task: undefined,
    };
    const newState = dialogReduce(
      previousState,
      setDialogEditTask({
        ID: 1,
        CreatedAt: dayjs(new Date("2018-04-04T16:00:00.000Z")),
        UpdatedAt: dayjs(new Date("2018-04-04T16:00:00.000Z")),
        DeletedAt: dayjs(new Date("2018-04-04T16:00:00.000Z")),
        DueDate: dayjs(new Date("2018-04-04T16:00:00.000Z")),
        Title: "TitleMock",
        Description: "DescriptionMock",
        Status: "active",
        Completed: true,
        Priority: "low",
      })
    );
    expect(newState).toEqual({
      dialogEdit: false,
      task: {
        ID: 1,
        CreatedAt: dayjs(new Date("2018-04-04T16:00:00.000Z")),
        UpdatedAt: dayjs(new Date("2018-04-04T16:00:00.000Z")),
        DeletedAt: dayjs(new Date("2018-04-04T16:00:00.000Z")),
        DueDate: dayjs(new Date("2018-04-04T16:00:00.000Z")),
        Title: "TitleMock",
        Description: "DescriptionMock",
        Status: "active",
        Completed: true,
        Priority: "low",
      },
    });
  });
});
