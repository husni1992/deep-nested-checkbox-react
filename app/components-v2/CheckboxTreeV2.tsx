import React, { useEffect, useState } from "react";
import { Category } from "../types";
import { Checkbox } from "./Checkbox";
import "./CheckboxTree.css";

interface TreeNodeProps {
  item: Category;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ item, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children.length > 0;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="tree-node">
      <div className="tree-node-header">
        {hasChildren && (
          <span
            className={`arrow ${isOpen ? "open" : ""}`}
            onClick={handleToggle}
          ></span>
        )}

        <Checkbox item={item} onChange={onChange} onLabelClick={handleToggle} />
      </div>
      {hasChildren && isOpen && (
        <div className="tree-node-children no-children">
          <CheckboxTreeV2 data={item.children} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

interface CheckboxTreeProps {
  data: Category[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxTreeV2 = ({ data, onChange }: CheckboxTreeProps) => {
  return (
    <div className="checkbox-tree">
      {data.map((item) => (
        <TreeNode key={item.id} item={item} onChange={onChange} />
      ))}
    </div>
  );
};
