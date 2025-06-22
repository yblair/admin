import React, { useEffect, useRef, useState } from "react";
import styles from "./drawer.module.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Status } from "../status/status";
import type { Status as StatusType } from "../../constants/status";
import { PENDING } from "../../constants/status";
import ActionButton from "../buttons/ActionButton";
import ConfirmationModal from "../modal/ConfirmationModal";

export interface Transaction {
  id: string | number;
  customer: string;
  date: string;
  product: string;
  status: StatusType;
  email: string;
  amount: number;
  paymentMethod: string;
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, transaction }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      contentRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen || !transaction) {
    return null;
  }

  const handleActionClick = (type: "approve" | "reject") => {
    setActionType(type);
    setModalOpen(true);
  };

  const handleConfirmAction = () => {
    console.log(
      `Action: ${actionType} confirmed for transaction: ${transaction.id}`
    );
    setModalOpen(false);
    onClose();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setActionType(null);
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div
          className={styles.drawer}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setModalOpen(false);
              onClose();
            }
          }}
          ref={contentRef}
          tabIndex={0}
        >
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close product detail screen"
          >
            <XMarkIcon className={styles.closeButtonIcon} />
          </button>

          <img
            src={"/product.jpg"}
            alt={transaction.product}
            className={styles.productImage}
          />
          <div className={styles.detailsContent}>
            <h2 className={styles.title}>{transaction.product}</h2>
            <p className={styles.subtitle}>{transaction.customer}</p>

            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Status:</span>
                <Status status={transaction.status} />
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Date:</span>
                <span className={styles.detailValue}>
                  {new Date(transaction.date).toLocaleString()}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Amount:</span>
                <span className={styles.detailValue}>
                  ${transaction.amount.toFixed(2)}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Payment method:</span>
                <span className={styles.detailValue}>
                  {transaction.paymentMethod}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Transaction ID:</span>
                <span className={styles.detailValue}>#{transaction.id}</span>
              </div>
            </div>

            {transaction.status === PENDING && (
              <div className={styles.actions}>
                <ActionButton
                  type="reject"
                  onClick={() => handleActionClick("reject")}
                >
                  REJECT
                </ActionButton>
                <ActionButton
                  type="accept"
                  onClick={() => handleActionClick("approve")}
                >
                  APPROVE
                </ActionButton>
              </div>
            )}
          </div>
        </div>
      </div>
      {actionType && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmAction}
          transaction={transaction}
          actionType={actionType}
        />
      )}
    </>
  );
};

export default Drawer;
