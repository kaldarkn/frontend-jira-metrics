import { call, put, takeLatest } from 'redux-saga/effects';
import { httpClient } from '../../app/services/HttpClient';
import { setGroups, setLoading, setError } from '../../redux/slices/groups/slice';
import { FETCH_GROUPS } from './actions';

function* fetchGroups() {
  try {
    yield put(setLoading());
    const { data } = yield call(httpClient.get, 'JiraGroup');
    yield put(setGroups(data));
  } catch (error) {
    yield put(setError(error));
  }
}

export function* groupsWatcher() {
  yield takeLatest(FETCH_GROUPS.type, fetchGroups);
}
