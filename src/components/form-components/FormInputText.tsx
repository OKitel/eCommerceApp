import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
};

export const FormInputText = <T extends FieldValues>({
  name,
  control,
  label,
  type,
}: FormInputProps<T>): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          type={type || 'text'}
          margin="dense"
        />
      )}
    />
  );
};
