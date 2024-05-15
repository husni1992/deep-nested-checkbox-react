import { Category } from "../types";
import "./Checkbox.css";

interface CheckboxProps {
  item: Category;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ item, onChange }) => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={item.id}
        checked={item.isChecked || false}
        onChange={onChange}
      />
      <label htmlFor={item.id} className="checkbox__checkmark"></label>
      <span className="checkbox__body">{item.name}</span>
    </div>
  );
};
