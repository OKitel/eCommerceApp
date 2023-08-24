import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import { clearAlert } from '../../slices/alerts/slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type TransitionProps = Omit<SlideProps, 'direction'>;

const TransitionDown = (props: TransitionProps): JSX.Element => {
  return <Slide {...props} direction="down" />;
};

export const AlertsSnackbar: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.alerts.alert);

  return (
    <Snackbar
      sx={{ whiteSpace: 'pre-line' }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={alert?.isShow}
      autoHideDuration={6000}
      onClose={(): void => {
        dispatch(clearAlert());
      }}
      TransitionComponent={TransitionDown}
    >
      <Alert
        severity={alert?.severity}
        onClose={(): void => {
          dispatch(clearAlert());
        }}
      >
        {alert?.message}
      </Alert>
    </Snackbar>
  );
};
