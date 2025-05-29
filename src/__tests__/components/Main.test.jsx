import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { mainRouter } from "../../main";
import store from "../../utils/store";

// Mock all required browser APIs
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

global.Request = jest.fn((url, init) => ({
  url,
  ...init,
}));

// Mock YouTube script loading
jest.mock("../../components/PlayVideo", () => {
  return function MockPlayVideo() {
    return <div data-testid="video-player">Mock Video Player</div>;
  };
});

// Mock other components
jest.mock("../../components/VideoContainer", () => {
  return function MockVideoContainer() {
    const mockVideos = [
      { id: "1", title: "Video 1" },
      { id: "2", title: "Video 2" },
    ];

    return (
      <div data-testid="video-container">
        <div data-testid="button-list" />
        <div className="video-list">
          {mockVideos.map((video, index) => (
            <div key={video.id} data-testid={`video-item-${index}`}>
              {video.title}
            </div>
          ))}
        </div>
      </div>
    );
  };
});

// Add SideBar mock
jest.mock("../../components/SideBar", () => {
  return function MockSideBar() {
    const menuItems = [
      { id: 1, title: "Home", path: "/" },
      { id: 2, title: "History", path: "/history" }
    ];

    return (
      <div data-testid="sidebar">
        <ul className="pb-3">
          {menuItems.map((item) => (
            <li key={item.id} data-testid={`menu-item-${item.id}`}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    );
  };
});

jest.mock("../../components/Login", () => {
  return function MockLogin() {
    return <div data-testid="login-page">Mock Login</div>;
  };
});

describe("Main Router Integration", () => {
  const renderWithRouter = async (initialRoute = "/") => {
    const router = createMemoryRouter(mainRouter.routes, {
      initialEntries: [initialRoute],
    });

    let utils;
    await act(async () => {
      utils = render(
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      );
    });

    return { ...utils, router };
  };

  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch.mockClear();
    // Reset window location
    window.history.pushState({}, '', '/');
  });

  it("redirects to login from root path", async () => {
    const { router } = await renderWithRouter("/");
    
    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/login");
    });
  });

  it("renders login page directly", async () => {
    await renderWithRouter("/login");
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("renders main page with video container", async () => {
    await renderWithRouter("/main");
    expect(screen.getByTestId("video-container")).toBeInTheDocument();
  });

  it("renders nested routes in main", async () => {
    await renderWithRouter("/main/watch");
    expect(screen.getByTestId("video-player")).toBeInTheDocument();
  });

  it("renders video list with proper keys", async () => {
    await renderWithRouter("/main");
    expect(screen.getByTestId("video-item-0")).toBeInTheDocument();
    expect(screen.getByTestId("video-item-1")).toBeInTheDocument();
  });
});