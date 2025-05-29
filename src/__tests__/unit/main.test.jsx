import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { mainRouter } from "../../main.jsx";

// Import the actual Navigate before mocking
const { Navigate: ActualNavigate } = jest.requireActual("react-router-dom");

// Mock all child components
jest.mock("../../App", () => () => <div data-testid="mock-app">App</div>);
jest.mock("../../components/Main", () => () => (
  <div data-testid="mock-main">Main</div>
));
jest.mock("../../components/VideoContainer", () => () => (
  <div data-testid="mock-video-container">VideoContainer</div>
));
jest.mock("../../components/PlayVideo", () => () => (
  <div data-testid="mock-play-video">PlayVideo</div>
));
jest.mock("../../components/Login", () => () => (
  <div data-testid="mock-login">Login</div>
));
jest.mock("../../components/Signup", () => () => (
  <div data-testid="mock-signup">Signup</div>
));
jest.mock("../../components/History", () => () => (
  <div data-testid="mock-history">History</div>
));
jest.mock("../../components/Friends", () => () => (
  <div data-testid="mock-friends">Friends</div>
));
jest.mock("../../components/FavoriteVideos", () => () => (
  <div data-testid="mock-favorite-videos">FavoriteVideos</div>
));

// Mock ReactDOM
jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

describe("Main Router Configuration", () => {
  it("should have correct base routes configured", () => {
    const routes = mainRouter.routes[0];
    expect(routes.path).toBe("/");
    expect(routes.children).toHaveLength(4); // /, /login, /signup, /main
  });

  it("should have correct nested routes under /main", () => {
    const mainRoutes = mainRouter.routes[0].children.find(
      (route) => route.path === "/main"
    );
    expect(mainRoutes.children).toHaveLength(5); // "", watch, history, friends, liked-videos
  });

  it("should redirect root path to login", () => {
    const rootRoute = mainRouter.routes[0].children.find(
      (route) => route.path === "/"
    );
    const { Navigate } = jest.requireActual("react-router-dom");
    
    // Compare using instanceof or check the display name
    expect(rootRoute.element.type.name).toBe("Navigate");
    expect(rootRoute.element.props.to).toBe("/login");
  });
});

describe("Router Provider Rendering", () => {
  it("should render router provider without crashing", () => {
    render(<RouterProvider router={mainRouter} />);
    expect(document.body).toBeInTheDocument();
  });

  it("should render in strict mode", () => {
    const { container } = render(
      <React.StrictMode>
        <RouterProvider router={mainRouter} />
      </React.StrictMode>
    );
    expect(container).toBeInTheDocument();
  });
});

describe("Route Components", () => {
  it("should have all required routes defined", () => {
    const routes = mainRouter.routes[0].children;
    const paths = routes.map((route) => route.path);

    expect(paths).toContain("/");
    expect(paths).toContain("/login");
    expect(paths).toContain("/signup");
    expect(paths).toContain("/main");
  });

  it("should have correct subroutes under /main", () => {
    const mainRoutes = mainRouter.routes[0].children.find(
      (route) => route.path === "/main"
    ).children;
    const subPaths = mainRoutes.map((route) => route.path);

    expect(subPaths).toContain("");
    expect(subPaths).toContain("watch");
    expect(subPaths).toContain("history");
    expect(subPaths).toContain("friends");
    expect(subPaths).toContain("liked-videos");
  });
});
