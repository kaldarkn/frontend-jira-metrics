import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/system';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Paper, Autocomplete, TextField, Button, Typography } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import CustomDatePicker from '../components/CustomDatePicker';

import { RootState, useAppDispatch } from '../../redux/store';
import { JiraGroupType } from '../../redux/slices/groups/slice';
import { FETCH_GROUPS } from '../../sagas/groups/actions';
import { FETCH_USER_ISSUES_BY_GROUP } from '../../sagas/userIssues/actions';
import { FETCH_USERS } from '../../sagas/users/actions';
import { setUserIssues } from '../../redux/slices/userIssues/slice';
import { CalculateAverageDeviation } from '../services/CalculateAverageDeviation';
import ErrorMessage from '../components/ErrorMessage';

type TaskTimeDiscrepanciesType = {
  displayName: string;
  numberOfTasks: number;
  averageDeviation: number;
  name: string;
};

const TaskTimeDiscrepanciesInGroups = () => {
  const [requestParams, setRequestParams] = useState({ groupName: '', startDate: '', endDate: '' });
  const [group, setGroup] = useState<JiraGroupType | null>(null);
  const [calculateData, setCalculateData] = useState<TaskTimeDiscrepanciesType[]>([]);
  const { groups, userIssues } = useSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FETCH_GROUPS());
    dispatch(FETCH_USERS());
    dispatch(setUserIssues({}));
  }, []);

  useEffect(() => {
    group &&
      setRequestParams((prevRequestParams) => ({ ...prevRequestParams, groupName: group.name }));
  }, [group]);

  useEffect(() => {
    setCalculateData([]);

    userIssues.userIssues.forEach((user) => {
      setCalculateData((prevState) => [
        ...prevState,
        {
          displayName: user.value.assignee.displayName,
          numberOfTasks: user.value.issues.length,
          averageDeviation: CalculateAverageDeviation(user.value.issues),
          name: user.value.assignee.name,
        },
      ]);
    });
  }, [userIssues]);

  return (
    <Stack flexDirection="column" alignItems="center">
      {userIssues.error && <ErrorMessage error={userIssues.error} visible={!!userIssues.error} />}
      {groups.error && <ErrorMessage error={groups.error} visible={!!groups.error} />}
      <Typography variant="h3" component="h1" marginBottom={8}>
        Task time discrepancies in groups
      </Typography>
      <Stack flexDirection="row" justifyContent="center" alignItems="center">
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <Autocomplete
            isOptionEqualToValue={(option: JiraGroupType, value: JiraGroupType) =>
              option.name === value.name
            }
            value={group}
            onChange={(event, selectedGroup) => {
              setGroup(selectedGroup);
              dispatch(setUserIssues({}));
            }}
            disabled={groups.loading}
            id="combo-box-groups"
            options={groups.groups}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Departments" />}
          />
          <CustomDatePicker
            label="Start date"
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
                FETCH_USER_ISSUES_BY_GROUP(
                  requestParams.groupName,
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
      <TableContainer component={Paper} sx={{ minWidth: 880, maxWidth: 1000, marginTop: 8 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Assignee</TableCell>
              <TableCell align="right">Number of tasks</TableCell>
              <TableCell align="right">Average deviation, %</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calculateData.map((data) => (
              <TableRow key={data.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {data.displayName}
                </TableCell>
                <TableCell align="right">{data.numberOfTasks}</TableCell>
                <TableCell align="right">{data.averageDeviation}</TableCell>
                <TableCell align="right">
                  <Link
                    to={`/UserTaskTimeDiscrepancies?username=${data.name}&startDate=${requestParams.startDate}&endDate=${requestParams.endDate}`}>
                    more
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default TaskTimeDiscrepanciesInGroups;
