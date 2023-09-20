import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, UseControllerProps } from 'react-hook-form';

interface FormRadioGroupProps extends UseControllerProps {
  options: { label: string; value: string }[];
}

export const FormRadioGroup = ({ options, name, control }: FormRadioGroupProps): JSX.Element => {
  const generateRadioOptions = (): React.ReactElement[] => {
    return options.map((singleOption) => (
      <FormControlLabel
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
        key={singleOption.value}
      />
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }): JSX.Element => (
        <RadioGroup row value={value} onChange={onChange} defaultValue={options[0].value}>
          {generateRadioOptions()}
        </RadioGroup>
      )}
    />
  );
};
