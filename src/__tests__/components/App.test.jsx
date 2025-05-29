import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";
import store from "../../utils/store";

describe("App Component Tests", () => {
  const renderApp = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  };

  it("renders App with Redux Provider", () => {
    renderApp();
    expect(store.getState()).toBeDefined();
  });

  it("renders Outlet component", () => {
    const { container } = renderApp();
    const appDiv = container.querySelector('[data-testid="app-root"]');
    expect(appDiv).toBeInTheDocument();
  });

  it("renders with Redux store context", () => {
    const { container } = renderApp();
    expect(container).toBeInTheDocument();
    expect(container.firstChild).not.toBeNull();
  });
});