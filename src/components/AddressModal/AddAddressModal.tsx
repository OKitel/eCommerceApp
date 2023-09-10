import { useCallback, useState, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Modal, Box, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Customer } from '@commercetools/platform-sdk';

import { addAddress } from '../../slices/customer/slice';
import { AddNewAddressRequest } from '../../slices/customer/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAlert } from '../../slices/alerts/slice';
import { ServerError } from '../../api/types';

import { FormRadioGroup } from '../form-components/FormRadioGroup';
import { AddressFields } from '../AddressFields/AddressFields';

import './styles.scss';

const radioOptions = [
  {
    label: 'Shipping',
    value: 'shipping',
  },
  {
    label: 'Billing',
    value: 'billing',
  },
  {
    label: 'Both',
    value: 'both',
  },
];

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  customer: Customer;
};

export const AddAddressModal: React.FC<Props> = ({ open, setOpen, customer }: Props): React.ReactElement => {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const dispatch = useAppDispatch();
  const progressUpdating = useAppSelector((state) => state.customer.progress.update);
  const { control, handleSubmit, reset, getValues } = useForm<FieldValues>({ defaultValues: { type: 'shipping' } });
  const { id, version } = customer;

  const handleClose = useCallback((): void => setOpen(false), [setOpen]);

  const discardChanges = useCallback((): void => {
    handleClose();
    reset();
  }, [handleClose, reset]);

  const onSubmit = useCallback(
    (data: FieldValues): void => {
      const onSuccess = (): void => {
        dispatch(setAlert({ message: 'New address was successfully added', severity: 'success' }));
        handleClose();
        setIsSubmitSuccessful(true);
      };
      const onError = (error: ServerError): void => {
        dispatch(setAlert({ message: error.message, severity: 'error' }));
      };
      const request: AddNewAddressRequest = {
        id,
        version,
        type: data.type,
        address: {
          firstName: data.firstName,
          lastName: data.lastName,
          streetName: data.street,
          city: data.city,
          country: data.country,
          postalCode: data.postcode,
        },
        onSuccess,
        onError,
      };
      dispatch(addAddress(request));
    },
    [id, version, dispatch, handleClose],
  );

  useEffect(() => {
    reset();
    setIsSubmitSuccessful(false);
  }, [isSubmitSuccessful, reset]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-container">
        <Typography className="modal-title" variant="h5">
          New address
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="add-address-form">
          <FormRadioGroup options={radioOptions} name="type" control={control} />
          <AddressFields withName control={control} getValues={getValues} />
          <div className="address_controls">
            <Button variant="contained" color="secondary" onClick={discardChanges}>
              Cancel
            </Button>
            <LoadingButton loading={progressUpdating} type="submit" variant="contained" data-testid="submit-btn">
              Save
            </LoadingButton>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
