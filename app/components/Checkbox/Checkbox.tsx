import React from "react";
import classNames from "classnames";
import { Category } from "../../types";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  item: Category;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLabelClick: React.MouseEventHandler<HTMLSpanElement>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  item,
  onChange,
  onLabelClick,
}) => {
  const checkboxLabelClassnames = classNames(styles.checkboxLabel, {
    [styles.clickable]: item.children.length > 0,
    [styles.invalid]: item.isInvalid,
  });

  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        id={item.id}
        checked={item.isChecked && !item.isInvalid}
        onChange={onChange}
        disabled={item.isInvalid}
      />

      <label
        htmlFor={item.id}
        className={classNames(styles.checkboxCheckmark, {
          [styles.invalid]: item.isInvalid,
        })}
      ></label>

      <span className={checkboxLabelClassnames} onClick={onLabelClick}>
        {item.name}
      </span>
    </div>
  );
};
