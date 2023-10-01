import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import Slide, { SlideProps } from '@mui/material/Slide';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

type ErrorMessageType = {
  error: Error;
  visible: boolean;
};

const ErrorMessage = ({ error, visible }: ErrorMessageType) => {
  const [open, setOpen] = useState(visible);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={TransitionLeft}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {`${error.name}:${error.message}`}
      </Alert>
    </Snackbar>
  );
};

export default ErrorMessage;
