import { Cog, ShoppingBag, ShoppingCart, User, Menu } from "lucide-react"
import { Link } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { useSelector } from "react-redux"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {
  const cart = useSelector((state) => state.cart.items)
  // total quantity (not just unique items)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="w-full bg-background text-foreground border-b shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold hover:text-primary">
          E-Shop
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <Link
            to="/products"
            className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingBag size={18} /> Products
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingCart size={18} /> Cart
            {cartCount > 0 && (
              <span className="ml-1 text-sm font-semibold text-muted-foreground">
                ({cartCount})
              </span>
            )}
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <User size={18} /> Profile
          </Link>
          <Link
            to="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Cog size={18} /> Admin
          </Link>
        </nav>

        {/* Right side (Dark mode toggle + Burger on mobile) */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                <Menu size={22} />
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="bg-background text-foreground">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-4">
                <Link
                  to="/products"
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <ShoppingBag size={18} /> Products
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <ShoppingCart size={18} /> Cart{" "}
                  {cartCount > 0 && (
                    <span className="ml-0.5 text-sm font-semibold text-foreground">
                      ({cartCount})
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <User size={18} /> Profile
                </Link>
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Cog size={18} /> Admin
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
