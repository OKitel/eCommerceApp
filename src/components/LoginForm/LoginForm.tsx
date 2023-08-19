import React from 'react';
import { Paper, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormInputText } from '../form-components/FormInputText';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginCustomer } from '../../slices/customerSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { EMAIL_REGEXP } from '../../consts';
import './styles.scss';

// eslint-disable-next-line max-lines-per-function
export const LoginForm: React.FC = (): JSX.Element => {
  const { control, handleSubmit } = useForm();
  const progressLogin = useAppSelector((state) => state.customer.progress.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = ({ email, password }: FieldValues): void => {
    const onSuccess = (): void => navigate('/');

    dispatch(loginCustomer({ email, password, onSuccess }));
  };

  return (
    <Box sx={{ width: 'clamp(28rem, calc(100% - 4rem), 40rem)', margin: '10rem auto' }}>
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
          <FormInputText name="password" control={control} label="Password" type="password" />
          <div className="form-btn">
            <LoadingButton loading={progressLogin} className="form-btn" variant="contained" type="submit">
              Login
            </LoadingButton>
          </div>
        </form>
      </Paper>
    </Box>
  );
};
