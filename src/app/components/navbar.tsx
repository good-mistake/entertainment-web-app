"use client";
import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import type { RootState } from "../redux/store";
import { useRouter } from "next/navigation";

interface NavbarProps {
  userColor?: string;
  onNavigate?: (view: string) => void;
  view: string;
}

const Navbar: React.FC<NavbarProps> = ({ userColor, onNavigate, view }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const handleAuthToggle = () => {
    if (isAuthenticated) {
      dispatch(logout());
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="navbar">
      <ul className="navbarList">
        <li className="navbarLogo">
          <Image src={"/assets/logo.svg"} width={32} height={26} alt="logo" />
        </li>{" "}
        <ul className="navbarListTop">
          <ul>
            <li
              className={view === "home" ? "active" : ""}
              onClick={() => onNavigate?.("home")}
            >
              <Image
                src={"/assets/icon-nav-home.svg"}
                width={20}
                height={20}
                alt="home"
              />
            </li>
            <li
              className={view === "movies" ? "active" : ""}
              onClick={() => onNavigate?.("movies")}
            >
              <Image
                src={"/assets/icon-nav-movies.svg"}
                width={20}
                height={20}
                alt="movies"
              />
            </li>
            <li
              className={view === "tv" ? "active" : ""}
              onClick={() => onNavigate?.("tv")}
            >
              <Image
                src={"/assets/icon-nav-tv-series.svg"}
                width={20}
                height={20}
                alt="tv-series"
              />
            </li>
            <li
              className={view === "bookmark" ? "active" : ""}
              onClick={() => onNavigate?.("bookmark")}
            >
              <Image
                src={"/assets/icon-nav-bookmark.svg"}
                width={20}
                height={20}
                alt="bookmark"
              />
            </li>
            <li
              onClick={handleAuthToggle}
              className={isAuthenticated ? "logout" : "login"}
            >
              <Image
                src={"/assets/login-svgrepo-com.svg"}
                width={20}
                height={20}
                alt="login"
              />
            </li>
          </ul>
        </ul>
        <li className="profilePic">
          {isAuthenticated && userColor ? (
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: userColor,
              }}
            />
          ) : (
            <Image
              src="/assets/image-avatar.png"
              width={40}
              height={40}
              alt="default avatar"
            />
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
