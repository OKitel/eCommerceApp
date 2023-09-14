import { Controller, UseControllerProps } from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface FormInputProps extends UseControllerProps {
  label: string;
  type?: string;
  readOnly?: boolean;
}

export const FormInputText = ({ name, control, label, type, rules, readOnly }: FormInputProps): JSX.Element => {
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
          data-testid={name}
          InputProps={{
            disabled: readOnly,
          }}
        />
      )}
    />
  );
};
