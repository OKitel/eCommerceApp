import { AttributeDefinition } from '@commercetools/platform-sdk';

import { TSortingSelectorOption } from './types';
import { PRICE_SORTING_PARAM_KEY, PRICE_SORTING_PARAM_LABEL, ATTRIBUTE_SORTING_PARAMS } from './consts';
import { Localizations } from '../../../types';
import { TSortingParams } from '../types';

export function getSortingOptions(
  attributes: AttributeDefinition[],
  localization: Localizations,
): TSortingSelectorOption[] {
  const sortingOptions: TSortingSelectorOption[] = [];

  attributes.forEach((attribute) => {
    if (ATTRIBUTE_SORTING_PARAMS.includes(attribute.name)) {
      sortingOptions.push({ key: attribute.name, label: attribute.label[localization] });
    }
  });
  sortingOptions.push({ key: PRICE_SORTING_PARAM_KEY, label: PRICE_SORTING_PARAM_LABEL[localization] });

  return sortingOptions;
}

export function getSortingSearchQueryArg(sorting: TSortingParams): string[] {
  const sortingSearchQueryArg: string[] = [];

  Object.keys(sorting).forEach((key) => {
    if (key === PRICE_SORTING_PARAM_KEY) {
      sortingSearchQueryArg.push(`price ${sorting[key]}`);
    }

    if (ATTRIBUTE_SORTING_PARAMS.includes(key)) {
      sortingSearchQueryArg.push(`variants.attributes.${key}.key ${sorting[key]}`);
    }
  });

  return sortingSearchQueryArg;
}
