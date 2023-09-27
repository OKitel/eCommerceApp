import { Controller, UseControllerProps } from 'react-hook-form';
import { Checkbox, FormLabel } from '@mui/material';

interface FormInputProps extends UseControllerProps {
  label: string;
}

export const FormCheckBox = ({ name, control, rules, label }: FormInputProps): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }): JSX.Element => (
        <>
          <FormLabel sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              {...field}
              checked={field.value ?? false}
              onChange={(e): void => field.onChange(e.target.checked)}
            />
            {label}
          </FormLabel>
        </>
      )}
    />
  );
};
