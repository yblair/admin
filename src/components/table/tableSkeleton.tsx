import styles from "./tableSkeleton.module.css";

const TableSkeleton = () => {
  return (
    <td className={styles.skeletonRow} colSpan={5}>
      <div className={styles.skeletonContainer}>
        <div className={styles.skeletonCell} />
      </div>
    </td>
  );
};

export default TableSkeleton;
