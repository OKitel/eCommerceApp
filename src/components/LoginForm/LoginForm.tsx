import React from 'react';
import { Paper, Box, Button } from '@mui/material';
import { FormInputText } from '../form-components/FormInputText';
import { FieldValues, useForm } from 'react-hook-form';
import customersService from '../../services/Customers';
import './styles.scss';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../../consts';

// eslint-disable-next-line max-lines-per-function
export const LoginForm: React.FC = (): JSX.Element => {
  const { control, handleSubmit } = useForm();

  const onSubmit = ({ email, password }: FieldValues): void => {
    customersService.loginCustomer(email, password);
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
            <Button className="form-btn" variant="contained" type="submit">
              Login
            </Button>
          </div>
        </form>
      </Paper>
    </Box>
  );
};
