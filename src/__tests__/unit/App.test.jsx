import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import App from "../../App";
import store from "../../utils/store";
import { Provider } from "react-redux";

describe("App Unit Tests", () => {
  const renderAppInIsolation = () => {
    // Mock component to render in the Outlet
    const MockComponent = () => <div data-testid="mock-content">Mock Content</div>;
    
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<MockComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it("should render with root element", () => {
    const { getByTestId } = renderAppInIsolation();
    expect(getByTestId("app-root")).toBeInTheDocument();
  });

  it("should have correct DOM structure", () => {
    const { getByTestId } = renderAppInIsolation();
    const rootElement = getByTestId("app-root");
    const mockContent = getByTestId("mock-content");
    
    expect(rootElement.children).toHaveLength(1);
    expect(rootElement).toContainElement(mockContent);
  });

  it("should be wrapped in Redux Provider", () => {
    const { container } = renderAppInIsolation();
    expect(store.getState()).toBeDefined();
    expect(container.firstChild).toBeTruthy();
  });
});