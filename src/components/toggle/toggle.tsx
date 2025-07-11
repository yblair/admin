import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import styles from "./toggle.module.css";
import clsx from "clsx";

export const Toggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    // Update document class and local storage when mode changes
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <div className={styles.toggle}>
      <input
        type="checkbox"
        className={styles.checkbox}
        id="toggle"
        checked={isDarkMode}
        aria-label="Toggle dark mode"
        onChange={() => setIsDarkMode(!isDarkMode)}
      />
      <label htmlFor="toggle" className={styles.checkboxLabel}>
        <span
          className={clsx(styles.ball, {
            [styles.animation]: isDarkMode,
          })}
        >
          {isDarkMode ? (
            <MoonIcon className={styles.moonIcon} />
          ) : (
            <SunIcon className={styles.sunIcon} />
          )}
        </span>
      </label>
      <div
        className={clsx(styles.inactiveBall, {
          [styles.inactiveAnimation]: isDarkMode,
        })}
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? (
          <SunIcon className={styles.sunIconInactive} />
        ) : (
          <MoonIcon className={styles.moonIconInactive} />
        )}
      </div>
    </div>
  );
};
