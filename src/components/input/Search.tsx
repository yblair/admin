import React from "react";
import styles from "./search.module.css";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  placeholder = "Search by customer...",
}) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchIcon}>
        <MagnifyingGlassIcon className={styles.icon} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
        aria-label="Search by customers"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className={styles.clearButton}
          aria-label="Clear search"
        >
          <XMarkIcon className={styles.clearIcon} />
        </button>
      )}
    </div>
  );
};
