import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Box, Button, Typography } from '@mui/material';
import { FormInputText } from '../form-components/FormInputText';
import { useForm } from 'react-hook-form';
import './styles.scss';
import { FormInputDate } from '../form-components/FormInputDate';

export const RegistrationForm: React.FC = (): JSX.Element => {
  const { control } = useForm();

  return (
    <Box sx={{ maxWidth: '50%', margin: '10rem auto' }}>
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        <h2 className="form-title">Registration Form</h2>
        <form>
          <FormInputText name={'name'} control={control} label={'First Name'} />
          <FormInputText name={'surname'} control={control} label={'Last Name'} />
          <FormInputText name={'email'} control={control} label={'Email'} type="email" />
          <FormInputText name={'password'} control={control} label={'Password'} type="password" />
          <FormInputDate name={'date-of-birth'} control={control} />
          <Typography variant="h6" className="form-subtitle">
            Address
          </Typography>
          <FormInputText name={'street'} control={control} label={'Street'} />
          <FormInputText name={'city'} control={control} label={'City'} />
          <FormInputText name={'postcode'} control={control} label={'Postcode'} type="number" />
          <FormInputText name={'country'} control={control} label={'Country'} />
          <div className="form-btn">
            <Button variant="contained">Register</Button>
          </div>
          <div className="form-link">
            <Typography variant="body1">Already have an account?&nbsp;</Typography>
            <Link to={'/login'}>
              <Typography variant="body1">Login</Typography>
            </Link>
          </div>
        </form>
      </Paper>
    </Box>
  );
};
