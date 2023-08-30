import { Customer } from '@commercetools/platform-sdk';
import { ServerError } from '../../api/types';

type TCustomerSliceProgress = {
  introspect: boolean;
  login: boolean;
  registration: boolean;
  update: boolean;
};

export type TCustomerSliceState = {
  customerData: Customer | null;
  errorMessage: string | null;
  progress: TCustomerSliceProgress;
};

export type TLoginRequest = {
  email: string;
  password: string;
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};

export type Address = {
  firstName?: string;
  lastName?: string;
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
};

export type RegistrationRequest = {
  firstName: string;
  email: string;
  password: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  shippingAddresses: number[];
  billingAddresses: number[];
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};

export type PersonalInfoUpdateRequest = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  version: number;
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};

export type PasswordChangeRequest = {
  id: string;
  version: number;
  currentPassword: string;
  newPassword: string;
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};

export type DeleteAddressRequest = {
  id: string;
  addressId: string;
  version: number;
  actionType: 'removeBillingAddressId' | 'removeShippingAddressId';
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};

export type AddNewAddressRequest = {
  type: 'billing' | 'shipping' | 'both';
  address: Address;
  id: string;
  version: number;
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};
