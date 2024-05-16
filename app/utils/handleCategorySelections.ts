import { Category } from "../types";

function updateCategory(category: Category, isChecked: boolean): Category {
  return {
    ...category,
    isChecked,
    children: category.children.map((child) =>
      updateCategory(child, isChecked),
    ),
  };
}

export function updateCategories(
  categories: Category[],
  id: string,
  isChecked: boolean,
  applyToAllItems = false,
): Category[] {
  return categories.map((category) => {
    if (category.id === id || applyToAllItems) {
      return updateCategory(category, isChecked);
    } else if (category.children.length > 0) {
      return {
        ...category,
        children: updateCategories(category.children, id, isChecked),
      };
    }
    return category;
  });
}

export function getSelectedCategories(categories: Category[]): string[] {
  return categories.reduce((selected: string[], category) => {
    // Pick only categories, which does have children
    if (category.isChecked && category.children.length) {
      selected.push(category.name);
    }

    if (category.children.length > 0) {
      selected.push(...getSelectedCategories(category.children));
    }
    return selected;
  }, []);
}

export function getCheckedNodeCount(categories: Category[]): number {
  let count = 0;
  categories.forEach((category) => {
    if (category.isChecked) {
      count++;
    }
    if (category.children.length > 0) {
      count += getCheckedNodeCount(category.children);
    }
  });
  return count;
}
