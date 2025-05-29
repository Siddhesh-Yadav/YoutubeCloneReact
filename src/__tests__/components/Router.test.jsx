import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { mainRouter } from "../../main";
import { Provider } from "react-redux";
import store from "../../utils/store";

describe("Router Configuration", () => {
  const renderWithRouter = (initialRoute = "/") => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Provider store={store}>
          <div data-testid="router-test">Router Content</div>
        </Provider>
      </MemoryRouter>
    );
  };

  it("renders router without crashing", () => {
   const { getByTestId } = renderWithRouter();
    expect(getByTestId("router-test")).toBeInTheDocument();
  });

  it("has correct route configuration", () => {
   const rootRoute = mainRouter.routes[0];
    expect(rootRoute.path).toBe("/");
    expect(rootRoute.children).toBeDefined();
    expect(rootRoute.children.length).toBe(4);
  });

  it("has correct nested routes under /main", () => {
    const mainRoute = mainRouter.routes[0].children.find(
      route => route.path === "/main"
    );
    expect(mainRoute).toBeDefined();
    expect(mainRoute.children).toBeDefined();
    expect(mainRoute.children.length).toBe(5);
  });
});
