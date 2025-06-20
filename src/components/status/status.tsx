import clsx from "clsx";
import type { ProductStatusProps } from "../table/table";
import styles from "./status.module.css";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const getStatusStyles = (status: ProductStatusProps) => {
  return clsx(styles.container, {
    [styles.approved]: status === "Approved",
    [styles.pending]: status === "Pending",
    [styles.rejected]: status === "Rejected",
  });
};

export const Status = ({ status }: { status: ProductStatusProps }) => {
  return (
    <div className={getStatusStyles(status)}>
      {status === "Approved" && <CheckCircleIcon aria-label="true" />}
      {status === "Pending" && <ExclamationTriangleIcon aria-hidden="true" />}
      {status === "Rejected" && <XMarkIcon aria-hidden="true" />}
      <p>{status}</p>
    </div>
  );
};
