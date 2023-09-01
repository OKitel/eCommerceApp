import { Control, FieldValues } from 'react-hook-form';
import { FormInputText } from '../form-components/FormInputText';
import { FormInputDropdown } from '../form-components/FormInputDropdown';
import { postcodeValidator } from 'postcode-validator';

type Props = {
  fieldNameMap?: { [key: string]: string };
  withName?: boolean;
  control: Control<FieldValues>;
  getValues: (country: string) => string;
};

export const AddressFields: React.FC<Props> = ({
  fieldNameMap,
  withName,
  control,
  getValues,
}: Props): React.ReactElement => {
  if (!fieldNameMap) {
    fieldNameMap = {
      street: 'street',
      city: 'city',
      country: 'country',
      postCode: 'postcode',
    };
  }
  return (
    <>
      {withName && (
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
        name={fieldNameMap.street}
        control={control}
        label={'Street'}
        rules={{
          required: 'Street is required',
        }}
      />
      <FormInputText
        name={fieldNameMap.city}
        control={control}
        label={'City'}
        rules={{
          required: 'City is required',
          pattern: { value: /^['a-zA-Z\s-'.]+$/, message: 'Only letters allowed' },
        }}
      />
      <FormInputDropdown
        name={fieldNameMap.country}
        control={control}
        label={'Country'}
        rules={{ required: 'Country is required' }}
      />
      <FormInputText
        name={fieldNameMap.postCode}
        control={control}
        label={'Postcode'}
        type="text"
        rules={{
          required: 'Postcode is required',
          validate: (value): string | boolean => {
            const countryField = fieldNameMap?.country ?? 'country';
            const country = getValues(countryField);
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
