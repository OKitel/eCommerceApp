import React, { useState } from 'react';
import { Paper, Box, Snackbar, Alert, SlideProps, Slide, Typography, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormInputText } from '../form-components/FormInputText';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginCustomer } from '../../slices/customerSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../../consts';
import './styles.scss';

type TransitionProps = Omit<SlideProps, 'direction'>;

const TransitionDown = (props: TransitionProps): JSX.Element => {
  return <Slide {...props} direction="down" />;
};

// eslint-disable-next-line max-lines-per-function
export const LoginForm: React.FC = (): JSX.Element => {
  const { control, handleSubmit } = useForm();
  const progressIntrospect = useAppSelector((state) => state.customer.progress.introspect);
  const progressLogin = useAppSelector((state) => state.customer.progress.login);
  const errorMessage = useAppSelector((state) => state.customer.errorMessage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoginError, setIsLoginError] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleCloseSnackbar = (_?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    setIsLoginError(false);
    setIsLoginSuccess(false);
  };

  const onSubmit = ({ email, password }: FieldValues): void => {
    const onSuccess = (): void => {
      setIsLoginError(false);
      setIsLoginSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    };
    const onError = (): void => {
      setIsLoginError(true);
      setIsLoginSuccess(false);
    };

    dispatch(loginCustomer({ email, password, onSuccess, onError }));
  };

  return (
    <>
      <Snackbar
        sx={{ whiteSpace: 'pre-line' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isLoginError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        TransitionComponent={TransitionDown}
      >
        <Alert severity="error" onClose={(): void => setIsLoginError(false)}>
          {`Oops! Login failed.\n${errorMessage}`}
        </Alert>
      </Snackbar>

      <Snackbar
        sx={{ whiteSpace: 'pre-line' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isLoginSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        TransitionComponent={TransitionDown}
      >
        <Alert severity="success" onClose={(): void => setIsLoginSuccess(false)}>
          {'You have successfully logged in!\nWe are now redirecting you to the main page...'}
        </Alert>
      </Snackbar>
      <Box sx={{ width: 'clamp(28rem, calc(100% - 4rem), 40rem)', margin: '10rem auto' }}>
        {progressIntrospect ? (
          <Box textAlign={'center'}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper elevation={3} sx={{ padding: '2rem' }}>
            <h2 className="form-title">Login Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInputText
                name="email"
                control={control}
                label="Email"
                type="email"
                rules={{
                  required: 'Email is required',
                  pattern: { value: EMAIL_REGEXP, message: 'Please enter a valid email address' },
                }}
              />
              <FormInputText
                name="password"
                control={control}
                label="Password"
                type="password"
                rules={{
                  required: 'Password is required',
                  pattern: {
                    value: PASSWORD_REGEXP,
                    message:
                      'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
                  },
                }}
              />
              <div className="form-btn">
                <LoadingButton loading={progressLogin} className="form-btn" variant="contained" type="submit">
                  Login
                </LoadingButton>
              </div>
              <div className="form-link">
                <Typography variant="body1">Don't have an account yet?&nbsp;</Typography>
                <Link to={'/registration'}>
                  <Typography variant="body1">Register</Typography>
                </Link>
              </div>
            </form>
          </Paper>
        )}
      </Box>
    </>
  );
};
