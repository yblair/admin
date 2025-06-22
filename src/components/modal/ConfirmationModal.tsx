import React from "react";
import styles from "./confirmationModal.module.css";
import ActionButton from "../buttons/ActionButton";
import type { Transaction } from "../drawer/drawer";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transaction: Transaction;
  actionType: "approve" | "reject";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  transaction,
  actionType,
}) => {
  if (!isOpen) {
    return null;
  }

  const title = `Are you sure you want to ${actionType} this order?`;
  const description = `You are about to ${actionType} an order. This action cannot be undone.`;
  const confirmButtonText = `YES, ${actionType.toUpperCase()}`;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.productInfo}>
          <img
            src="/product.jpg"
            alt={transaction.product}
            className={styles.productImage}
          />
          <div className={styles.productDetails}>
            <span className={styles.productName}>{transaction.product}</span>
            <span className={styles.productSku}>{transaction.customer}</span>
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.actions}>
          <ActionButton type="cancel" onClick={onClose}>
            CANCEL
          </ActionButton>
          <ActionButton type={actionType} onClick={onConfirm}>
            {confirmButtonText}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
