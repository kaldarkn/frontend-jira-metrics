import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { useDispatch } from 'react-redux';
import { groupsReducer } from './slices/groups/slice';
import { projectsReducer } from './slices/projects/slice';
import { usersReducer } from './slices/users/slice';
import { userIssuesReducer } from './slices/userIssues/slice';
import { rootSagaWatcher } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    projects: projectsReducer,
    users: usersReducer,
    userIssues: userIssuesReducer,
  },
  middleware: [sagaMiddleware],
});

//Сага должна зпускаться только после создания store
sagaMiddleware.run(rootSagaWatcher);

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
