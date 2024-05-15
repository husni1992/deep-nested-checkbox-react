import { Category } from "../types";

export function DisplayCheckedCategories({
  categories,
}: {
  categories: Category[];
}) {
  return categories
    .filter((category) => category.isChecked)
    .map((category) => (
      <div key={category.id}>
        <div>{category.name}</div>
        {category.children && (
          <DisplayCheckedCategories categories={category.children} />
        )}
      </div>
    ));
}
