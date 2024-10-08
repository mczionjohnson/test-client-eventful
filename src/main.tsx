import React from "react";
import ReactDOM from "react-dom/client";


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


import Home from "./pages/Home";
import { ErrorPage } from "./ErrorPage";

import Register from "./pages/Register";
import Login from "./pages/Login";

import Event from "./pages/Event";
import CreateEvent from "./pages/CreateEvent";
import SingleEvent from "./pages/SingleEvent";

import Ticketing from "./pages/Ticketing";
import UserTickets from "./pages/UserTickets";
import SingleTicket from "./pages/SingleTicket";

import UserProfile from "./pages/UserProfile";
import UserEventAttended from "./pages/UserEventAttended";

import CreatorMode from "./pages/CreatorMode";
import CreatorModeView from "./pages/CreatorModeView";
import CreatorModeViewMore from "./pages/CreatorModeViewMore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/events",
    element: <Event />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/one_event",
    element: <SingleEvent />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create",
    element: <CreateEvent />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/attend",
    element: <Ticketing />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/user_tickets",
    element: <UserTickets />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user_ticket",
    element: <SingleTicket />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/event_attended",
    element: <UserEventAttended />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/event_created/",
    element: <CreatorMode />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/view_event_created",
    element: <CreatorModeView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/view_option",
    element: <CreatorModeViewMore />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
