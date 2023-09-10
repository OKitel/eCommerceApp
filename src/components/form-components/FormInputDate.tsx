import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, Control, RegisterOptions, FieldValues } from 'react-hook-form';

type FormInputProps = {
  name: string;
  control: Control;
  rules: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  readOnly?: boolean;
};

export const FormInputDate = ({ name, control, rules, readOnly }: FormInputProps): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => {
          return (
            <DatePicker
              slotProps={{
                textField: {
                  helperText: error ? error.message : null,
                  error: !!error,
                },
              }}
              disableFuture
              value={value ?? 0}
              onChange={onChange}
              sx={{ mt: 1 }}
              disabled={readOnly}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};
