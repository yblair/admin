import React, { Suspense } from "react";
import { ProductProps } from "../components/table/table";
import Card from "../components/card/Card";
import data from "../data/data.json";
import styles from "./root.module.css";
import EmptyState from "../components/emptyState/EmptyState";

// Lazy load de componentes no críticos
const Table = React.lazy(() =>
  import("../components/table/table").then((module) => ({
    default: module.Table,
  }))
);

export const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.cardsGrid}>
        {data.cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            amount={card.amount}
            today={card.historicalAmount}
            result={card.result}
          />
        ))}
      </div>
      {data.orders.length > 0 ? (
        <div className={styles.tableSection}>
          <Suspense
            fallback={
              <div style={{ padding: "1.25rem", textAlign: "center" }}>
                Loading table...
              </div>
            }
          >
            <Table data={data.orders as ProductProps[]} />
          </Suspense>
        </div>
      ) : (
        <EmptyState
          title="No transactions yet"
          description="There's currently no transactions"
        />
      )}
    </div>
  );
};
