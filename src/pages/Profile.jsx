import { logout } from "@/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
// import { markAsDelivered, cancelOrder } from "@/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const allOrders = useSelector((state) => state.cart.orders);

  // Get user's orders from Redux store
  const orders = useMemo(
    () => allOrders.filter((order) => order.user?.id === user?.id),
    [allOrders, user?.id]
  );

  if (!user) {
    return (
      <p className="p-6 text-center bg-background min-h-screen text-destructive">
        Unauthorized. Please login.
      </p>
    );
  }

  return (
    <div className="p-6 bg-background text-foreground min-h-screen flex flex-col items-center gap-6">
      {/* Welcome */}
      <h1 className="text-2xl font-bold">Welcome, {user.name} 👋</h1>

      {/* User Info */}
      <div className="w-full max-w-md border rounded-xl p-4 bg-card shadow">
        <h2 className="text-lg font-semibold mb-2">Profile Info</h2>
        <p>
          <strong>Email:</strong> {user.email || "Not provided"}
        </p>
        <p>
          <strong>Role:</strong> {user.role || "User"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => alert("Change password flow coming soon!")}
          className="px-4 py-2 cursor-pointer rounded-lg bg-primary text-primary-foreground hover:opacity-90"
        >
          Change Password
        </button>
        <button
          onClick={() => dispatch(logout())}
          className="px-4 py-2 cursor-pointer rounded-lg bg-destructive text-destructive-foreground hover:opacity-90"
        >
          Logout
        </button>
      </div>

      {/* Order History */}
      <div className="w-full max-w-3xl border rounded-xl p-4 bg-card shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 mb-4 bg-card shadow flex flex-col md:flex-row justify-between gap-4"
            >
              <div>
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Date:</strong> {order.date}
                </p>
                <p>
                  <strong>Items:</strong>{" "}
                  {order.items.map((i) => i.title).join(", ")}
                </p>
              </div>
              {/* <div className="flex gap-2">
                {order.status === "Processing" && (
                  <>
                    <Button className="cursor-pointer" onClick={() => dispatch(markAsDelivered(order.id))}>
                      Mark as Delivered
                    </Button>
                    <Button className="cursor-pointer" variant="destructive" onClick={() => dispatch(cancelOrder(order.id))}>
                      Cancel Order
                    </Button>
                  </>
                )}
              </div> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
