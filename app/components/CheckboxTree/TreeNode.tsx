import React, { useState } from "react";
import classNames from "classnames";
import { Category } from "../../types";
import { Checkbox } from "../Checkbox/Checkbox";
import { CheckboxTree } from "./CheckboxTree";
import styles from "./TreeNode.module.css";

interface LeftArrowIcon {
  isExpanded: boolean;
  setExpandedState: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => void;
}
const LeftArrowIcon: React.FC<LeftArrowIcon> = ({
  isExpanded,
  setExpandedState,
}) => (
  <span className={styles.arrowContainer} onClick={setExpandedState}>
    <span
      className={classNames(styles.arrow, { [styles.arrowOpen]: isExpanded })}
    />
  </span>
);

interface TreeNodeProps {
  item: Category;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const TreeNode: React.FC<TreeNodeProps> = ({ item, onChange }) => {
  const [isExpanded, setExpanded] = useState(false);
  const hasChildren = item.children.length > 0;

  const setExpandedState = () => {
    setExpanded(!isExpanded);
  };

  return (
    <>
      <div className={styles.treeNodeHeader}>
        {hasChildren && (
          <LeftArrowIcon
            isExpanded={isExpanded}
            setExpandedState={setExpandedState}
          />
        )}

        <div
          className={classNames({
            [styles.endNode]: !hasChildren || item.isInvalid,
          })}
        >
          <Checkbox
            item={item}
            onChange={onChange}
            onLabelClick={setExpandedState}
          />
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div
          className={classNames(styles.children, {
            [styles.noChildren]: !hasChildren,
          })}
        >
          <CheckboxTree data={item.children} onChange={onChange} />
        </div>
      )}
    </>
  );
};
