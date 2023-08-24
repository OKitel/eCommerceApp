/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { Paper, Box, Typography, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormInputText } from '../form-components/FormInputText';
import { FormInputPassword } from '../form-components/FormInputPassword';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginCustomer } from '../../slices/customer/slice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../../consts';
import { setAlert } from '../../slices/alerts/slice';
import './styles.scss';

export const LoginForm: React.FC = (): JSX.Element => {
  const { control, handleSubmit } = useForm();
  const customerData = useAppSelector((state) => state.customer.customerData);
  const progressIntrospect = useAppSelector((state) => state.customer.progress.introspect);
  const progressLogin = useAppSelector((state) => state.customer.progress.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (customerData) {
      navigate('/');
    }
  }, [customerData, navigate]);

  const onSubmit = ({ email, password }: FieldValues): void => {
    const onSuccess = (): void => {
      dispatch(setAlert({ message: 'You have successfully logged in!', severity: 'success' }));
      navigate('/');
    };
    const onError = (errorMessage: string): void => {
      dispatch(setAlert({ message: `Oops! Login failed. ${errorMessage}`, severity: 'error' }));
    };

    dispatch(loginCustomer({ email, password, onSuccess, onError }));
  };

  const renderProgress = (): React.ReactElement => (
    <Box textAlign={'center'}>
      <CircularProgress />
    </Box>
  );

  const renderForm = (): React.ReactElement => (
    <Paper elevation={3} sx={{ padding: '2rem' }}>
      <h2 className="form-title">Login Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
        <FormInputPassword
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
          <LoadingButton
            loading={progressLogin}
            className="form-btn"
            variant="contained"
            type="submit"
            data-testid="submit-btn"
          >
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
  );

  return <Box className="form-box">{progressIntrospect ? renderProgress() : renderForm()}</Box>;
};
