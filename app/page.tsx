"use client";
import { useState, useMemo } from "react";
import { buildTree } from "./utils";
import { checkboxTreeCategories } from "./services/api.service";
import { CheckboxTreeV2 } from "./components-v2/CheckboxTreeV2";
import { Category } from "./types";
import "./page.css";

const initialCategories = buildTree(checkboxTreeCategories);

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
  isSelectAll = false,
): Category[] {
  return categories.map((category) => {
    if (category.id === id || isSelectAll) {
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
  debugger;
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

function isAllSelected(categories: Category[]): boolean {
  return categories.every((category) => {
    if (category.children.length > 0) {
      return category.isChecked && isAllSelected(category.children);
    }
    return category.isChecked;
  });
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const allSelected = useMemo(() => isAllSelected(categories), [categories]);

  const selectedCategories = useMemo(
    () => getSelectedCategories(categories),
    [categories],
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = event.target;
    setCategories((prevCategories) =>
      updateCategories(prevCategories, id, checked),
    );
  }

  function handleSelectAll(isSelectAll: boolean) {
    setCategories((prevCategories) =>
      updateCategories(prevCategories, "", isSelectAll, true),
    );
  }

  return (
    <div className="flex-container">
      <div className="checkbox-tree-container">
        <div className="button-container">
          <button onClick={() => handleSelectAll(true)} disabled={allSelected}>
            Select All
          </button>
          <button
            onClick={() => handleSelectAll(false)}
            disabled={!allSelected}
          >
            Clear All
          </button>
        </div>

        <CheckboxTreeV2 data={categories} onChange={handleChange} />
      </div>

      <>
        {selectedCategories.length > 0 && (
          <div className="selected-categories">
            <h3>Selected Categories:</h3>
            <div className="category-grid">
              {selectedCategories.map((category) => (
                <span key={category} className="category-item">
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}
      </>
    </div>
  );
}
