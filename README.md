## Deep Nested Checkbox Tree

This is a Checkbox tree component which will populate by data of nodes.

### Invalid nodes

There can be nodes whose parent is not available. These are considered invalid nodes. By default, you will see the invalid node, but you cannot interact and it's disabled. If you want to hide them, you can configure this setting. Go to `app/config.ts` and turn off `ALLOW_INVALID_ITEMS`.

## Demo

### You can check out the live demo of the project [here](https://husni1992.github.io/deep-nested-checkbox-react/).

### Checklist:

- [x] Expand by clicking on a category name
- [x] Toggle selection on click of any category
- [x] When parent selected, select all children, do toggle for uncheck
- [x] Display list of selected categories to provide user feedback
- [x] Make it mobile friendly
- [x] Instructions in readme
- [x] Make invalid checkbox grey

### Bonus

- [x] Implement select all button
- [x] Clean and concise interface with re-usable components
- [x] Implement testing - Tested core algorithm

### Additional

- [x] Select All and Clear All functionality with disabled state updates

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Step 1: Install packages:

```bash
npm install
```

### Step 2: Run the development server:

```bash
npm run dev
```

#### Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### How to run unit tests

```bash
npm run test
```
