import React from 'react';
import { Paper, Box, Button } from '@mui/material';
import { FormInputText } from '../form-components/FormInputText';
import { useForm } from 'react-hook-form';
import customersService from '../../services/Customers';
import './styles.scss';

interface IFormLogin {
  email: string;
  password: string;
}

export const LoginForm: React.FC = (): JSX.Element => {
  const { control, handleSubmit } = useForm<IFormLogin>({ defaultValues: { email: '', password: '' } });

  const onSubmit = ({ email, password }: IFormLogin): void => {
    customersService.loginCustomer(email, password);
  };

  return (
    <Box sx={{ width: 'clamp(28rem, calc(100% - 4rem), 40rem)', margin: '10rem auto' }}>
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        <h2 className="form-title">Login Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInputText name="email" control={control} label="Email" type="email" />
          <FormInputText name="password" control={control} label="Password" type="password" />
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
