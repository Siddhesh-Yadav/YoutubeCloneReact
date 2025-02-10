import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import Main from "./components/Main.jsx";
import VideoContainer from "./components/VideoContainer.jsx";
import PlayVideo from "./components/PlayVideo.jsx"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "",
//         element: <Main />,
//         children: [
//           {
//             path: "",
//             element: <VideoContainer />,
//           },
//           {
//             path: "watch",
//             element: lazy(() => import("./components/PlayVideo.jsx")),
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//     // index: true
//   },
// ]);
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
        index: true
      },
      {
        path:'/signup',
        element:<Signup />
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
            element : <PlayVideo />
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
