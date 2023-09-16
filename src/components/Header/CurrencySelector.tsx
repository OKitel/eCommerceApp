import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';

import { Currencies } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeSettings } from '../../slices/settings/slice';
import { changeCartCurrency } from '../../slices/cart/slice';
import { isCurrency } from '../../utils/typesUtils';

export const CurrencySelector: React.FC = (): JSX.Element => {
  const currencies = Object.values(Currencies);
  const currencySelected = useAppSelector((state) => state.settings.currency);
  const {
    activeCart,
    progress: { changeCartCurrency: progressChangeCartCurrency },
  } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <FormControl>
      <Select
        sx={{ backgroundColor: '#c6a7fd', color: 'white', pointerEvents: 'all' }}
        labelId="currency-select-label"
        id="currency-select"
        value={currencySelected}
        size="small"
        disabled={progressChangeCartCurrency}
        inputProps={{ 'aria-label': 'Without label' }}
        onChange={({ target: { value } }): void => {
          if (isCurrency(value)) {
            dispatch(changeSettings({ currency: value }));

            if (activeCart) {
              dispatch(changeCartCurrency(value));
            }
          }
        }}
        data-testid="currency-select"
      >
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
