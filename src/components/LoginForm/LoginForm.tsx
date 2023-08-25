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
import { ServerError } from '../../api/types';
import { setFormServerError } from '../../utils/setFormServerError';
import { getMessageErrorLogin } from './utils';
import { LABELS, TEXT_CONTENT, TITLES } from './consts';
import './styles.scss';

export const LoginForm: React.FC = (): JSX.Element => {
  const { control, handleSubmit, setError } = useForm();
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
      dispatch(setAlert({ message: TEXT_CONTENT.messageSuccesLogin, severity: 'success' }));
      navigate('/');
    };
    const onError = (error: ServerError): void => {
      dispatch(setAlert({ message: getMessageErrorLogin(error.message), severity: 'error' }));
      setFormServerError(error.validationMessages, setError);
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
      <h2 className="form-title">{TITLES.form}</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInputText
          name="email"
          control={control}
          label={LABELS.fieldEmail}
          type="email"
          rules={{
            required: TEXT_CONTENT.fieldEmail.required,
            pattern: { value: EMAIL_REGEXP, message: TEXT_CONTENT.fieldEmail.patternMessage },
          }}
        />
        <FormInputPassword
          name="password"
          control={control}
          label={LABELS.fieldPassword}
          type="password"
          rules={{
            required: TEXT_CONTENT.fieldPassword.required,
            pattern: {
              value: PASSWORD_REGEXP,
              message: TEXT_CONTENT.fieldPassword.patternMessage,
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
            {LABELS.btnSubmitForm}
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
