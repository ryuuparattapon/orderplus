import React from 'react'
import ReactDOM from 'react-dom/client'
//import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';
import ErrorPage from './error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="login" />,
    errorElement: <ErrorPage />,
  },
  ,
  {
    path: '/',
    element: <Navigate to="login" />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <ErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
