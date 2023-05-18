import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Videos from './pages/Videos';
import Search from './pages/Search';
import Watch from './pages/Watch';
import ErrorBoundary from './pages/ErrorBoundary';
import Channel from './pages/Channel';
import ChannelSection from './pages/ChannelSection';
import ChannelInfo from './pages/ChannelInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    // loader: rootLoader,
    children: [
      { index: true, element: <Videos /> },
      {
        path: '/channel/:channelId',
        element: <Channel />,
        children: [
          { index: true, element: <ChannelSection /> },
          { path: '/channel/:channelId/videos', element: <Videos /> },
          { path: '/channel/:channelId/info', element: <ChannelInfo /> },
        ],
      },
      { path: '/videos/', element: <Videos /> },
      { path: '/videos/:videoCategoryId', element: <Videos /> },
      { path: '/search/:keyword', element: <Search /> },
      { path: '/watch/:videoId', element: <Watch /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
