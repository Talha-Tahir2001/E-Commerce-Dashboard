import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      emailRef.current.focus();
      return;
    }
        
    const fakeUser = {
      id: 1,
      name: "Talha",
      email,
      role: email === "admin@shop.com" ? "admin" : "user",
    };

    dispatch(login(fakeUser));
    toast.success("Logged in successfully!");
    navigate("/profile");
  };

  if (isAuthenticated) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4">You are already logged in.</p>
        <Button onClick={() => navigate("/profile")}>Go to Profile</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-card rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <Input
          ref={emailRef}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>
      </form>
    </div>
  );
}
