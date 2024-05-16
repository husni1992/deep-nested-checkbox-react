import mock from "./services/mock-response.json";

import { buildTree } from "./utils";
import { Category } from "./types";
import { result } from "./test-stubs/test-stub";

describe("Build Tree", () => {
  it("should make the checkbox tree from the flat array", () => {
    expect(buildTree(mock.data.categories as Category[]).categories).toEqual(
      result,
    );
  });
});
