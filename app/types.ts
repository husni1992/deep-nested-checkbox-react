export interface Category {
  id: string;
  parent: string;
  name: string;
  children: Category[];
  isChecked: boolean;
  isInvalid: boolean;
}
