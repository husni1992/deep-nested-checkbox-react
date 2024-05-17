import { ALLOW_INVALID_ITEMS } from "../config";
import { Category as Node } from "../types";

const ROOT_PARENT_ID_ZERO = "0";

//TODO: Use immutable js for the dictionary

export function buildCheckboxTree(originalNodes: Node[]): {
  totalNodeCount: number;
  categories: Node[];
} {
  const dictionaryOfNodes: { [id: string]: Node } = {};

  // Return root categories and categories with invalid parents
  function checkIfInvalidAndFlagInDictionary(originalNode: Node) {
    if (
      originalNode.parent !== ROOT_PARENT_ID_ZERO &&
      !dictionaryOfNodes[originalNode.parent]
    ) {
      // Make the dictionary node invalid if the parent does not exist in the entire tree.
      dictionaryOfNodes[originalNode.id].isInvalid = true;
    }
  }

  // step 1
  function populateNodesInDictionary() {
    // For each node, populate an item in the dictionary with node id as key and entire node as value, add new property "isChecked:false" and empty children array "children: []""
    originalNodes.forEach((node) => {
      dictionaryOfNodes[node.id] = {
        ...node,
        children: [],
        isChecked: false,
      };
    });
  }

  // step 2
  function pushNodeToItsParentInDictionary() {
    // Loop through all nodes Populate children arrays
    originalNodes.forEach((originalNode) => {
      const parentNodeInDictionary = dictionaryOfNodes[originalNode.parent];
      if (!parentNodeInDictionary) return;

      parentNodeInDictionary.children.push(dictionaryOfNodes[originalNode.id]);
    });
  }

  // step 3
  function findRootNodesFromOriginalNodes() {
    return originalNodes.filter((originalNode) => {
      // TODO: Think of better way, this is a side-effect
      checkIfInvalidAndFlagInDictionary(originalNode);

      return (
        originalNode.parent === ROOT_PARENT_ID_ZERO || // is it a node with parent as 0
        (ALLOW_INVALID_ITEMS && !dictionaryOfNodes[originalNode.parent]) // No parent found
      );
    });
  }

  // step 4
  function mapRootNodesFromDictionary(rootNodes: Node[]) {
    return rootNodes.map((rootNode) => dictionaryOfNodes[rootNode.id]);
  }

  // step 1 ref
  populateNodesInDictionary();

  // step 2 ref
  pushNodeToItsParentInDictionary();

  // step 3 ref
  const rootNodesOfOriginalNodes = findRootNodesFromOriginalNodes();

  // step 4 ref
  const rootNodesOfDictionary = mapRootNodesFromDictionary(
    rootNodesOfOriginalNodes,
  );

  const totalNodeCount = Object.keys(dictionaryOfNodes).length;

  return {
    categories: rootNodesOfDictionary,
    totalNodeCount,
  };
}
