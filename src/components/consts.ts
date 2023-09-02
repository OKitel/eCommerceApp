import { TPageParams } from '../types';

export const LINKS = {
  main: '/',
  login: '/login',
  registration: '/registration',
  cart: '/cart',
  catalog: '/catalog',
  profile: '/profile',
};

export const URL_PARAMS = {
  categorySlug: 'categorySlug',
};

export const PAGE_PARAMS: TPageParams[] = [
  {
    name: 'Catalog',
    slug: LINKS.catalog.split('/').filter((x) => x)[0],
  },
];

export const TEXT_CONTENT = {
  products: {
    emptyPrice: 'Contact for price',
  },
};
