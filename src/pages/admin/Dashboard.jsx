import { Outlet, Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="p-6 bg-background min-h-screen text-foreground">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Admin nav */}
      <nav className="flex gap-4 mb-6">
        <Link to="orders" className="underline">Orders</Link>
        <Link to="users" className="underline">Users</Link>
        <Link to="reports" className="underline">Reports</Link>
      </nav>

      {/* Nested route content */}
      <Outlet />
    </div>
  );
}
