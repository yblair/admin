import React from "react";
import styles from "./cardSkeleton.module.css";

const CardSkeleton: React.FC = () => (
  <div className={styles.card}>
    <div className={styles.header}>
      <div className={styles.titleSkeleton} />
      <div className={styles.iconSkeleton} />
    </div>
    <div className={styles.content}>
      <div className={styles.amountSkeleton} />
      <div className={styles.todaySkeleton} />
    </div>
  </div>
);

export default CardSkeleton;
