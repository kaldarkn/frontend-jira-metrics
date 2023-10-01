import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { Stack } from '@mui/system';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Paper, Autocomplete, TextField, Button, Typography, Avatar, Box } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import CustomDatePicker from '../components/CustomDatePicker';

import { RootState, useAppDispatch } from '../../redux/store';
import { FETCH_USER_ISSUES_BY_USERNAME } from '../../sagas/userIssues/actions';
import { FETCH_USERS } from '../../sagas/users/actions';
import { JiraUserType } from '../../redux/slices/users/slice';
import { environment } from '../environment';
import { setUserIssues } from '../../redux/slices/userIssues/slice';
import { CalculateAverageDeviation } from '../services/CalculateAverageDeviation';
import ErrorMessage from '../components/ErrorMessage';

const UserTaskTimeDiscrepancies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const username = searchParams.get('username');

  const [requestParams, setRequestParams] = useState({
    username: username || '',
    startDate: startDate || '',
    endDate: endDate || '',
  });

  const { users, userIssues } = useSelector((state: RootState) => state);
  const [user, setUser] = useState<JiraUserType | null>(
    users.users.find((item) => item.name === username) || null,
  );

  const dispatch = useAppDispatch();

  //Выполняется только при первом рендере
  useEffect(() => {
    //Делааем запрос на получение списка пользователей
    dispatch(FETCH_USERS());

    //Если переданы search параметры, то сразу делаем запрос
    (username &&
      startDate &&
      endDate &&
      dispatch(
        FETCH_USER_ISSUES_BY_USERNAME(
          requestParams.username,
          requestParams.startDate,
          requestParams.endDate,
        ),
      )) ||
      dispatch(setUserIssues({}));
  }, []);

  //После получения списка пользователей, если есть параметр запроса username, то из списка выбираем его
  useEffect(() => {
    username && setUser(users.users.find((item) => item.name === username) || null);
  }, [users]);

  //при каждом выборе пользователя, в параметры запроса добавляем его поле name
  useEffect(() => {
    user &&
      setRequestParams((prevRequestParams) => ({ ...prevRequestParams, username: user.name }));
  }, [user]);

  //При изменении параметров запроса, добавляем параметры запроса в URL страницы
  useEffect(() => {
    setSearchParams(requestParams);
  }, [requestParams]);

  return (
    <Stack flexDirection="column" alignItems="center">
      {userIssues.error && <ErrorMessage error={userIssues.error} visible={!!userIssues.error} />}
      {users.error && <ErrorMessage error={users.error} visible={!!users.error} />}
      <Typography variant="h3" component="h1" marginBottom={8}>
        User task time discrepancies
      </Typography>
      <Stack flexDirection="row" justifyContent="center" alignItems="center" marginBottom={8}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <Autocomplete
            isOptionEqualToValue={(option: JiraUserType, value: JiraUserType) =>
              option.key === value.key
            }
            value={user}
            onChange={(event, selectedUser) => {
              setUser(selectedUser);
              dispatch(setUserIssues({}));
            }}
            disabled={users.loading}
            id="combo-box-users"
            options={users.users}
            getOptionLabel={(option) => option.displayName}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Users" />}
          />
          <CustomDatePicker
            label="Start date"
            value={searchParams.get('startDate') || undefined}
            onChange={(selectDate) => {
              setRequestParams((prevRequestParams) => ({
                ...prevRequestParams,
                startDate: selectDate,
              }));
              dispatch(setUserIssues({}));
            }}
          />
          <CustomDatePicker
            label="End date"
            value={searchParams.get('endDate') || undefined}
            onChange={(selectDate) => {
              setRequestParams((prevRequestParams) => ({
                ...prevRequestParams,
                endDate: selectDate,
              }));
              dispatch(setUserIssues({}));
            }}
          />
          <Button
            onClick={() =>
              dispatch(
                FETCH_USER_ISSUES_BY_USERNAME(
                  requestParams.username,
                  requestParams.startDate,
                  requestParams.endDate,
                ),
              )
            }
            variant="contained"
            startIcon={<CalculateIcon />}>
            {userIssues.loading ? 'Loading' : 'Calculate'}
          </Button>
        </DemoContainer>
      </Stack>
      {user?.name && (
        <Stack flexDirection="row" alignItems="center" marginBottom={8}>
          <Avatar
            alt={user?.displayName}
            src={user?.avatarUrls['48x48']}
            sx={{ width: 150, height: 150 }}
          />

          <Box marginLeft={2}>
            <Typography variant="h4" component="h1">
              {user?.displayName}
            </Typography>
            <Typography variant="overline" component="h6">
              Tasks completed:
              <strong style={{ marginLeft: 10 }}>
                {
                  userIssues.userIssues.find((issue) => issue.key === user?.name)?.value.issues
                    .length
                }
              </strong>
            </Typography>
            <Typography variant="overline" component="h6">
              Average deviation:{' '}
              <strong style={{ marginLeft: 10 }}>
                {(userIssues.userIssues.length &&
                  `${CalculateAverageDeviation(userIssues.userIssues[0].value.issues)} %`) ||
                  ''}
              </strong>
            </Typography>
          </Box>
        </Stack>
      )}

      <TableContainer component={Paper} sx={{ minWidth: 880, maxWidth: 1200 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Issue</TableCell>
              <TableCell align="right">Time original estimate, h</TableCell>
              <TableCell align="right">Time spent, h</TableCell>
              <TableCell align="right">Deviation, %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userIssues.userIssues.map((user) =>
              user.value.issues.map((issue) => (
                <TableRow key={issue.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Link to={`${environment.jiraHost}browse/${issue.key}?jql=`}>
                      {issue.summary}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {+(issue.timeOriginalEstimate / 3600).toFixed(1)}
                  </TableCell>
                  <TableCell align="right">{+(issue.timeSpent / 3600).toFixed(1)}</TableCell>
                  <TableCell align="right">
                    {
                      +Math.abs(
                        ((issue.timeSpent - issue.timeOriginalEstimate) /
                          issue.timeOriginalEstimate) *
                          100,
                      ).toFixed(1)
                    }
                  </TableCell>
                </TableRow>
              )),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default UserTaskTimeDiscrepancies;
