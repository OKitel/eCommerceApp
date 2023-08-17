import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, Control } from 'react-hook-form';

type FormInputProps = {
  name: string;
  control: Control;
};

export const FormInputDate = ({ name, control }: FormInputProps): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }): JSX.Element => (
          <DatePicker value={value} onChange={onChange} sx={{ mt: 1 }} />
        )}
      />
    </LocalizationProvider>
  );
};
