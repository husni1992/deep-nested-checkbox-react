"use client";

import { useAppDispatch } from "../state/hooks";
import {
  selectCheckedItems,
  selectExpandedItems,
  selectTreeData,
  setTreeData,
} from "../state/features/checkBoxSlice";
import { CheckboxTreeItem } from "./CheckboxTreeItem";
import { useEffect } from "react";
import { checkboxTreeCategories } from "../services/api.service";
import { buildTree } from "../utils";
import { useSelector } from "react-redux";

export function CheckboxTree() {
  const dispatch = useAppDispatch();

  const treeData = useSelector(selectTreeData);
  const checkedItems = useSelector(selectCheckedItems);
  const expandedItems = useSelector(selectExpandedItems);

  useEffect(() => {
    const res = buildTree(checkboxTreeCategories);
    dispatch(setTreeData(res));
  }, []);

  console.log(!!treeData, !!checkedItems, !!expandedItems);

  return (
    <div style={{ margin: 20 }}>
      <CheckboxTreeItem
        treeData={treeData}
        checkedItems={checkedItems}
        expandedItems={expandedItems}
      />
    </div>
  );
}
