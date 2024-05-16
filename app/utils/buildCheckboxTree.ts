import { ALLOW_INVALID_ITEMS } from "../config";
import { Category as Node } from "../types";

const ROOT_PARENT_ID_ZERO = "0";

//TODO: Use immutable js for the dictionary

export function buildCheckboxTree(originalNodes: Node[]): {
  totalNodeCount: number;
  categories: Node[];
} {
  const dictionaryOfNodes: { [id: string]: Node } = {};

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
    originalNodes.forEach((node) => {
      const parentNode = dictionaryOfNodes[node.parent];
      if (!parentNode) return;

      if (!parentNode.children) {
        parentNode.children = [];
      }

      parentNode.children.push(dictionaryOfNodes[node.id]);
    });
  }

  // Return root categories and categories with invalid parents
  function checkIfInvalidAndFlag(node: Node) {
    if (
      node.parent !== ROOT_PARENT_ID_ZERO &&
      !dictionaryOfNodes[node.parent]
    ) {
      // Make the node invalid if the parent does not exist in the entire tree.
      node.isInvalid = true;
    }
  }

  // step 3
  function findRootNodesFromOriginalNodes() {
    return originalNodes.filter((node) => {
      // Think of better way, this is a side-effect
      checkIfInvalidAndFlag(node);

      return (
        // is it a node with parent as 0
        node.parent === ROOT_PARENT_ID_ZERO ||
        // is parent does not exist in the nodes
        (ALLOW_INVALID_ITEMS && !dictionaryOfNodes[node.parent])
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
