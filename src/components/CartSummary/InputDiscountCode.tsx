import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAlert } from '../../slices/alerts/slice';
import { addDiscountCode, removeDiscountCode } from '../../slices/cart/slice';
import { ServerError } from '../../api/types';

export const InputDiscountCode: React.FC = (): JSX.Element => {
  const { handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const { activeCart, discountCode: appliedDiscountCode } = useAppSelector((state) => state.cart);
  const [discountCode, setDiscountCode] = useState<string>('');

  const handleClickRemove = (): void => {
    const onSuccess = (): void => {
      dispatch(setAlert({ message: 'Discount code removed', severity: 'success' }));
    };
    const onError = (error: ServerError): void => {
      dispatch(setAlert({ message: `Something went wrong with handling discount codes. ${error}`, severity: 'error' }));
    };

    dispatch(removeDiscountCode({ onSuccess, onError }));
    setDiscountCode(appliedDiscountCode || '');
  };

  const applyDiscountCode = (): void => {
    const onSuccess = (): void => {
      dispatch(setAlert({ message: 'Discount code applied', severity: 'success' }));
    };
    const onError = (error: ServerError): void => {
      dispatch(setAlert({ message: `Discount code can't be applied. ${error.message}`, severity: 'error' }));
    };

    dispatch(addDiscountCode({ code: discountCode, onSuccess, onError }));
  };

  if (activeCart && activeCart.discountCodes.length) {
    return (
      <Box display="flex" alignItems="center" my={3} gap={1}>
        <TextField disabled fullWidth size="small" label="Discount code" value={appliedDiscountCode || ''} />
        <Button variant="outlined" onClick={handleClickRemove}>
          Remove
        </Button>
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit(applyDiscountCode)}>
      <Box display="flex" alignItems="center" my={3} gap={1}>
        <TextField
          fullWidth
          size="small"
          label="Discount code"
          value={discountCode}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setDiscountCode(event.target.value);
          }}
        />
        <Button variant="contained" type="submit">
          Apply
        </Button>
      </Box>
    </form>
  );
};
