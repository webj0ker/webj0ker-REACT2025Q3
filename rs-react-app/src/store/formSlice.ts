import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  terms: boolean;
  image: string;
  country: string;
}

interface FormState {
  uncontrolled: FormData[];
  controlled: FormData[];
}

const initialState: FormState = {
  uncontrolled: [],
  controlled: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUncontrolled(state, action: PayloadAction<FormData>) {
      state.uncontrolled.push(action.payload);
    },
    addControlled(state, action: PayloadAction<FormData>) {
      state.controlled.push(action.payload);
    },
  },
});

export const { addUncontrolled, addControlled } = formSlice.actions;
export default formSlice.reducer;