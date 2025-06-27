import clsx from "clsx";
import styles from "./status.module.css";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { Status as StatusType } from "../../constants/status";
import { APPROVED, PENDING, REJECTED } from "../../constants/status";

const getStatusStyles = (status: StatusType) => {
  return clsx(styles.container, {
    [styles.approved]: status === APPROVED,
    [styles.pending]: status === PENDING,
    [styles.rejected]: status === REJECTED,
  });
};

export const Status = ({
  status,
  isDrawer,
}: {
  status: StatusType;
  isDrawer?: boolean;
}) => {
  return (
    <div className={getStatusStyles(status)}>
      {status === APPROVED && <CheckCircleIcon aria-hidden="true" />}
      {status === PENDING && <ExclamationTriangleIcon aria-hidden="true" />}
      {status === REJECTED && <XMarkIcon aria-hidden="true" />}
      {isDrawer ? (
        <p aria-hidden="true" className={styles.activeStatus}>
          {status}
        </p>
      ) : (
        <p aria-hidden="true" className={styles.statusText}>
          {status}
        </p>
      )}
      <div className={styles.srOnly}>Status: {status}</div>
    </div>
  );
};
