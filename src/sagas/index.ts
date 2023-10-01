import { all } from 'redux-saga/effects';
import { groupsWatcher } from './groups/sagas';
import { projectsWatcher } from './projects/sagas';
import { usersWatcher } from './users/sagas';
import { userIssuessWatcher } from './userIssues/sagas';

export function* rootSagaWatcher() {
  yield all([groupsWatcher(), projectsWatcher(), usersWatcher(), userIssuessWatcher()]);
}
