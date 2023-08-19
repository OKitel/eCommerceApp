export type Address = {
  firstName: string;
  lastName: string;
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
  email: string;
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
  onSuccess: () => void;
};
