"use client";
import { useState, useMemo, useEffect } from "react";
import { fetchCheckboxTreeCategories } from "../services/api.service";
import { CheckboxTree } from "../components/CheckboxTree/CheckboxTree";
import { SelectedCategories } from "../components/SelectedCategories/SelectedCategories";
import {
  updateCategories,
  getSelectedCategories,
  getCheckedNodeCount,
} from "../utils/handleCategorySelections";
import { Category } from "../types";
import SelectButtons from "../components/SelectButtons/SelectButtons";
import { buildCheckboxTree } from "../utils/buildCheckboxTree";
import styles from "./CheckboxPage.module.css";

export default function CheckboxTreePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalItemCount, setTotalItemCount] = useState(0);

  const selectedCount = useMemo(
    () => getCheckedNodeCount(categories),
    [categories],
  );
  const selectedCategories = useMemo(
    () => getSelectedCategories(categories),
    [categories],
  );

  useEffect(() => {
    const fetchData = async () => {
      const rawCategories = await fetchCheckboxTreeCategories();
      const { categories, totalCount } = buildCheckboxTree(rawCategories);

      setCategories(categories);
      setTotalItemCount(totalCount);
    };

    fetchData();
  }, []);

  function handleSelectionChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = event.target;
    setCategories((prevCategories) =>
      updateCategories(prevCategories, id, checked),
    );
  }

  function handleSelectAll(applyToAllItems: boolean) {
    setCategories((prevCategories) =>
      updateCategories(prevCategories, "", applyToAllItems, true),
    );
  }

  return (
    <div className={styles.flexContainer}>
      <div className={styles.checkboxTreeContainer}>
        <SelectButtons
          handleSelectAll={handleSelectAll}
          selectedCount={selectedCount}
          totalItemCount={totalItemCount}
        />
        <CheckboxTree data={categories} onChange={handleSelectionChange} />
      </div>
      {selectedCategories.length > 0 && (
        <div className={styles.selectedCategoriesContainer}>
          <SelectedCategories selectedCategories={selectedCategories} />
        </div>
      )}
    </div>
  );
}
