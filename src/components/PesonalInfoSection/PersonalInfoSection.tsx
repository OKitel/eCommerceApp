import { useState, useEffect, useCallback } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import moment from 'moment';
import { Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import { FormInputText } from '../form-components/FormInputText';
import { FormInputDate } from '../form-components/FormInputDate';
import { EMAIL_REGEXP } from '../../consts';
import { getLoggedInCustomer } from '../../slices/customer/slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './styles.scss';
import { Customer } from '@commercetools/platform-sdk';

export const PersonalInfoSection: React.FC = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { firstName, lastName, dateOfBirth, email }: Customer = useAppSelector((state) => state.customer.customerData)!;

  const [editMode, setEditMode] = useState(false);
  const { control, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { name: firstName ?? '', surname: lastName ?? '', email, dateOfBirth: new Date(dateOfBirth ?? '') },
  });
  const progressUpdating = false;

  useEffect(() => {
    dispatch(getLoggedInCustomer());
  }, [dispatch]);

  const discardChanges = useCallback((): void => {
    setEditMode(false);
    reset();
  }, [setEditMode, reset]);

  const onSubmit = useCallback((): void => {
    setEditMode(false);
  }, [setEditMode]);

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
        <div>
          {!editMode ? (
            <Button onClick={(): void => setEditMode(true)} variant="contained">
              <EditRoundedIcon />
            </Button>
          ) : (
            <div className="person-form_controls">
              <Button variant="contained" color="secondary" onClick={discardChanges}>
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
