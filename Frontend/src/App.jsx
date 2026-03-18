import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./admin/Dashboard";
import AdminNavbar from "./Components/Navbar";
import ShowAllEvents from "./pages/ShowAllEvents";
import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import Register from "./pages/Register";
import EventDetails from "./pages/EventDetails";
import TicketSelection from "./pages/TicketSelection";
import PaymentPage from "./pages/PaymentPage";
import BookingSuccess from "./pages/BookingSuccess";


function AdminLayout() {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  );
}

function UserLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path:"/", element: <UserDashboard /> },
      { path: "login", element: <UserLogin /> },
      { path: "register", element: <Register /> },
      { path: "event/:id", element: <EventDetails /> },
      { path: "event/:id/tickets", element: <TicketSelection/>},
      { path: "payment", element: <PaymentPage/>},
      { path: "booking-success", element: <BookingSuccess/>},
     
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "all_events", element: <ShowAllEvents /> }
    ]
  },
  {
    path: "/admin_login",
    element: <AdminLogin />
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}