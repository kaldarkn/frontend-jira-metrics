import { createSlice } from '@reduxjs/toolkit';

export type JiraUserType = {
  key: string;
  name: string;
  emailAddress: string;
  displayName: string;
  avatarUrls: {
    '48x48': string;
    '24x24': string;
    '16x16': string;
    '32x32': string;
  };
  active: boolean;
  deleted: boolean;
};

export interface IJiraUsers {
  users: JiraUserType[];
  loading: boolean;
  error: Error | null;
}

const initialState: IJiraUsers = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
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

export const { setUsers, setLoading, setError } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
