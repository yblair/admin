import React from "react";
import styles from "./emptyState.module.css";

interface EmptyStateProps {
  title: string;
  description: string;
  image?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        {image && <img src={image} alt={description} />}
      </div>
      <div className={styles.content} tabIndex={0}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
