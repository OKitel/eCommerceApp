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
  onError: (error: string) => void;
};
