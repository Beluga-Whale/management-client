import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import filterSlice from "@/app/lib/feature/filter/filterSlice";
import FilterPriority from "../FilterPriority";
import userEvent from "@testing-library/user-event";

describe("FilterPriority", () => {
  const renderWithStore = (initialState = { filter: { priority: "" } }) => {
    const store = configureStore({
      reducer: { filter: filterSlice },
      preloadedState: initialState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    });

    return {
      store,
      ...render(
        <Provider store={store}>
          <FilterPriority />
        </Provider>
      ),
    };
  };

  it("should render FilterPriority", () => {
    renderWithStore();

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("should highlisght the select priority", () => {
    renderWithStore({ filter: { priority: "medium" } });

    const mediumBtn = screen.getByText("Medium");
    expect(mediumBtn).toHaveClass("text-violet-500");
  });

  it("should dispatch setPriority when a button is clicked", async () => {
    const { store } = renderWithStore();

    const highBtn = screen.getByText("High");
    await userEvent.click(highBtn);

    await waitFor(() => {
      const actions = store.getState().filter.priority;
      expect(actions).toBe("high");
    });
  });
});
