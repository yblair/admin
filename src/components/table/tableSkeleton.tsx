import stylesSkeleton from "./tableSkeleton.module.css";

const TableSkeleton = () => {
  return (
    <td className={stylesSkeleton.skeletonRow} colSpan={5}>
      <div className={stylesSkeleton.skeletonContainer}>
        <div className={stylesSkeleton.skeletonCell} />
        <div className={stylesSkeleton.skeletonCell} />
        <div className={stylesSkeleton.skeletonCell} />
        <div className={stylesSkeleton.skeletonCell} />
        <div className={stylesSkeleton.skeletonCell} />
      </div>
    </td>
  );
};

export default TableSkeleton;
