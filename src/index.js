import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BlogPage from './Components/BlogPage';
import BodyContent from './Components/BodyContent';
import ReactGA from "react-ga4";



ReactGA.initialize("G-FE413KBQDW");

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<BodyContent/>
      },
      {
        path:'/blogpage',
        element:<BlogPage/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />)

reportWebVitals();
