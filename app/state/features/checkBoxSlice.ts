import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Category } from "@/app/types";

// Define a type for the slice state
interface CheckboxTreeState {
  treeData: Category[];
  checkedItems: Record<string, boolean>;
  expandedItems: Record<string, boolean>;
}

// Define the initial state using that type
const initialState: CheckboxTreeState = {
  treeData: [],
  checkedItems: {},
  expandedItems: {},
};

export const checkboxTreeSlice = createSlice({
  name: "checkboxTree",
  initialState,
  reducers: {
    setCheckedItems: (
      state,
      action: PayloadAction<{ id: string; checked: boolean }>,
    ) => {
      const { id, checked } = action.payload;
      state.checkedItems[id] = checked;
    },
    setTreeData: (state, action: PayloadAction<Category[]>) => {
      state.treeData = action.payload;
    },
    setExpandedItems: (
      state,
      action: PayloadAction<{ id: string; expanded: boolean }>,
    ) => {
      const { id, expanded } = action.payload;
      state.expandedItems[id] = expanded;
    },
  },
});

export const { setCheckedItems, setExpandedItems, setTreeData } =
  checkboxTreeSlice.actions;

export const selectTreeData = (state: RootState) => state.checkboxTree.treeData;
export const selectCheckedItems = (state: RootState) =>
  state.checkboxTree.checkedItems;
export const selectExpandedItems = (state: RootState) =>
  state.checkboxTree.expandedItems;

export default checkboxTreeSlice.reducer;
