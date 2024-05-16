import React from "react";
import styles from "./SelectButtons.module.css";

interface SelectButtonsProps {
  handleSelectAll: (applyToAllItems: boolean) => void;
  selectedCount: number;
  totalItemCount: number;
}

const SelectButtons: React.FC<SelectButtonsProps> = ({
  handleSelectAll,
  selectedCount,
  totalItemCount,
}) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.button} ${styles.selectAllBtn}`}
        onClick={() => handleSelectAll(true)}
        disabled={selectedCount === totalItemCount}
      >
        Select All
      </button>
      <button
        className={`${styles.button} ${styles.clearAllBtn}`}
        onClick={() => handleSelectAll(false)}
        disabled={selectedCount === 0}
      >
        Clear All
      </button>
    </div>
  );
};

export default SelectButtons;
