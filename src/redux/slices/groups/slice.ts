import { createSlice } from '@reduxjs/toolkit';

export type JiraGroupType = {
  name: string;
};

export interface IJiraGroups {
  groups: JiraGroupType[];
  loading: boolean;
  error: Error | null;
}

const initialState: IJiraGroups = {
  groups: [],
  loading: false,
  error: null,
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setGroups, setLoading, setError } = groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;
