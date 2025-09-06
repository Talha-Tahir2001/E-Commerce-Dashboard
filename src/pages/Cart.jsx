import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  checkout,
} from "@/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function CartPage() {
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  
  const dispatch = useDispatch();
  const [clearOpen, setClearOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <p className="p-6 text-center bg-background text-foreground min-h-screen">
        Your cart is empty 🛒
      </p>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 bg-background text-foreground min-h-screen">
      <h1 className="text-xl font-semibold mb-4">Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-card rounded-lg p-4 shadow gap-4"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="min-w-0">
                <h2 className="font-medium text-sm line-clamp-1">
                  {item.title}
                </h2>
                <p className="text-sm text-foreground">${item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                <Minus />
              </Button>
              <span className="px-2">{item.quantity}</span>
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                <Plus />
              </Button>
            </div>

            <Button
              className="cursor-pointer shrink-0"
              variant="destructive"
              size="sm"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* Cart Total + Actions */}
      <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
        <p className="font-semibold text-lg">Total: ${total.toFixed(2)}</p>

        {/* Clear Cart */}
        <AlertDialog open={clearOpen} onOpenChange={setClearOpen}>
          <AlertDialogTrigger asChild>
            <Button className="cursor-pointer" variant="destructive">
              Clear Cart
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear Cart</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove all items from your cart?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={() => dispatch(clearCart())}
            >
              Yes, Clear
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>

        {/* Checkout */}
        <AlertDialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Checkout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to purchase these items?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={() => {
                dispatch(checkout(user));
                toast.success(`Items Purchased Successfully!`);
                setCheckoutOpen(false); // <-- close the dialog
              }}
            >
              Yes, Checkout
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>

        {/* Trigger button */}
        <Button
          className="cursor-pointer"
          disabled={cart.length === 0}
          onClick={() => setCheckoutOpen(true)} // <-- open dialog manually
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
