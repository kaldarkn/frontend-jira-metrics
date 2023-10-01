import { Stack } from '@mui/system';
import { Typography, Button } from '@mui/material';
import { SentimentVeryDissatisfied as SmileIcon, Home as HomeIcon } from '@mui/icons-material';
import CustomLink from '../components/CustomLink';

const NotFound = () => {
  return (
    <Stack alignItems="center">
      <Typography color="info.dark" fontSize={130}>
        4<SmileIcon sx={{ fontSize: 100 }} />4
      </Typography>
      <Button variant="outlined" startIcon={<HomeIcon />}>
        <CustomLink to="/">Go Home</CustomLink>
      </Button>
    </Stack>
  );
};

export default NotFound;
