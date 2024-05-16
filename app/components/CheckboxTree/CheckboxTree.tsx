import React from "react";
import { Category } from "../../types";
import { TreeNode } from "./TreeNode";

interface CheckboxTreeProps {
  data: Category[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxTree: React.FC<CheckboxTreeProps> = ({
  data,
  onChange,
}) => {
  return data.map((item) => (
    <TreeNode key={item.id} item={item} onChange={onChange} />
  ));
};
