import { Category } from "../types";

function updateNodeAndNestedChildren(
  category: Category,
  isChecked: boolean,
): Category {
  return {
    ...category,
    isChecked,
    children: category.children.map((child) =>
      updateNodeAndNestedChildren(child, isChecked),
    ),
  };
}

export function updateNodeSelections(
  categories: Category[],
  id: string,
  isChecked: boolean,
  applyToAllNodes = false,
): Category[] {
  return categories.map((category) => {
    // If the node found, apply isChecked to parent and every children
    if (category.id === id || applyToAllNodes) {
      return updateNodeAndNestedChildren(category, isChecked);
    }

    // If not loop through it's children and try to find the node
    if (category.children.length > 0) {
      return {
        ...category,
        children: updateNodeSelections(category.children, id, isChecked),
      };
    }

    return category;
  });
}

export function getSelectedCategoryNames(categories: Category[]): string[] {
  return categories.reduce((selected: string[], category: Category) => {
    // Pick only categories, which has children
    if (category.isChecked && category.children.length > 0) {
      selected.push(category.name);
    }

    if (category.children.length > 0) {
      selected.push(...getSelectedCategoryNames(category.children));
    }
    return selected;
  }, []);
}

// Can use reducer here as well
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
