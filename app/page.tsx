"use client";

import { CheckboxTree } from "./components/CheckboxTree";
import { buildTree } from "./utils";
import { checkboxTreeCategories } from "./services/api.service";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { useEffect, useState } from "react";

import { useAppDispatch } from "./state/hooks";
import { setTreeData } from "./state/features/checkBoxSlice";
import { CheckboxTreeV2 } from "./components-v2/CheckboxTreeV2";
import { Category } from "./types";

const AllData = buildTree(checkboxTreeCategories);

function updateTreeWithCheckedItems(
  items: Category[],
  id: string,
  isChecked: boolean,
): Category[] {
  debugger;
  return items.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        isChecked: isChecked,
        children: updateIsCheckedRecursive(item.children, isChecked),
      };
    } else if (item.children.length > 0) {
      return {
        ...item,
        children: updateTreeWithCheckedItems(item.children, id, isChecked),
      };
    } else {
      return item;
    }
  });
}

function updateIsCheckedRecursive(
  children: Category[],
  isChecked: boolean,
): Category[] {
  if (!children) return children;
  return children.map((child) => ({
    ...child,
    isChecked: isChecked,
    children: updateIsCheckedRecursive(child.children, isChecked),
  }));
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>(AllData);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const checkedItemId = event.target.id;
    const isChecked = event.target.checked;

    const updatedTreeData = updateTreeWithCheckedItems(
      categories,
      checkedItemId,
      isChecked,
    );

    setCategories(updatedTreeData);
  }

  return <CheckboxTreeV2 data={categories} onChange={handleChange} />;
}
