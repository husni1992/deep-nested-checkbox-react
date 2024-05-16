import React, { useState } from "react";
import classNames from "classnames";
import { Category } from "../../types";
import { Checkbox } from "../Checkbox/Checkbox";
import { CheckboxTree } from "./CheckboxTree";
import styles from "./TreeNode.module.css";

interface TreeNodeProps {
  item: Category;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ item, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children.length > 0;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.treeNodeHeader}>
        {hasChildren && (
          <span
            className={classNames(styles.arrow, { [styles.arrowOpen]: isOpen })}
            onClick={handleToggle}
          />
        )}

        <div
          className={classNames({
            [styles.endNode]: !hasChildren,
            [styles.invalidNode]: item.isInvalid,
          })}
        >
          <Checkbox
            item={item}
            onChange={onChange}
            onLabelClick={handleToggle}
          />
        </div>
      </div>
      {hasChildren && isOpen && (
        <div
          className={classNames(styles.treeNodeChildren, {
            [styles.noChildren]: !hasChildren,
          })}
        >
          <CheckboxTree data={item.children} onChange={onChange} />
        </div>
      )}
    </>
  );
};
