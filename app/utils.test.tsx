/**
 * @jest-environment jsdom
 */

import mock from "./services/mock-response.json";
import { result } from "./components/test-stub";
import { buildTree } from "./utils";

describe("Tree", () => {
  it("should make tree by flat array", () => {
    expect(buildTree(mock.data.categories)).toEqual(result);
  });
});

export default 1;
