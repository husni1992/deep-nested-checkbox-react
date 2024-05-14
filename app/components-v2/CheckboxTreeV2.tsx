import React from "react";
import { Category } from "../types";

interface CheckboxTreeProps {
  data: Category[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxTreeV2 = ({ data, onChange }: CheckboxTreeProps) => {
  return (
    <div>
      {data.map((item) => {
        if (item.children.length > 0) {
          return (
            <details key={item.id}>
              <summary>
                <input
                  type="checkbox"
                  id={item.id}
                  value={item.id}
                  checked={!!item.isChecked}
                  onChange={onChange}
                  style={{ marginRight: 5 }}
                />
                <label htmlFor={item.id}>{item.name}</label>
              </summary>

              <div style={{ marginLeft: 20 }}>
                <CheckboxTreeV2 data={item.children} onChange={onChange} />
              </div>
            </details>
          );
        } else {
          return (
            <div key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                checked={!!item.isChecked}
                onChange={onChange}
                style={{ marginRight: 5 }}
              />
              <label htmlFor={item.id}>{item.name}</label>
            </div>
          );
        }
      })}
    </div>
  );
};
