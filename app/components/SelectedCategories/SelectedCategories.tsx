import React from "react";
import styles from "./SelectedCategories.module.css";

export const SelectedCategories: React.FC<{
  selectedCategories: string[];
}> = ({ selectedCategories }) => {
  return (
    <>
      <h3 className={styles.header}>Selected Categories:</h3>
      <div className={styles.categoryGrid}>
        {selectedCategories.map((category) => (
          <span key={category} className={styles.categoryItem}>
            {category}
          </span>
        ))}
      </div>
    </>
  );
};
