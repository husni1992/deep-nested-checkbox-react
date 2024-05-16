import classNames from "classnames";
import { Category } from "../types";
import "./Checkbox.css";

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
  const checkboxLabelClassnames = classNames("checkbox__label", {
    clickable: item.children.length > 0,
    invalid: item.isInvalid,
  });

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={item.id}
        checked={item.isChecked}
        onChange={onChange}
        disabled={item.isInvalid}
      />
      <label
        htmlFor={item.id}
        className={classNames("checkbox__checkmark", {
          invalid: item.isInvalid,
        })}
      ></label>
      <span className={checkboxLabelClassnames} onClick={onLabelClick}>
        {item.name}
      </span>
    </div>
  );
};
