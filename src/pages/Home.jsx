import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        // Shuffle and pick 6 random products
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 6));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();

    return () => controller.abort(); // cleanup
  }, []);

  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Discover the Future of Shopping
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-muted-foreground mb-6 max-w-xl"
        >
          Explore trending products with seamless checkout and lightning-fast
          delivery. Shop smarter, not harder.
        </motion.p>
        <Link to="/products">
          <Button size="lg" className="px-6 cursor-pointer">
            Start Shopping
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Truck className="h-8 w-8 text-primary" />,
            title: "Free Shipping",
            desc: "On all orders above $50",
          },
          {
            icon: <ShieldCheck className="h-8 w-8 text-primary" />,
            title: "Secure Checkout",
            desc: "100% payment protection",
          },
          {
            icon: <Headphones className="h-8 w-8 text-primary" />,
            title: "24/7 Support",
            desc: "Always here to help you",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <Card className="p-6 text-center bg-card text-card-foreground shadow-md">
              <CardContent className="flex flex-col items-center gap-4">
                {f.icon}
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Popular Products */}
      <section className="py-16 px-6 bg-muted">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="overflow-hidden bg-card text-card-foreground shadow">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain bg-background"
                />
                <CardContent className="p-4 flex flex-col gap-2">
                  <h3 className="font-semibold line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground">${product.price}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
