import { useSelector, useDispatch } from "react-redux";
import { markAsDelivered, cancelOrder } from "@/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.cart.orders);
  const users = useSelector((state) => state.auth.allUsers || []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders Management</h1>

      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        orders.map((order) => {
          const user = users.find((u) => u.id === order.userId);

          return (
            <Card key={order.id} className="shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Order #{order.id}</span>
                  <Badge
                    variant={
                      order.status === "Delivered"
                        ? "default"
                        : order.status === "Cancelled"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <p>
                  <strong>User:</strong> {user?.username || "Unknown"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "N/A"}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </p>
                <p>
                  <strong>Date:</strong> {order.date}
                </p>
                <p>
                  <strong>Items:</strong>{" "}
                  {order.items.map((i) => i.title).join(", ")}
                </p>
              </CardContent>

              {order.status === "Processing" && (
                <CardFooter className="flex gap-2">
                  <Button
                    className="cursor-pointer"
                    onClick={() => dispatch(markAsDelivered(order.id))}
                  >
                    Mark as Delivered
                  </Button>
                  <Button
                    className="cursor-pointer"
                    variant="destructive"
                    onClick={() => dispatch(cancelOrder(order.id))}
                  >
                    Cancel Order
                  </Button>
                </CardFooter>
              )}
            </Card>
          );
        })
      )}
    </div>
  );
}
