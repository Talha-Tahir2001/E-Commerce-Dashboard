// src/pages/Login.jsx
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/slices/authSlice";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();


  const [role, setRole] = useState("user");

  const handleLogin = (e) => {
    e.preventDefault();

     const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(
      login({
        username,
        email,
        role,
      })
    );

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <form
        onSubmit={handleLogin}
        className="bg-card shadow-lg rounded-xl p-6 w-96 space-y-4"
      >
        <h2 className="text-xl font-bold">Login</h2>

        {/* Username */}
        <Input
          type="text"
          placeholder="Enter username"
          ref={usernameRef}
          required
        />

        {/* Email */}
        <Input
          type="email"
          placeholder="Enter email"
          ref={emailRef}
          required
        />

        {/* Password */}
        <Input
          type="password"
          placeholder="Enter password"
          ref={passwordRef}          
          required
        />

        {/* Role selector */}
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>
      </form>
    </div>
  );
}
