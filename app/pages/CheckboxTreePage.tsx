"use client";
import { useState, useMemo, useEffect } from "react";
import { fetchCheckboxTreeCategories } from "../services/api.service";
import { CheckboxTree } from "../components/CheckboxTree/CheckboxTree";
import { SelectedCategories } from "../components/SelectedCategories/SelectedCategories";
import {
  updateCategories,
  getSelectedCategoryNames,
  getCheckedNodeCount,
} from "../utils/handleCategorySelections";
import { Category } from "../types";
import SelectButtons from "../components/SelectButtons/SelectButtons";
import { buildCheckboxTree } from "../utils/buildCheckboxTree";
import styles from "./CheckboxPage.module.css";

export default function CheckboxTreePage() {
  const [treeState, setTreeState] = useState<Category[]>([]);
  const [totalItemCount, setTotalItemCount] = useState(0);

  const selectedCount = useMemo(
    () => getCheckedNodeCount(treeState),
    [treeState],
  );

  const selectedCategories = useMemo(
    () => getSelectedCategoryNames(treeState),
    [treeState],
  );

  useEffect(() => {
    const fetchData = async () => {
      const rawCategories = await fetchCheckboxTreeCategories();
      const { categories, totalNodeCount } = buildCheckboxTree(rawCategories);

      setTreeState(categories);
      setTotalItemCount(totalNodeCount);
    };

    fetchData();
  }, []);

  function handleSelectionChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = event.target;

    setTreeState((prevCategories) =>
      updateCategories(prevCategories, id, checked),
    );
  }

  function handleSelectAll(applyToAllItems: boolean) {
    setTreeState((prevCategories) =>
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
        <CheckboxTree data={treeState} onChange={handleSelectionChange} />
      </div>

      {selectedCategories.length > 0 && (
        <div className={styles.selectedCategoriesContainer}>
          <SelectedCategories selectedCategories={selectedCategories} />
        </div>
      )}
    </div>
  );
}
