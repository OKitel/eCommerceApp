import { Typography } from '@mui/material';
import { Control, FieldValues } from 'react-hook-form';
import { FormInputText } from '../form-components/FormInputText';
import { FormInputDropdown } from '../form-components/FormInputDropdown';
import { postcodeValidator } from 'postcode-validator';

type Props = {
  type: 'shipping' | 'billing';
  control: Control<FieldValues>;
  getValues: (country: string) => string;
};

export const AddressFields: React.FC<Props> = ({ type, control, getValues }: Props): React.ReactElement => {
  return (
    <>
      <Typography variant="h6" className="form-subtitle">
        {`${type === 'shipping' ? 'Shipping' : 'Billing'} Address`}
      </Typography>
      {type === 'shipping' ? null : (
        <>
          <FormInputText
            name={'firstName'}
            control={control}
            label={'First Name'}
            rules={{
              required: 'Name is required',
              pattern: { value: /^[a-zA-Z]+$/, message: 'Only letters allowed' },
            }}
          />
          <FormInputText
            name={'lastName'}
            control={control}
            label={'Last Name'}
            rules={{
              required: 'Last name is required',
              pattern: { value: /^[a-zA-Z]+$/, message: 'Only letters allowed' },
            }}
          />
        </>
      )}
      <FormInputText
        name={type === 'shipping' ? 'street' : 'billingStreet'}
        control={control}
        label={'Street'}
        rules={{
          required: 'Street is required',
        }}
      />
      <FormInputText
        name={type === 'shipping' ? 'city' : 'billingCity'}
        control={control}
        label={'City'}
        rules={{
          required: 'City is required',
          pattern: { value: /^['a-zA-Z\s-'.]+$/, message: 'Only letters allowed' },
        }}
      />
      <FormInputDropdown
        name={type === 'shipping' ? 'country' : 'billingCountry'}
        control={control}
        label={'Country'}
        rules={{ required: 'Country is required' }}
      />
      <FormInputText
        name={type === 'shipping' ? 'postcode' : 'billingPostcode'}
        control={control}
        label={'Postcode'}
        type="text"
        rules={{
          required: 'Postcode is required',
          validate: (value): string | boolean => {
            const country = getValues('country');
            if (!country) return true;
            if (!postcodeValidator(value, country)) {
              return 'Invalid postcode for provided country';
            }
            return true;
          },
        }}
      />
    </>
  );
};
