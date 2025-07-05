"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { loginUser } from "../redux/userSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, isAuthenticated, error } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      setSuccess(true);
      const timer = setTimeout(() => router.push("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors("");
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.rejected.match(result)) {
      setErrors(result.payload || "Login failed");
    }
  };

  return (
    <div className="signupOrLogin">
      <Image src={"/assets/logo.svg"} width={32} height={26} alt="logo" />
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          className="email"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          <AnimatePresence mode="wait" initial={false}>
            {loading ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                Login in...
              </motion.span>
            ) : (
              <motion.span
                key="normal"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                Login to your account{" "}
              </motion.span>
            )}
          </AnimatePresence>{" "}
        </button>{" "}
        {error || errors ? <p className="error">{error || errors}</p> : ""}
        {success && <p className="success">Login successful! Redirecting...</p>}
        <div className="login">
          <p>Don’t have an account?</p>
          <button type="button" onClick={() => router.push("/signup")}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
