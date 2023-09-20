import { AlertColor } from '@mui/material';

export type TAlert = {
  isShow: boolean;
  message: string;
  severity?: AlertColor;
};

export type TAlertsSliceState = {
  alert: TAlert | null;
};
