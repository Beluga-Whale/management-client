import { createAction } from "@reduxjs/toolkit";
import filterReducer, { setPriority } from "../filter/filterSlice";

import "@testing-library/jest-dom";

describe("filterSlice", () => {
  it("should return the initial state", () => {
    const unknownAction = createAction("unknown");

    // NOTE - ส่ง undefined ไปเพื่อให้ reducer ใช้ initialState
    expect(filterReducer(undefined, unknownAction())).toEqual({
      priority: "",
    });
  });

  it("should handle setPriotiry", () => {
    const previousState = { priority: "" };
    const newState = filterReducer(previousState, setPriority("high"));
    expect(newState).toEqual({ priority: "high" });
  });
});
