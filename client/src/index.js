import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './views/Login/Login';
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Signup from './views/Signup/Signup';
import App from './views/App/app';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path : '/',
        element : <App/>
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path : '/signup',
        element : <Signup/>
    }
])
root.render(<RouterProvider router={router}/>)