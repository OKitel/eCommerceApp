import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { Currencies } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeSettings } from '../../slices/settings/slice';
import { isCurrency } from '../../utils/typesUtils';

export const CurrencySelector: React.FC = (): JSX.Element => {
  const currencies = Object.values(Currencies);
  const currencySelected = useAppSelector((state) => state.settings.currency);
  const dispatch = useAppDispatch();

  return (
    <FormControl>
      <Select
        sx={{ backgroundColor: '#c6a7fd', color: 'white' }}
        labelId="currency-select-label"
        id="currency-select"
        value={currencySelected}
        size="small"
        inputProps={{ 'aria-label': 'Without label' }}
        onChange={({ target: { value } }): void => {
          if (isCurrency(value)) {
            dispatch(changeSettings({ currency: value }));
          }
        }}
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
