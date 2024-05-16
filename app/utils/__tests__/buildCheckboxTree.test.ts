import { buildCheckboxTree } from "../buildCheckboxTree";
import { Category } from "../../types";
import { processedTree } from "../../test-stubs";
import mock from "../../mocks/mock-data.json";

describe("Build Tree", () => {
  it("should make the checkbox tree from the flat array", () => {
    expect(
      buildCheckboxTree(mock.data.categories as Category[]).categories,
    ).toEqual(processedTree);
  });
});
