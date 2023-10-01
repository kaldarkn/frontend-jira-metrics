import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const Home = () => {
  return (
    <Typography variant="h2" component="h1" color="info.dark" align="center">
      <strong>Jira Metrics</strong> - metrics app from Jira Server
      <Stack direction="row" spacing={2} justifyContent="center" marginTop={10}>
        <QueryStatsIcon sx={{ width: 500, height: 500 }} />
      </Stack>
    </Typography>
  );
};

export default Home;
