import { Control, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type FormInputProps = {
  name: string;
  control: Control;
  label: string;
  type?: string;
};

export const FormInputText = ({ name, control, label, type }: FormInputProps): JSX.Element => {
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
