import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import { Controller, Control, RegisterOptions, FieldValues } from 'react-hook-form';

type FormInputProps = {
  name: string;
  control: Control;
  label: string;
  type?: string;
  rules: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
};

const options = [
  {
    label: 'USA',
    value: 'US',
  },
  {
    label: 'Austria',
    value: 'AT',
  },
  {
    label: 'Germany',
    value: 'DE',
  },
  {
    label: 'Netherlands',
    value: 'NL',
  },
];
export const FormInputDropdown: React.FC<FormInputProps> = ({ name, control, label, rules }) => {
  const generateSingleOptions = (): JSX.Element[] => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };
  return (
    <FormControl fullWidth size="small">
      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
          <>
            <InputLabel error={!!error}>{label}</InputLabel>
            <Select
              error={!!error}
              label="Country"
              onChange={onChange}
              value={value ?? ''}
              data-testid={name}
              sx={{ mb: 1 }}
            >
              {generateSingleOptions()}
            </Select>
            {!!error && <FormHelperText error={!!error}>{error ? error.message : null}</FormHelperText>}
          </>
        )}
        control={control}
        rules={rules}
        name={name}
      />
    </FormControl>
  );
};
