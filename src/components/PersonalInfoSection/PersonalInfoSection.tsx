import { useState, useEffect, useCallback } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import moment from 'moment';
import { Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Customer } from '@commercetools/platform-sdk';

import { FormInputText } from '../form-components/FormInputText';
import { FormInputDate } from '../form-components/FormInputDate';
import { EMAIL_REGEXP } from '../../consts';
import { getLoggedInCustomer, updateCustomer } from '../../slices/customer/slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PersonalInfoUpdateRequest } from '../../slices/customer/types';
import { setAlert } from '../../slices/alerts/slice';
import { ServerError } from '../../api/types';
import { setFormServerError } from '../../utils/setFormServerError';
import './styles.scss';

type Props = {
  customer: Customer;
};

export const PersonalInfoSection: React.FC<Props> = ({ customer }: Props): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { id, version, firstName, lastName, email, dateOfBirth } = customer;
  const [editMode, setEditMode] = useState(false);
  const { control, handleSubmit, reset, setError } = useForm<FieldValues>({
    defaultValues: { name: firstName ?? '', surname: lastName ?? '', email, dateOfBirth: new Date(dateOfBirth ?? '') },
  });
  const progressUpdating = useAppSelector((state) => state.customer.progress.update);

  useEffect(() => {
    dispatch(getLoggedInCustomer());
  }, [dispatch]);

  const discardChanges = useCallback((): void => {
    setEditMode(false);
    reset();
  }, [setEditMode, reset]);

  const onSubmit = useCallback(
    (data: FieldValues): void => {
      const onSuccess = (): void => {
        dispatch(setAlert({ message: 'Personal information successfully updated', severity: 'success' }));
        setEditMode(false);
      };
      const onError = (error: ServerError): void => {
        dispatch(setAlert({ message: error.message, severity: 'error' }));
        setFormServerError(error.validationMessages, setError);
      };
      const request: PersonalInfoUpdateRequest = {
        id,
        version,
        firstName: data.name,
        lastName: data.surname,
        email: data.email,
        dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD'),
        onSuccess,
        onError,
      };
      dispatch(updateCustomer(request));
    },
    [setEditMode, dispatch, id, setError, version],
  );

  return (
    <>
      <Typography variant="h4" className="section-title">
        Personal Information
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="person-form">
        <div className="person-form_info">
          <FormInputText
            name={'name'}
            control={control}
            label={'First Name'}
            rules={{
              required: 'Name is required',
              pattern: { value: /^[a-zA-Z]+$/, message: 'Only letters allowed' },
            }}
            readOnly={!editMode}
          />
          <FormInputText
            name={'surname'}
            control={control}
            label={'Last Name'}
            rules={{
              required: 'Last name is required',
              pattern: { value: /^[a-zA-Z]+$/, message: 'Only letters allowed' },
            }}
            readOnly={!editMode}
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
            readOnly={!editMode}
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
            readOnly={!editMode}
          />
        </div>
        <div className="person-form_controls">
          {!editMode ? (
            <Button
              onClick={(): void => setEditMode(true)}
              variant="contained"
              className="edit-control"
              data-testid="edit-person-btn"
            >
              <EditRoundedIcon />
              &nbsp;Edit
            </Button>
          ) : (
            <div className="confirmation-controls">
              <Button variant="contained" color="secondary" onClick={discardChanges} data-testid="cancel-person-btn">
                Cancel
              </Button>
              <LoadingButton loading={progressUpdating} type="submit" variant="contained" data-testid="submit-btn">
                Save
              </LoadingButton>
            </div>
          )}
        </div>
      </form>
    </>
  );
};
