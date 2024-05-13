"use client";

import { Category, CheckboxTreeMetadata } from "../services/api.service";
import { Checkbox } from "./Checkbox";

type CategoryWithChildren = Category & {
  children?: Category[];
};

function arrangeTree(items: CategoryWithChildren[]) {
  function loop(_items: CategoryWithChildren[]): any {
    return _items.map((item, index, fullList) => {
      // if im a child of a parent? then put inside the parent
      const allMyChildren = fullList.filter((m) => m.parent === item.id);

      if (allMyChildren.length) {
        item.children = [...allMyChildren];
        // loop(allMyChildren);
      }

      return item;

      //   allMyChildren.children.push({ ...item });
      //   fullList.splice(index, 1);

      //   if (allMyChildren.children.length > 1) {
      //     return loop(allMyChildren.children);
      //   }
    });
  }

  return loop(items);
}

export function CheckboxTree({ data }: { data: CheckboxTreeMetadata }) {
  const final = arrangeTree(data.categories);
  debugger;
  //   console.log("rearranged", final);

  return (
    <div>
      {data.categories.map((item) => (
        <Checkbox key={item.id} data={item} />
      ))}
    </div>
  );
}
