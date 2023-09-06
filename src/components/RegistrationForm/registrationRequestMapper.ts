import { FieldValues } from 'react-hook-form';
import { Address, RegistrationRequest } from '../../slices/customer/types';
import moment from 'moment';
import { ServerError } from '../../api/types';

export const mapFormDataToRequest = (
  data: FieldValues,
  onSuccess: () => void,
  onError: (error: ServerError) => void,
): RegistrationRequest => {
  const addresses: Address[] = [
    {
      streetName: data.street,
      city: data.city,
      country: data.country,
      postalCode: data.postcode,
    },
  ];
  if (!data.billingAddress) {
    addresses.push({
      firstName: data.firstName,
      lastName: data.lastName,
      streetName: data.billingStreet,
      city: data.billingCity,
      country: data.billingCountry,
      postalCode: data.billingPostcode,
    });
  }

  const request: RegistrationRequest = {
    firstName: data.name,
    lastName: data.surname,
    email: data.email,
    password: data.password,
    dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD'),
    addresses,
    defaultShippingAddress: data.defaultAddress ? 0 : undefined,
    defaultBillingAddress: !data.defaultAddress ? undefined : data.billingAddress ? 0 : 1,
    shippingAddresses: [0],
    billingAddresses: [data.billingAddress ? 0 : 1],
    onSuccess,
    onError,
  };
  return request;
};
