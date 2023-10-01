import { call, put, takeLatest } from 'redux-saga/effects';
import { httpClient } from '../../app/services/HttpClient';
import { setUserIssues, setLoading, setError } from '../../redux/slices/userIssues/slice';
import {
  FETCH_USER_ISSUES_BY_GROUP,
  FETCH_USER_ISSUES_BY_PROJECT,
  FETCH_USER_ISSUES_BY_USERNAME,
} from './actions';

function* fetchUserIssuesByGroup(action: any) {
  const { groupName, startDate, endDate } = action.payload;
  try {
    yield put(setLoading());
    const { data } = yield call(
      httpClient.get,
      `JiraIssue?groupName=${groupName}&startDate=${startDate}&endDate=${endDate}`,
    );
    yield put(setUserIssues(data));
  } catch (error) {
    yield put(setError(error));
  }
}

function* fetchUserIssuesByProject(action: any) {
  const { projectId, startDate, endDate } = action.payload;
  try {
    yield put(setLoading());
    const { data } = yield call(
      httpClient.get,
      `JiraIssue?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}`,
    );
    yield put(setUserIssues(data));
  } catch (error) {
    yield put(setError(error));
  }
}

function* fetchUserIssuesByUsername(action: any) {
  const { username, startDate, endDate } = action.payload;
  try {
    yield put(setLoading());
    const { data } = yield call(
      httpClient.get,
      `JiraIssue?assignee=${username}&startDate=${startDate}&endDate=${endDate}`,
    );
    yield put(setUserIssues(data));
  } catch (error) {
    yield put(setError(error));
  }
}

export function* userIssuessWatcher() {
  yield takeLatest(FETCH_USER_ISSUES_BY_GROUP.type, fetchUserIssuesByGroup);
  yield takeLatest(FETCH_USER_ISSUES_BY_PROJECT.type, fetchUserIssuesByProject);
  yield takeLatest(FETCH_USER_ISSUES_BY_USERNAME.type, fetchUserIssuesByUsername);
}
