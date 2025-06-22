import {
  HomeIcon,
  EnvelopeIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./sidebar.module.css";
import clsx from "clsx";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isHomeActive =
    location.pathname === "/" || location.pathname.startsWith("/orders");

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <nav className={clsx(styles.sidebar, { [styles.collapsed]: collapsed })}>
      <ul>
        <li>
          <NavLink
            to={`/`}
            className={isHomeActive ? styles.active : styles.inactive}
            aria-label="Home button"
          >
            <HomeIcon />
            <span> Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/messages`}
            aria-label="Messages button"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            <EnvelopeIcon />
            <span> Messages</span>
          </NavLink>
        </li>
      </ul>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={styles.collapse}
      >
        <span>Collapse</span>
        <ChevronLeftIcon />
      </button>
    </nav>
  );
};
