import MockResponse from "./mock-response.json";

export type Category = {
  id: string;
  parent: string;
  name: string;
};

export type CheckboxTreeMetadata = {
  categories: Category[];
};

export const checkboxTreeMetadata: CheckboxTreeMetadata = MockResponse.data;
