// This is easy to track down the process with less nodes

const originalNodes = [
  {
    id: "1",
    parent: "0",
    name: "Dames",
  },
  {
    id: "2",
    parent: "1",
    name: "Kleding",
  },
  {
    id: "3",
    parent: "1",
    name: "Accessoires",
  },
  {
    id: "4",
    parent: "0",
    name: "Heren",
  },
  {
    id: "5",
    parent: "4",
    name: "T-shirts",
  },
  {
    id: "6",
    parent: "4",
    name: "Shoes",
  },
  {
    id: "7",
    parent: "1212",
    name: "Shirts",
  },
];

// step 1: convert all nodes to dictionary
const dictionaryOfNodes = {
  "1": {
    id: "1",
    parent: "0",
    name: "Dames",
    children: [],
    isChecked: false,
  },
  "2": {
    id: "2",
    parent: "1",
    name: "Kleding",
    children: [],
    isChecked: false,
  },
  "3": {
    id: "3",
    parent: "1",
    name: "Accessoires",
    children: [],
    isChecked: false,
  },
  "4": {
    id: "4",
    parent: "0",
    name: "Heren",
    children: [],
    isChecked: false,
  },
  "5": {
    id: "5",
    parent: "4",
    name: "T-shirts",
    children: [],
    isChecked: false,
  },
  "6": {
    id: "6",
    parent: "4",
    name: "Shoes",
    children: [],
    isChecked: false,
  },
  "7": {
    id: "7",
    parent: "1212",
    name: "Shirts",
    children: [],
    isChecked: false,
  },
};

// step 2: push each node To It's Parent In Dictionary
const dictionaryWithParent = {
  "1": {
    id: "1",
    parent: "0",
    name: "Dames",
    children: [
      {
        id: "2",
        parent: "1",
        name: "Kleding",
        children: [],
        isChecked: false,
      },
      {
        id: "3",
        parent: "1",
        name: "Accessoires",
        children: [],
        isChecked: false,
      },
    ],
    isChecked: false,
  },
  "2": {
    id: "2",
    parent: "1",
    name: "Kleding",
    children: [],
    isChecked: false,
  },
  "3": {
    id: "3",
    parent: "1",
    name: "Accessoires",
    children: [],
    isChecked: false,
  },
  "4": {
    id: "4",
    parent: "0",
    name: "Heren",
    children: [
      {
        id: "5",
        parent: "4",
        name: "T-shirts",
        children: [],
        isChecked: false,
      },
      {
        id: "6",
        parent: "4",
        name: "Shoes",
        children: [],
        isChecked: false,
      },
    ],
    isChecked: false,
  },
  "5": {
    id: "5",
    parent: "4",
    name: "T-shirts",
    children: [],
    isChecked: false,
  },
  "6": {
    id: "6",
    parent: "4",
    name: "Shoes",
    children: [],
    isChecked: false,
  },
  "7": {
    id: "7",
    parent: "1212",
    name: "Shirts",
    children: [],
    isChecked: false,
  },
};

// step 3: find only root nodes from original nodes using dictionary and parents, flag invalid nodes
const rootsAndInvalidNodesFromOriginal = [
  {
    id: "1",
    parent: "0",
    name: "Dames",
  },
  {
    id: "4",
    parent: "0",
    name: "Heren",
  },
  {
    id: "7",
    parent: "1212",
    name: "Shirts",
    isInvalid: true,
  },
];

// step 4 
const mappedRootNodesFromDictionary = [
  {
    id: "1",
    parent: "0",
    name: "Dames",
    children: [
      {
        id: "2",
        parent: "1",
        name: "Kleding",
        children: [],
        isChecked: false,
      },
      {
        id: "3",
        parent: "1",
        name: "Accessoires",
        children: [],
        isChecked: false,
      },
    ],
    isChecked: false,
  },
  {
    id: "4",
    parent: "0",
    name: "Heren",
    children: [
      {
        id: "5",
        parent: "4",
        name: "T-shirts",
        children: [],
        isChecked: false,
      },
      {
        id: "6",
        parent: "4",
        name: "Shoes",
        children: [],
        isChecked: false,
      },
    ],
    isChecked: false,
  },
  {
    id: "7",
    parent: "1212", // Invalid item
    name: "Shirts",
    children: [],
    isChecked: false,
  },
];
