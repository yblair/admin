import React from "react";
import styles from "./cardSkeleton.module.css";

const CardSkeleton: React.FC = () => (
  <div className={styles.mobileCardSkeleton}>
    <div className={styles.mobileCardHeader}>
      <div className={styles.mobileCardCustomer}>
        <div className={styles.skeletonLine + " " + styles.skeletonName} />
      </div>
      <div className={styles.skeletonStatus} />
    </div>
    <div className={styles.skeletonLine + " " + styles.skeletonEmail} />
    <div className={styles.mobileCardDetails}>
      <div className={styles.mobileCardRow}>
        <div className={styles.skeletonLine + " " + styles.skeletonLabel} />
        <div className={styles.skeletonLine + " " + styles.skeletonValue} />
      </div>
      <div className={styles.mobileCardRow}>
        <div className={styles.skeletonLine + " " + styles.skeletonLabel} />
        <div className={styles.skeletonLine + " " + styles.skeletonValue} />
      </div>
      <div className={styles.mobileCardRow}>
        <div className={styles.skeletonLine + " " + styles.skeletonLabel} />
        <div className={styles.skeletonLine + " " + styles.skeletonAmount} />
      </div>
    </div>
  </div>
);

export default CardSkeleton;
