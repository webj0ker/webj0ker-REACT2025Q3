import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  name: string;
  description?: string;
}

interface SelectedState {
  items: Item[];
}

const initialState: SelectedState = {
  items: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<Item>) {
      if (!state.items.find((i) => i.name === action.payload.name)) {
        state.items.push(action.payload);
      }
    },
    unselectItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.name !== action.payload);
    },
    unselectAll(state) {
      state.items = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAll } = selectedSlice.actions;
export default selectedSlice.reducer;
