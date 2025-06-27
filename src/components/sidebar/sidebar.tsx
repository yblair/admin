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

  const navItems = [
    {
      label: "Home",
      icon: <HomeIcon />,
      to: "/",
      matchPaths: ["/", "/orders"],
    },
    {
      label: "Messages",
      icon: <EnvelopeIcon />,
      to: "/messages",
      matchPaths: ["/messages"],
    },
  ];

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

  const isRouteActive = (matchPaths: string[], currentPath: string) => {
    return matchPaths.some((path) =>
      path === "/" ? currentPath === "/" : currentPath.startsWith(path)
    );
  };

  return (
    <nav className={clsx(styles.sidebar, { [styles.collapsed]: collapsed })}>
      <ul>
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.to}
              className={
                isRouteActive(item.matchPaths, location.pathname)
                  ? styles.active
                  : styles.inactive
              }
              aria-label={`${item.label} button`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={styles.collapse}
        style={{ width: collapsed ? "64px" : "220px" }}
      >
        <span>Collapse</span>
        <ChevronLeftIcon />
      </button>
    </nav>
  );
};
