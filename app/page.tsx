"use client";
import { useState, useMemo, useEffect } from "react";
import { buildTree } from "./utils";
import { fetchCheckboxTreeCategories } from "./services/api.service";
import { CheckboxTree } from "./components/CheckboxTree";
import { Category } from "./types";
import { SelectedCategories } from "./components/SelectedCategories";
import "./page.css";

function updateCategory(category: Category, isChecked: boolean): Category {
  return {
    ...category,
    isChecked,
    children: category.children.map((child) =>
      updateCategory(child, isChecked),
    ),
  };
}

function updateCategories(
  categories: Category[],
  id: string,
  isChecked: boolean,
  applyToAllItems = false,
): Category[] {
  return categories.map((category) => {
    if (category.id === id || applyToAllItems) {
      return updateCategory(category, isChecked);
    } else if (category.children.length > 0) {
      return {
        ...category,
        children: updateCategories(category.children, id, isChecked),
      };
    }
    return category;
  });
}

function getSelectedCategories(categories: Category[]): string[] {
  return categories.reduce((selected: string[], category) => {
    // Pick only categories, which does have children
    if (category.isChecked && category.children.length) {
      selected.push(category.name);
    }

    if (category.children.length > 0) {
      selected.push(...getSelectedCategories(category.children));
    }
    return selected;
  }, []);
}

function getSelectedCount(categories: Category[]): number {
  let count = 0;
  categories.forEach((category) => {
    if (category.isChecked) {
      count++;
    }
    if (category.children.length > 0) {
      count += getSelectedCount(category.children);
    }
  });
  return count;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalItemCount, setTotalItemCount] = useState(0);

  const selectedCount = useMemo(
    () => getSelectedCount(categories),
    [categories],
  );

  useEffect(() => {
    const fetchData = async () => {
      const rawCategories = await fetchCheckboxTreeCategories();
      const { categories, totalCount } = buildTree(rawCategories);

      setCategories(categories);
      setTotalItemCount(totalCount);
    };

    fetchData();
  }, []);

  const selectedCategories = useMemo(
    () => getSelectedCategories(categories),
    [categories],
  );

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
    <div className="flex-container">
      <div className="checkbox-tree-container">
        <div className="button-container">
          <button
            className="select-all-btn"
            onClick={() => handleSelectAll(true)}
            disabled={selectedCount === totalItemCount}
          >
            Select All
          </button>
          <button
            className="clear-all-btn"
            onClick={() => handleSelectAll(false)}
            disabled={selectedCount === 0}
          >
            Clear All
          </button>
        </div>

        <CheckboxTree data={categories} onChange={handleSelectionChange} />
      </div>

      <>
        {selectedCategories.length > 0 && (
          <div className="selected-categories-container">
            <SelectedCategories selectedCategories={selectedCategories} />
          </div>
        )}
      </>
    </div>
  );
}
