import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "../../App";
import store from "../../utils/store";

describe("App Component Integration", () => {
  const MockHome = () => <div data-testid="mock-home">Home Page</div>;
  const MockLogin = () => <div data-testid="mock-login">Login Page</div>;

  const renderWithRouter = (initialRoute = "/") => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<MockHome />} />
              <Route path="/login" element={<MockLogin />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it("renders with nested routes", () => {
    renderWithRouter("/");
    expect(screen.getByTestId("app-root")).toBeInTheDocument();
    expect(screen.getByTestId("mock-home")).toBeInTheDocument();
  });

  it("handles route changes", () => {
    renderWithRouter("/login");
    expect(screen.getByTestId("mock-login")).toBeInTheDocument();
  });

  it("maintains Redux store integration", () => {
    renderWithRouter("/");
    expect(store.getState()).toBeDefined();
  });
});