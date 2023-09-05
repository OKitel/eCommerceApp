export type TFilterAttributes = {
  [key: string]: string | boolean | number | undefined;
};

export type TSortingOrder = 'asc' | 'desc' | '';

export type TSortingParams = {
  [key: string]: TSortingOrder;
};
