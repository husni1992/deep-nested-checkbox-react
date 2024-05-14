"use client";

import { Category } from "../types";

type Props = {
  data: Category;
  checkedItems: Record<keyof Category, any>;
  expandedItems: Record<keyof Category, any>;
};

export function Checkbox({ data, checkedItems, expandedItems }: Props) {
  // const dispatch = useAppDispatch();

  function isChecked(): boolean {
    return !!checkedItems[data.id as keyof Category];
  }

  // console.log(treeData, x, y);

  return (
    <>
      <input
        type="checkbox"
        checked={isChecked()}
        id={data.id}
        value={data.id}
        onChange={() => {}}
        style={{ marginRight: 5 }}
      />
      <label>{data.name}</label>
    </>
  );
}
