import { Outlet, Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, DollarSign, Package, Activity } from "lucide-react";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function DashboardPage() {
  const location = useLocation();
  
  const users = useSelector((state) => state.auth.allUsers || []);
  const orders = useSelector((state) => state.cart.orders || []);
  // const reports = useSelector((state) => state.reports.list) || [];

  const { totalRevenue, activeUsers, pendingOrders } = useMemo(() => {
    const deliveredOrders = orders.filter((o) => o.status === "Delivered");
    const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.total, 0);
    const activeUsers = users.filter((u) =>
      orders.some((o) => o.user?.id === u.id)
    ).length;
    const pendingOrders = orders.filter(
      (o) => o.status === "Processing"
    ).length;

    return { totalRevenue, activeUsers, pendingOrders };
  }, [orders, users]);

  const isRootDashboard = location.pathname === "/admin";

  return (
    <div className="p-6 bg-background min-h-screen text-foreground">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Admin nav */}
      <nav className="flex gap-4 mb-6">
        <Link to="orders" className="underline">
          Orders
        </Link>
        <Link to="users" className="underline">
          Users
        </Link>
        <Link to="reports" className="underline">
          Reports
        </Link>
      </nav>
      
      {isRootDashboard ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" /> Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{users.length}</p>
              <p className="text-sm text-muted-foreground">Total registered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" /> Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{activeUsers}</p>
              <p className="text-sm text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" /> Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{orders.length}</p>
              <p className="text-sm text-muted-foreground">Total orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" /> Pending Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{pendingOrders}</p>
              <p className="text-sm text-muted-foreground">
                Awaiting fulfillment
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" /> Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">From all orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" /> Avg. Order Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {orders.length > 0
                  ? `$${(totalRevenue / orders.length).toFixed(2)}`
                  : "$0.00"}
              </p>
              <p className="text-sm text-muted-foreground">
                Average revenue per order
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
