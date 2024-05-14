"use client";

import { Checkbox } from "./Checkbox";

export function CheckboxTreeItem({
  treeData,
  checkedItems,
  expandedItems,
}: any) {
  
  return (
    <div style={{ margin: 20 }}>
      {treeData.map((item: any) => {
        if (item.children && item.children.length > 0) {
          return (
            <details open={false} key={item.id}>
              <summary>
                <Checkbox
                  data={item}
                  checkedItems={checkedItems}
                  expandedItems={expandedItems}
                />
              </summary>

              <div style={{ marginLeft: 10 }}>
                <CheckboxTreeItem treeData={item.children} />
              </div>
            </details>
          );
        }

        return (
          <Checkbox
            key={item.id}
            data={item}
            checkedItems={checkedItems}
            expandedItems={expandedItems}
          />
        );
      })}
    </div>
  );
}
