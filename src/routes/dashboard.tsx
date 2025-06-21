import { ProductProps, Table } from "../components/table/table";
import Card from "../components/dashboard/Card";
import data from "../data/data.json";
import styles from "./root.module.css";
import EmptyState from "../components/emptyState/EmptyState";

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
          <Table data={data.orders as ProductProps[]} />
        </div>
      ) : (
        <EmptyState
          title="No transactions yet"
          description="There’s currently no transactions"
        />
      )}
    </div>
  );
};
