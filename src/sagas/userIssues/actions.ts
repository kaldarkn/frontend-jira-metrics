import { createAction } from '@reduxjs/toolkit';

export const FETCH_USER_ISSUES_BY_GROUP = createAction(
  'userIssues/fetchUserIssuesByGroup',
  (groupName: string, startDate: string, endDate: string) => ({
    payload: { groupName, startDate, endDate },
  }),
);

export const FETCH_USER_ISSUES_BY_PROJECT = createAction(
  'userIssues/fetchUserIssuesByProject',
  (projectId: string, startDate: string, endDate: string) => ({
    payload: { projectId, startDate, endDate },
  }),
);

export const FETCH_USER_ISSUES_BY_USERNAME = createAction(
  'userIssues/fetchUserIssuesByUsername',
  (username: string, startDate: string, endDate: string) => ({
    payload: { username, startDate, endDate },
  }),
);
