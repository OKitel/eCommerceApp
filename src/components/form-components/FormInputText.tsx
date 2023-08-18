import { Control, Controller, FieldValues, RegisterOptions, Path } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  rules: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
};

export const FormInputText = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  rules,
}: FormInputProps<T>): JSX.Element => {
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
