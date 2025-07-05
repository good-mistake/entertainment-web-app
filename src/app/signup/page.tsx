"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/userSlice";
import type { AppDispatch, RootState } from "../redux/store";
import { resetError } from "../redux/userSlice";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(resetError());
    setErrors("");
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) return setErrors("Passwords don't match");
    setErrors("");

    const result = await dispatch(signupUser({ email, password }));

    if (signupUser.fulfilled.match(result)) {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setErrors(result.payload || "Signup failed");
    }
  };

  return (
    <div className="signupOrLogin">
      <Image src={"/assets/logo.svg"} width={32} height={26} alt="logo" />
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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
        <input
          type="password"
          placeholder="Repeat Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="passwordRepeat"
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
                Creating...
              </motion.span>
            ) : (
              <motion.span
                key="normal"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                Create an account
              </motion.span>
            )}
          </AnimatePresence>{" "}
        </button>{" "}
        {error || errors ? <p className="error">{error || errors}</p> : ""}{" "}
        {success && (
          <p className="success">Signup successful! Redirecting...</p>
        )}
        <div className="login">
          <p>Already have an account?</p>
          <button type="button" onClick={() => router.push("/login")}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
