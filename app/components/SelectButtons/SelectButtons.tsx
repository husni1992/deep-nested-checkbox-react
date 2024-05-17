import React from "react";
import styles from "./SelectButtons.module.css";

interface SelectButtonsProps {
  handleToggleAll: (isChecked: boolean) => void;
  selectedCount: number;
  totalItemCount: number;
}

const SelectButtons: React.FC<SelectButtonsProps> = ({
  handleToggleAll,
  selectedCount,
  totalItemCount,
}) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.button} ${styles.selectAllBtn}`}
        onClick={() => handleToggleAll(true)}
        disabled={selectedCount === totalItemCount}
      >
        Select All
      </button>
      <button
        className={`${styles.button} ${styles.clearAllBtn}`}
        onClick={() => handleToggleAll(false)}
        disabled={selectedCount === 0}
      >
        Clear All
      </button>
    </div>
  );
};

export default SelectButtons;
