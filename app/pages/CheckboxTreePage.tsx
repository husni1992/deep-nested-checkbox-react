"use client";
import { useState, useMemo, useEffect } from "react";
import { fetchCheckboxTreeCategories } from "../services/api.service";
import { CheckboxTree } from "../components/CheckboxTree/CheckboxTree";
import { SelectedCategories } from "../components/SelectedCategories/SelectedCategories";
import {
  updateNodeSelections,
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

  const selectedNodeCount = useMemo(
    () => getCheckedNodeCount(treeState),
    [treeState],
  );

  const selectedCategoriesOnly = useMemo(
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

    setTreeState((prevTreeState) =>
      updateNodeSelections(prevTreeState, id, checked),
    );
  }

  function handleToggleAll(isChecked: boolean) {
    setTreeState((prevTreeState) =>
      updateNodeSelections(prevTreeState, "", isChecked, true),
    );
  }

  return (
    <div className={styles.flexContainer}>
      <div className={styles.checkboxTreeContainer}>
        <SelectButtons
          handleToggleAll={handleToggleAll}
          selectedCount={selectedNodeCount}
          totalItemCount={totalItemCount}
        />
        <CheckboxTree data={treeState} onChange={handleSelectionChange} />
      </div>

      {selectedCategoriesOnly.length > 0 && (
        <div className={styles.selectedCategoriesContainer}>
          <SelectedCategories selectedCategories={selectedCategoriesOnly} />
        </div>
      )}
    </div>
  );
}
