/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Box, Typography, Alert, Snackbar, Divider, CircularProgress } from '@mui/material';
import { FormInputText } from '../form-components/FormInputText';
import { useForm, FieldValues } from 'react-hook-form';
import './styles.scss';
import { FormInputDate } from '../form-components/FormInputDate';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../../consts';
import { FormInputPassword } from '../form-components/FormInputPassword';
import moment from 'moment';
import { FormInputDropdown } from '../form-components/FormInputDropdown';
import { postcodeValidator } from 'postcode-validator';
import { Address, RegistrationRequest } from '../../slices/types';
import { FormCheckBox } from '../form-components/FormCheckBox';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { registerCustomer } from '../../slices/customerSlice';
import { LoadingButton } from '@mui/lab';
import Slide, { SlideProps } from '@mui/material/Slide';

type TransitionProps = Omit<SlideProps, 'direction'>;

const TransitionDown = (props: TransitionProps): JSX.Element => {
  return <Slide {...props} direction="down" />;
};

export const RegistrationForm: React.FC = (): JSX.Element => {
  const { control, handleSubmit, getValues, watch } = useForm();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const customerData = useAppSelector((state) => state.customer.customerData);
  const progressIntrospect = useAppSelector((state) => state.customer.progress.introspect);
  const progressRegistration = useAppSelector((state) => state.customer.progress.registration);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (customerData) {
      navigate('/');
    }
  }, [customerData, navigate]);

  const showBillingAddress = !watch('billingAddress');

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    setShowError(false);
    setShowSuccess(false);
  };

  const onSubmit = (data: FieldValues): void => {
    const onSuccess = (): void => {
      setShowError(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    };
    const onError = (error: string): void => {
      setErrorMessage(error);
      setShowSuccess(false);
      setShowError(true);
    };

    const addresses: Address[] = [
      {
        streetName: data.street,
        city: data.city,
        country: data.country,
        postalCode: data.postCode,
      },
    ];

    if (!data.billingAddress) {
      addresses.push({
        firstName: data.firstName,
        lastName: data.lastName,
        streetName: data.billingStreet,
        city: data.billingCity,
        country: data.billingCountry,
        postalCode: data.billingPostCode,
      });
    }

    const request: RegistrationRequest = {
      firstName: data.name,
      lastName: data.surname,
      email: data.email,
      password: data.password,
      dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD'),
      addresses,
      defaultShippingAddress: data.defaultAddress ? 0 : undefined,
      defaultBillingAddress: !data.defaultAddress ? undefined : data.billingAddress ? 0 : 1,
      shippingAddresses: [0],
      billingAddresses: [data.billingAddress ? 0 : 1],
      onSuccess,
      onError,
    };
    dispatch(registerCustomer(request));
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showError}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={TransitionDown}
      >
        <Alert severity="error" onClose={(): void => setShowError(false)}>
          {`Oops! Registration failed. ${errorMessage}`}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={TransitionDown}
      >
        <Alert severity="success" onClose={(): void => setShowSuccess(false)}>
          Your account was successfully created! Welcome!
        </Alert>
      </Snackbar>
      <Box sx={{ maxWidth: '50%', margin: '5rem auto' }}>
        {progressIntrospect ? (
          <Box textAlign={'center'}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper elevation={3} sx={{ padding: '2rem' }}>
            <h2 className="form-title">Registration Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                  pattern: { value: /^['a-zA-Z\s-'.]+$/, message: 'Only letters allowed' },
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
              <FormCheckBox name={'defaultAddress'} control={control} label="Set address as default" />
              <FormCheckBox name={'billingAddress'} control={control} label="Billing address is THE SAME as shipping" />
              {showBillingAddress && (
                <>
                  <Divider sx={{ mt: 1, backgroundColor: '#673ab7' }} />
                  <Typography variant="h6" className="form-subtitle">
                    Billing Address
                  </Typography>

                  <FormInputText
                    name={'firstName'}
                    control={control}
                    label={'First Name'}
                    rules={{
                      required: 'Name is required',
                      pattern: { value: /^[a-zA-Z]+$/, message: 'Only letters allowed' },
                    }}
                  />
                  <FormInputText
                    name={'lastName'}
                    control={control}
                    label={'Last Name'}
                    rules={{
                      required: 'Last name is required',
                      pattern: { value: /^[a-zA-Z]+$/, message: 'Only letters allowed' },
                    }}
                  />
                  <FormInputText
                    name={'billingStreet'}
                    control={control}
                    label={'Street'}
                    rules={{
                      required: 'Street is required',
                    }}
                  />
                  <FormInputText
                    name={'billingCity'}
                    control={control}
                    label={'City'}
                    rules={{
                      required: 'City is required',
                      pattern: { value: /^['a-zA-Z\s-'.]+$/, message: 'Only letters allowed' },
                    }}
                  />
                  <FormInputDropdown
                    name={'billingCountry'}
                    control={control}
                    label={'Country'}
                    rules={{ required: 'Country is required' }}
                  />
                  <FormInputText
                    name={'billingPostcode'}
                    control={control}
                    label={'Postcode'}
                    type="text"
                    rules={{
                      required: 'Postcode is required',
                      validate: (value): string | boolean => {
                        const country = getValues('billingCountry');
                        if (!country) return true;
                        if (!postcodeValidator(value, country)) {
                          return 'Invalid postcode for provided country';
                        }
                        return true;
                      },
                    }}
                  />
                </>
              )}
              <div className="form-btn">
                <LoadingButton
                  loading={progressRegistration}
                  type="submit"
                  variant="contained"
                  data-testid="submit-btn"
                >
                  Register
                </LoadingButton>
              </div>
              <div className="form-link">
                <Typography variant="body1">Already have an account?&nbsp;</Typography>
                <Link to={'/login'}>
                  <Typography variant="body1">Login</Typography>
                </Link>
              </div>
            </form>
          </Paper>
        )}
      </Box>
    </>
  );
};
