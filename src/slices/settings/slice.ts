import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Localizations, Currencies } from '../../types';
import { TSettingsSliceState } from './types';
import { getSettings, saveSettings } from '../../utils/localStorage';
import { TSettings } from '../../types';

const initialState: TSettingsSliceState = {
  localization: Localizations.En,
  currency: Currencies.EUR,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    initSettings: (state) => {
      const { localization, currency } = getSettings();

      if (localization) {
        state.localization = localization;
      } else {
        saveSettings({ localization: state.localization });
      }

      if (currency) {
        state.currency = currency;
      } else {
        saveSettings({ currency: state.currency });
      }
    },
    changeSettings: (state, action: PayloadAction<TSettings>) => {
      const { localization, currency } = action.payload;

      if (localization) {
        saveSettings({ localization });
        state.localization = localization;
      }

      if (currency) {
        saveSettings({ currency });
        state.currency = currency;
      }
    },
  },
});

export const { initSettings, changeSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
