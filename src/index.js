import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import NotFound from "./components/NotFound";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
  } from "react-router-dom";

  import Root, { loader as RootLoader } from "./routes/root";
  import Login from "./components/Login";
  import Home from "./components/Home";
  import Register from "./components/Register";
  import Dashboard from "./components/Dashboard";
  import Video from "./components/Video";
import Settings from "./components/Setting";
import "./css/styles.css";

const router = createBrowserRouter([
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Video /> },
            {
              path: "settings",
              element: <Settings />,
            },
          ],
      },
     
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
