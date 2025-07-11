import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import clsx from "clsx";
import { POSITIVE, NEGATIVE } from "../../constants/values";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import CardSkeleton from "./cardSkeleton";

interface CardProps {
  title: string;
  amount?: number | string;
  today: number | string;
  result: string | null;
}

const Card: React.FC<CardProps> = ({ title, amount, today, result }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1250);
    return () => clearTimeout(timer);
  }, []);

  const isPositive = result === POSITIVE;
  const displayAmount = amount || "-";
  const isNegative = result === NEGATIVE;

  const getBorderClass = () => {
    if (today === undefined || today === null || today === "") {
      return styles.borderGrey;
    }
    const numAmount =
      typeof today === "string"
        ? parseFloat(today.replace(/[^0-9.-]/g, ""))
        : Number(today);

    if (isNaN(numAmount)) {
      return styles.borderGrey;
    }
    if (numAmount > 0) {
      return styles.borderSuccess;
    } else if (numAmount < 0) {
      return styles.borderNegative;
    } else {
      return styles.borderGrey;
    }
  };

  if (loading) return <CardSkeleton />;

  return (
    <div className={clsx(styles.card, getBorderClass())} tabIndex={0}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={clsx(styles.arrow, isPositive && styles.arrowUp)}>
          {isPositive ? (
            <ArrowTrendingUpIcon className={styles.arrowUp} />
          ) : isNegative ? (
            <ArrowTrendingDownIcon className={styles.arrowDown} />
          ) : null}
        </div>
      </div>
      <div className={styles.content}>
        <div className={clsx(styles.amount, isNegative && styles.negative)}>
          {displayAmount}
        </div>
        <div className={styles.today}>
          {today ? "today" + " " + today : "- since last hour"}
        </div>
      </div>
    </div>
  );
};

export default Card;
