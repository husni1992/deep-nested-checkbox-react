import { Category } from "./types";

export function buildTree(categories: Category[]): {
  totalCount: number;
  categories: Category[];
} {
  const tree: { [id: string]: Category } = {};

  // Create a dictionary with category ids as keys and initialize children array
  categories.forEach((category) => {
    tree[category.id] = { ...category, children: [] };
  });

  // Populate children arrays
  categories.forEach((category) => {
    const parent = tree[category.parent];
    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }

      parent.children.push(tree[category.id]);
    }
  });

  // Return root categories and categories with invalid parents
  return {
    categories: categories
      .filter((category) => {
        return category.parent === "0" || !tree[category.parent];
      })
      .map((root) => {
        return tree[root.id];
      }),
    totalCount: Object.keys(tree).length,
  };
}
