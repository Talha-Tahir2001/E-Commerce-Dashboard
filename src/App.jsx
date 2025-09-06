import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import CartPage from "./pages/Cart";
import ProfilePage from "./pages/Profile";
import DashboardPage from "./pages/admin/Dashboard";
import UsersPage from "./pages/admin/Users";
import OrdersPage from "./pages/admin/Orders";
import ReportsPage from "./pages/admin/Reports";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
import LoginPage from "./pages/Login";
import { useSelector } from "react-redux";

function PrivateRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/unauthorized" />;

  return children;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />

            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />

            <Route
              path="/unauthorized"
              element={
                <div className="p-6 text-center bg-background min-h-screen text-destructive">
                  <h1 className="text-2xl font-bold mb-4">
                    Unauthorized Access
                  </h1>
                  <p>You do not have permission to view this page.</p>
                </div>
              }
            />

            <Route
              path="/admin"
              element={
                <PrivateRoute adminOnly={true}>
                  <DashboardPage />
                </PrivateRoute>
              }
            >
              <Route path="orders" element={<OrdersPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="reports" element={<ReportsPage />} />
            </Route>
          </Routes>
          <Toaster position="bottom-right" />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
