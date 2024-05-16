import { ALLOW_INVALID_ITEMS } from "../config";
import { Category } from "../types";

export function buildCheckboxTree(categories: Category[]): {
  totalCount: number;
  categories: Category[];
} {
  const tree: { [id: string]: Category } = {};

  // Create a dictionary with category ids as keys and initialize default isChecked value and children array
  categories.forEach((category) => {
    tree[category.id] = { ...category, children: [], isChecked: false };
  });

  // Populate children arrays
  categories.forEach((category) => {
    const parent = tree[category.parent];
    if (!parent) return;

    if (!parent.children) {
      parent.children = [];
    }

    parent.children.push(tree[category.id]);
  });

  function isRootCategory(category: Category): boolean {
    return (
      category.parent === "0" || (ALLOW_INVALID_ITEMS && !tree[category.parent])
    );
  }

  // Return root categories and categories with invalid parents
  return {
    categories: categories
      .filter((category) => {
        if (category.parent !== "0" && !tree[category.parent]) {
          category.isInvalid = true;
        }

        return isRootCategory(category);
      })
      .map((root) => {
        return tree[root.id];
      }),
    totalCount: Object.keys(tree).length,
  };
}
