import { useState } from 'react';
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

type FormInputProps = {
  name: string;
  control: Control;
  label: string;
  type?: string;
  rules: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
};

//eslint-disable-next-line max-lines-per-function
export const FormInputPassword = ({ name, control, label, rules }: FormInputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

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
          type={showPassword ? 'text' : 'password'}
          data-testid={name}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 1 }}
        />
      )}
    />
  );
};
