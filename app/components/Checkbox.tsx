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
  const checkboxBodyClassnames = classNames("checkbox__body", {
    clickable: item.children.length > 0,
  });

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={item.id}
        checked={item.isChecked || false}
        onChange={onChange}
      />
      <label htmlFor={item.id} className="checkbox__checkmark"></label>
      <span className={checkboxBodyClassnames} onClick={onLabelClick}>
        {item.name}
      </span>
    </div>
  );
};
