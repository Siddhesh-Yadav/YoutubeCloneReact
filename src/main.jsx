import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import Main from './components/Main.jsx'
import VideoContainer from './components/VideoContainer.jsx'
// import PlayVideo from './components/PlayVideo.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PlayVideo from './components/PlayVideo.jsx'

const mainRouter = createBrowserRouter([
  {
    path:'/',
    element :<App />,
    children:[
     {
      path: "",
      element:<Main />,
      children:[
        {
          path : "",
          element :<VideoContainer />
        },
        {
          path:"watch",
          element : <PlayVideo />
        }
        // {
        //   path:"watch",
        //   element : lazy(()=>import('./components/PlayVideo.jsx'))
        // }
      ]
     }
    ]
    
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={mainRouter}/>
  </React.StrictMode>,
)
