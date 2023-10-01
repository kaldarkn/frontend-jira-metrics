import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Issue = {
  id: string;
  self: string;
  key: string;
  summary: string;
  description: string;
  timeSpent: number;
  timeOriginalEstimate: number;
};

type UserIssues = {
  assignee: {
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
  issues: Array<Issue>;
};

type UserIssuesData = {
  [key: string]: UserIssues;
};

type UserIssueObject = {
  key: string;
  value: UserIssues;
};

type UserIssueState = {
  userIssues: Array<UserIssueObject>;
  loading: boolean;
  error: Error | null;
};

const initialState: UserIssueState = {
  userIssues: [],
  loading: false,
  error: null,
};

const userIssuesSlice = createSlice({
  name: 'userIssues',
  initialState,
  reducers: {
    setUserIssues: (state, action: PayloadAction<UserIssuesData>) => {
      const userIssues = Object.entries(action.payload).map(([key, value]) => ({
        key,
        value,
      }));
      state.userIssues = userIssues;
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

export const { setUserIssues, setLoading, setError } = userIssuesSlice.actions;

export const userIssuesReducer = userIssuesSlice.reducer;
