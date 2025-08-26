import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialCountries: string[] = [
  'Russia',
  'USA',
  'Germany',
  'France',
  'China',
  'Japan',
  'Brazil',
  'India',
  'Canada',
  'Australia',
];

const countriesSlice = createSlice({
  name: 'countries',
  initialState: initialCountries,
  reducers: {
    setCountries(_state, action: PayloadAction<string[]>) {
      return action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
