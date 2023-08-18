import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Box, Button, Typography } from '@mui/material';
import { FormInputText } from '../form-components/FormInputText';
import { useForm } from 'react-hook-form';
import './styles.scss';
import { FormInputDate } from '../form-components/FormInputDate';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../../consts';
import { FormInputPassword } from '../form-components/FormInputPassword';
import moment from 'moment';
import { FormInputDropdown } from '../form-components/FormInputDropdown';
import { postcodeValidator } from 'postcode-validator';

// eslint-disable-next-line max-lines-per-function
export const RegistrationForm: React.FC = (): JSX.Element => {
  const { control, handleSubmit, getValues } = useForm();

  return (
    <Box sx={{ maxWidth: '50%', margin: '10rem auto' }}>
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        <h2 className="form-title">Registration Form</h2>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <FormInputText
            name={'name'}
            control={control}
            label={'First Name'}
            rules={{
              required: 'Name is required',
              pattern: { value: /^[a-zA-Z]+$/, message: 'Only letters allowed' },
            }}
          />
          <FormInputText
            name={'surname'}
            control={control}
            label={'Last Name'}
            rules={{
              required: 'Last name is required',
              pattern: { value: /^[a-zA-Z]+$/, message: 'Only letters allowed' },
            }}
          />
          <FormInputText
            name={'email'}
            control={control}
            label={'Email'}
            type="email"
            rules={{
              required: 'Email is required',
              pattern: { value: EMAIL_REGEXP, message: 'Please enter a valid email address' },
            }}
          />
          <FormInputPassword
            name={'password'}
            control={control}
            label={'Password'}
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
          <FormInputDate
            name={'date-of-birth'}
            control={control}
            rules={{
              required: 'Date of Birth is required',
              validate: (value): string | boolean => {
                const selectedDate = moment(value);
                const currentDate = moment();
                const ageDiff = currentDate.diff(selectedDate, 'years');
                if (ageDiff < 13) {
                  return 'You must be at least 13 years old';
                }
                return true;
              },
            }}
          />
          <Typography variant="h6" className="form-subtitle">
            Address
          </Typography>
          <FormInputText
            name={'street'}
            control={control}
            label={'Street'}
            rules={{
              required: 'Street is required',
            }}
          />
          <FormInputText
            name={'city'}
            control={control}
            label={'City'}
            rules={{
              required: 'City is required',
              pattern: { value: /^[a-zA-Z]+$/, message: 'Only letters allowed' },
            }}
          />
          <FormInputDropdown
            name={'country'}
            control={control}
            label={'Country'}
            rules={{ required: 'Country is required' }}
          />
          <FormInputText
            name={'postcode'}
            control={control}
            label={'Postcode'}
            type="text"
            rules={{
              required: 'Postcode is required',
              validate: (value): string | boolean => {
                const country = getValues('country');
                if (!country) return true;
                if (!postcodeValidator(value, country)) {
                  return 'Invalid postcode for provided country';
                }
                return true;
              },
            }}
          />
          <div className="form-btn">
            <Button type="submit" variant="contained">
              Register
            </Button>
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
