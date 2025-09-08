import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Headphones,
  Star,
  ArrowRight,
  Heart,
  Eye,
  CheckCircle,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton"; 
import { Link } from "react-router-dom";

const SkeletonCard = () => (
  <Card className="overflow-hidden bg-card">
    <Skeleton className="h-48 w-full" />
    <CardContent className="p-4">
      <Skeleton className="h-4 w-2/3 mb-2" />
      <Skeleton className="h-3 w-1/3 mb-4" />
      <Skeleton className="h-8 w-1/2" />
    </CardContent>
  </Card>
);

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Retry-enabled fetch
  const fetchProducts = async (retries = 3, delay = 1000) => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setProducts(shuffled.slice(0, 6));
      setError(null);
    } catch {
      if (retries > 0) {
        console.warn(`Retrying... (${retries} left)`);
        setTimeout(() => fetchProducts(retries - 1, delay), delay);
      } else {
        setError("Failed to load products. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const testimonials = [
    {
      name: "Jessica Chen",
      rating: 5,
      text: "Amazing quality and super fast delivery! Will definitely shop here again.",
      avatar: "JC",
    },
    {
      name: "David Rodriguez",
      rating: 5,
      text: "Best customer service I've ever experienced. Highly recommend!",
      avatar: "DR",
    },
    {
      name: "Lisa Thompson",
      rating: 5,
      text: "Love the product selection and the prices are unbeatable.",
      avatar: "LT",
    },
  ];

  const categories = [
    { name: "Electronics", color: "bg-blue-500", emoji: "📱" },
    { name: "Fashion", color: "bg-pink-500", emoji: "👗" },
    { name: "Home", color: "bg-green-500", emoji: "🏠" },
    { name: "Sports", color: "bg-orange-500", emoji: "⚽" },
    { name: "Beauty", color: "bg-purple-500", emoji: "💄" },
    { name: "Books", color: "bg-indigo-500", emoji: "📚" },
  ];

  const brands = ["Nike", "Apple", "Samsung", "Adidas", "Sony", "Canon"];

  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
        />

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Discover the Future of Shopping
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative text-lg text-muted-foreground mb-8 max-w-xl"
        >
          Explore trending products with seamless checkout and lightning-fast
          delivery. Shop smarter, not harder.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="relative z-20"
        >
          <Link to="/products">
            <Button
              size="lg"
              className="px-8 h-12 cursor-pointer group relative z-30"
            >
              Start Shopping
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="relative flex items-center gap-6 mt-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-1">            
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>30-Day Returns</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="h-4 w-4 text-blue-500" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck className="h-4 w-4 text-orange-500" />
            <span>Free Shipping</span>
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {categories.map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="cursor-pointer"
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center gap-3">
                    <div
                      className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-white text-xl`}
                    >
                      {category.emoji}
                    </div>
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Truck className="h-8 w-8 text-primary" />,
            title: "Free Shipping",
            desc: "On all orders above $50",
            highlight: "Same-day delivery available",
          },
          {
            icon: <ShieldCheck className="h-8 w-8 text-primary" />,
            title: "Secure Checkout",
            desc: "100% payment protection",
            highlight: "256-bit SSL encryption",
          },
          {
            icon: <Headphones className="h-8 w-8 text-primary" />,
            title: "24/7 Support",
            desc: "Always here to help you",
            highlight: "Live chat available",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <Card className="p-6 text-center bg-card hover:shadow-xl transition-shadow border-2 hover:border-primary/20">
              <CardContent className="flex flex-col items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
                <span className="text-xs text-primary font-medium">{f.highlight}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Popular Products with Skeleton + Retry */}
      <section className="py-16 px-6 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Popular Products</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                New
              </Button>
              <Button variant="outline" size="sm">
                Trending
              </Button>
              <Button variant="outline" size="sm">
                Sale
              </Button>
            </div>
          </div>

          {error ? (
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button variant="default" className="cursor-pointer"
                onClick={() => {
                  setLoading(true);
                  fetchProducts();
                }}
              >
               {loading ? "Retrying..." : "Retry"}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : products.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group"
                    >
                      <Card className="overflow-hidden bg-card hover:shadow-xl transition-all duration-300 relative">
                        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-8 h-8 p-0 bg-white/90 cursor-pointer"
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-8 h-8 p-0 bg-white/90 cursor-pointer"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="relative overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-contain bg-background group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-3 w-3 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">
                              (4.5)
                            </span>
                          </div>
                          <h3 className="font-semibold line-clamp-1 mb-2">
                            {product.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-lg font-bold text-primary">
                                ${product.price}
                              </span>
                              <span className="text-sm text-muted-foreground line-through ml-2">
                                ${(product.price * 1.2).toFixed(2)}
                              </span>
                            </div>
                            {/* <Button
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Add to Cart
                            </Button> */}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
            </div>
          )}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <Card className="p-6 h-full bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col gap-4 h-full">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground flex-grow">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                        {testimonial.avatar}
                      </div>
                      <span className="font-semibold">{testimonial.name}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-lg mb-8 opacity-90">
              Get exclusive deals, new arrivals, and insider tips delivered to
              your inbox. Plus, get 10% off your first order!
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-white text-black flex-grow"
              />
              <Button variant="secondary" className="px-6">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75">
              No spam, unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Trusted Brands */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-muted-foreground mb-8">
            Trusted by leading brands
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {brands.map((brand, i) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-2xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-card text-card-foreground py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ShopFuture</h3>
            <p className="text-muted-foreground text-sm">
              Your one-stop destination for the latest products and unbeatable
              deals.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="hover:text-foreground cursor-pointer">Products</p>
              <p className="hover:text-foreground cursor-pointer">About Us</p>
              <p className="hover:text-foreground cursor-pointer">Contact</p>
              <p className="hover:text-foreground cursor-pointer">Support</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="hover:text-foreground cursor-pointer">
                Shipping Info
              </p>
              <p className="hover:text-foreground cursor-pointer">Returns</p>
              <p className="hover:text-foreground cursor-pointer">Size Guide</p>
              <p className="hover:text-foreground cursor-pointer">FAQ</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="hover:text-foreground cursor-pointer">Facebook</p>
              <p className="hover:text-foreground cursor-pointer">Instagram</p>
              <p className="hover:text-foreground cursor-pointer">Twitter</p>
              <p className="hover:text-foreground cursor-pointer">YouTube</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2025 E-Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
