import { Category } from "../types";
import MockResponse from "./mock-data.json";

export const fetchCheckboxTreeCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MockResponse.data.categories as Category[]);
    });
  });
};
