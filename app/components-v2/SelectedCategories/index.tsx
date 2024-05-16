import React from "react";
import "./styles.css";

export const SelectedCategories: React.FC<{
  selectedCategories: string[];
}> = ({ selectedCategories }) => {
  return (
    <>
      <h3>Selected Categories:</h3>
      <div className="category-grid">
        {selectedCategories.map((category) => (
          <span key={category} className="category-item">
            {category}
          </span>
        ))}
      </div>
    </>
  );
};
