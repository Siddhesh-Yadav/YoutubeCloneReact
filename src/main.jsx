import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import Main from "./components/Main.jsx";
import VideoContainer from "./components/VideoContainer.jsx";
import PlayVideo from "./components/PlayVideo.jsx";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import History from "./components/History.jsx";
import Friends from "./components/Friends.jsx";
import FavoriteVideos from "./components/FavoriteVideos.jsx";

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" />, // Redirect "/" to "/login" by default
      },
      {
        path: "/login",
        element: <Login />,
        index: true,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/main",
        element: <Main />,
        children: [
          {
            path: "",
            element: <VideoContainer />,
          },
          {
            path: "watch",
            // element: lazy(() => import("./components/PlayVideo.jsx")),
            element: <PlayVideo />,
          },
          {
            path: "history",
            element: <History />,
          },
          {
            path: "friends",
            element: <Friends />,
          },
          {
            path: "liked-videos",
            element: <FavoriteVideos />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={mainRouter} />
  </React.StrictMode>
);
