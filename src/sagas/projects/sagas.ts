import { call, put, takeLatest } from 'redux-saga/effects';
import { httpClient } from '../../app/services/HttpClient';
import { setProjects, setLoading, setError } from '../../redux/slices/projects/slice';
import { FETCH_PROJECTS } from './actions';

function* fetchProjects() {
  try {
    yield put(setLoading());
    const { data } = yield call(httpClient.get, 'JiraProject');
    yield put(setProjects(data));
  } catch (error) {
    yield put(setError(error));
  }
}

export function* projectsWatcher() {
  yield takeLatest(FETCH_PROJECTS.type, fetchProjects);
}
