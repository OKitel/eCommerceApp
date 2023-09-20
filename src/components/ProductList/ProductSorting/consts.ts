import { TSortingOrder } from '../types';

export const ATTRIBUTE_SORTING_PARAMS = ['brand'];
export const PRICE_SORTING_PARAM_KEY = 'price';
export const PRICE_SORTING_PARAM_LABEL = {
  en: 'Price',
};

export const SORTING_ORDER_LABEL: { [key in TSortingOrder]: string } = {
  asc: 'ascending',
  desc: 'descending',
  '': '',
};
