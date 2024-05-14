"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./state/hooks";
import {
  increment,
  decrement,
  selectCheckedItems,
} from "./state/features/checkBoxSlice";

export function Counter() {
  const dispatch = useDispatch();
  const count = useAppSelector(selectCheckedItems);

  useEffect(() => {
    dispatch(decrement());
  }, []);

  // return <CheckboxTree treeData={organizedTree} />;
  return <div>{count}</div>;
}
