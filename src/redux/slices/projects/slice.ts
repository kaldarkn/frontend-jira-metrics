import { createSlice } from '@reduxjs/toolkit';

export type JiraProjectType = {
  id: string;
  key: string;
  name: string;
  self: string;
};

export interface IJiraProjects {
  projects: JiraProjectType[];
  loading: boolean;
  error: Error | null;
}

const initialState: IJiraProjects = {
  projects: [],
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
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

export const { setProjects, setLoading, setError } = projectsSlice.actions;

export const projectsReducer = projectsSlice.reducer;
