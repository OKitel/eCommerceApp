import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Paper, Box, Typography, Divider } from '@mui/material';
import { useForm, FieldValues } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';

import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../../consts';
import { RegistrationRequest } from '../../slices/customer/types';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { registerCustomer } from '../../slices/customer/slice';
import { setAlert } from '../../slices/alerts/slice';
import { ServerError } from '../../api/types';
import { setFormServerError } from '../../utils/setFormServerError';
import { LINKS } from '../consts';
import { messages } from '../../messages';
import { mapFormDataToRequest } from './registrationRequestMapper';

import { ProgressLoader } from '../ProgressLoader/ProgressLoader';
import { AddressFields } from '../AddressFields/AddressFields';
import { FormInputText } from '../form-components/FormInputText';
import { FormInputDate } from '../form-components/FormInputDate';
import { FormInputPassword } from '../form-components/FormInputPassword';
import { FormCheckBox } from '../form-components/FormCheckBox';

import './styles.scss';

export const RegistrationForm: React.FC = (): React.ReactElement => {
  const { control, handleSubmit, getValues, watch, setError } = useForm();
  const customerData = useAppSelector((state) => state.customer.customerData);
  const progressIntrospect = useAppSelector((state) => state.customer.progress.introspect);
  const progressRegistration = useAppSelector((state) => state.customer.progress.registration);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (customerData) {
      navigate(LINKS.main);
    }
  }, [customerData, navigate]);

  const showBillingAddress = !watch('billingAddress');

  const onSubmit = (data: FieldValues): void => {
    const onSuccess = (): void => {
      dispatch(setAlert({ message: messages.registration.welcome, severity: 'success' }));
      navigate(LINKS.main);
    };
    const onError = (error: ServerError): void => {
      dispatch(setAlert({ message: messages.registration.error(error.message), severity: 'error' }));
      setFormServerError(error.validationMessages, setError);
    };
    const request: RegistrationRequest = mapFormDataToRequest(data, onSuccess, onError);
    dispatch(registerCustomer(request));
  };

  const renderForm = (): React.ReactElement => (
    <Paper elevation={3} sx={{ padding: '2rem' }}>
      <h2 className="form-title">Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInputText
          name={'name'}
          control={control}
          label={'First Name'}
          rules={{
            required: 'Name is required',
            pattern: { value: /^[\p{L} ]+$/u, message: 'Only letters allowed' },
          }}
        />
        <FormInputText
          name={'surname'}
          control={control}
          label={'Last Name'}
          rules={{
            required: 'Last name is required',
            pattern: { value: /^[\p{L} ]+$/u, message: 'Only letters allowed' },
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
          name={'dateOfBirth'}
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
        <Divider sx={{ mt: 2, backgroundColor: '#673ab7' }} />
        <Typography variant="h6" className="form-subtitle">
          Shipping Address
        </Typography>
        <AddressFields control={control} getValues={getValues} />
        <FormCheckBox name={'defaultAddress'} control={control} label="Set address as default" />
        <FormCheckBox name={'billingAddress'} control={control} label="Billing address is THE SAME as shipping" />
        {showBillingAddress && (
          <>
            <Divider sx={{ mt: 1, backgroundColor: '#673ab7' }} />
            <Typography variant="h6" className="form-subtitle">
              Billing Address
            </Typography>
            <AddressFields
              withName
              fieldNameMap={{
                street: 'billingStreet',
                city: 'billingCity',
                country: 'billingCountry',
                postCode: 'billingPostcode',
              }}
              control={control}
              getValues={getValues}
            />
          </>
        )}
        <div className="form-btn">
          <LoadingButton loading={progressRegistration} type="submit" variant="contained" data-testid="submit-btn">
            Register
          </LoadingButton>
        </div>
        <div className="form-link">
          <Typography variant="body1">Already have an account?&nbsp;</Typography>
          <Link to={LINKS.login}>
            <Typography variant="body1">Login</Typography>
          </Link>
        </div>
      </form>
    </Paper>
  );

  return <Box className="form-box">{progressIntrospect ? <ProgressLoader /> : renderForm()}</Box>;
};
