import { call, put, takeLatest } from 'redux-saga/effects';
import { httpClient } from '../../app/services/HttpClient';
import { setUsers, setLoading, setError } from '../../redux/slices/users/slice';
import { FETCH_USERS } from './actions';

function* fetchUsers() {
  try {
    yield put(setLoading());
    const { data } = yield call(httpClient.get, 'JiraUser');
    yield put(setUsers(data));
  } catch (error) {
    yield put(setError(error));
  }
}

export function* usersWatcher() {
  yield takeLatest(FETCH_USERS.type, fetchUsers);
}
