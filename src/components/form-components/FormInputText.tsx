import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type FormInputProps = {
  name: string;
  control: Control;
  label: string;
  type?: string;
  rules: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
};

export const FormInputText = ({ name, control, label, type, rules }: FormInputProps): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          size="small"
          onChange={onChange}
          value={value ?? ''}
          fullWidth
          label={label}
          variant="outlined"
          type={type || 'text'}
          sx={{ mb: 1 }}
        />
      )}
    />
  );
};
