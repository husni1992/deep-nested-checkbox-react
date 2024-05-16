import { Category } from "../types";
import MockResponse from "./mock-response.json";

export const checkboxTreeCategories: Category[] = MockResponse.data
  .categories as Category[];
