import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useMemo } from "react";

export default function ReportsPage() {
  const orders = useSelector((state) => state.cart.orders || []);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;
    const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;
    const pendingOrders = orders.filter((o) => o.status === "Processing").length;

    const totalRevenue = orders
      .filter((o) => o.status === "Delivered")
      .reduce((sum, o) => sum + o.total, 0);

    const avgOrderValue = deliveredOrders > 0 ? totalRevenue / deliveredOrders : 0;

    // Percentages
    const deliveredPct = totalOrders ? (deliveredOrders / totalOrders) * 100 : 0;
    const cancelledPct = totalOrders ? (cancelledOrders / totalOrders) * 100 : 0;
    const pendingPct = totalOrders ? (pendingOrders / totalOrders) * 100 : 0;

    return {
      totalOrders,
      deliveredOrders,
      cancelledOrders,
      pendingOrders,
      totalRevenue,
      avgOrderValue,
      deliveredPct,
      cancelledPct,
      pendingPct,
    };
  }, [orders]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📊 Reports & Analytics</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats.totalOrders}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivered Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-2xl font-semibold">
            {stats.deliveredOrders}
            <Badge variant="success">+{stats.deliveredPct.toFixed(0)}%</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cancelled Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-2xl font-semibold">
            {stats.cancelledOrders}
            <Badge variant="destructive">{stats.cancelledPct.toFixed(0)}%</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-2xl font-semibold">
            {stats.pendingOrders}
            <Badge>{stats.pendingPct.toFixed(0)}%</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Section */}
      <Card>
        <CardHeader>
          <CardTitle>💰 Revenue Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-2">
            ${stats.totalRevenue.toFixed(2)}
          </p>
          <p className="text-muted-foreground mb-4">
            Average Order Value: ${stats.avgOrderValue.toFixed(2)}
          </p>

          {/* Progress bar breakdown */}
          <div className="space-y-2">
            <div>
              <p className="text-sm">Delivered Revenue</p>
              <Progress value={stats.deliveredPct} />
            </div>
            <div>
              <p className="text-sm">Cancelled Orders</p>
              <Progress value={stats.cancelledPct} />
            </div>
            <div>
              <p className="text-sm">Pending Orders</p>
              <Progress value={stats.pendingPct} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
