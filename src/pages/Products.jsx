import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";
import { toast } from "sonner";
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

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
        setCategories(["all", ...new Set(data.map((p) => p.category))]);

        toast.success("Products loaded successfully!");
      } catch (error) {
        if (error.name !== "AbortError") {
          toast.error("Could not load products. Please try again.");
          console.error("Error fetching products:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort(); // cleanup if component unmounts
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = products;
    if (category !== "all")
      filtered = filtered.filter((p) => p.category === category);
    if (search.trim() !== "")
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    setFilteredProducts(filtered);
    setVisibleCount(8);
  }, [category, search, products]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-background text-foreground min-h-screen">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-40 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-5 w-1/3" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 text-center bg-background text-foreground min-h-screen">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/2"
        />
        <Select value={category} onValueChange={(val) => setCategory(val)}>
          <SelectTrigger className="md:w-1/4 cursor-pointer">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-lg truncate">
                {product.title}
              </CardTitle>
              <Badge>{product.category}</Badge>
            </CardHeader>
            <CardContent>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-4"
              />
              <p className="font-semibold text-lg mb-4">${product.price}</p>

              {/* Add to Cart Alert */}
              <AlertDialog
                open={selectedProduct?.id === product.id}
                onOpenChange={() => setSelectedProduct(null)}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Add to Cart</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to add "{product.title}" to your
                      cart?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogCancel
                    className="cursor-pointer"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(addToCart(product));
                      toast.success(`"${product.title}" added to cart!`);
                      setSelectedProduct(null);
                    }}
                  >
                    Yes, Add
                  </AlertDialogAction>
                </AlertDialogContent>
              </AlertDialog>
              {/* Trigger Button */}
              <Button
                onClick={() => setSelectedProduct(product)}
                className="w-full cursor-pointer"
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredProducts.length && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="px-6 cursor-pointer"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
