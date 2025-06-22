import {
  HomeIcon,
  EnvelopeIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./sidebar.module.css";
import clsx from "clsx";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isHomeActive =
    location.pathname === "/" || location.pathname.startsWith("/orders");

  return (
    <nav className={clsx(styles.sidebar, { [styles.collapsed]: collapsed })}>
      <ul>
        <li>
          <NavLink
            to={`/`}
            className={isHomeActive ? styles.active : styles.inactive}
          >
            <HomeIcon />
            <span> Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/messages`}
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
