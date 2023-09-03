import { useState } from 'react';
import { Button, Divider, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { AttributeBooleanType, AttributeDefinition, AttributeLocalizedEnumType } from '@commercetools/platform-sdk';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { searchProductProjections } from '../../../slices/productProjections/slice';
import { getDefaultFilterAttributes, getFilterSearchQueryArg } from './utils';
import { ATTRIBUTE_NAME_LOWER_PRICE_BOUND, ATTRIBUTE_NAME_UPPER_PRICE_BOUND } from './consts';
import { AttributeDefinitionWithType, TFilterAttributes } from './types';
import { LenumFilterAttributes } from './LenumFilterAttributes';
import { PriceFilterAttributes } from './PriceFilterAttributes';
import { BooleanFilterAttributes } from './BooleanFilterAttributes';

type Props = {
  attributes: AttributeDefinition[];
  categoryId: string;
};

export const FilterAttributes: React.FC<Props> = ({ attributes, categoryId }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.settings);
  const defaultFilterAttributes = getDefaultFilterAttributes(attributes);

  const [filterAttributes, setFilterAttributes] = useState<TFilterAttributes>(defaultFilterAttributes);
  const [appliedFilter, setAppliedFilter] = useState<TFilterAttributes>(defaultFilterAttributes);
  const [appliedFilterCurrency, setAppliedFilterCurrency] = useState(currency);

  const lenumAttributes: AttributeDefinitionWithType<AttributeLocalizedEnumType>[] = [];
  const booleanAttributes: AttributeDefinitionWithType<AttributeBooleanType>[] = [];
  attributes.forEach((attribute) => {
    if (attribute.type.name === 'lenum') {
      lenumAttributes.push(attribute as AttributeDefinitionWithType<AttributeLocalizedEnumType>);
    }

    if (attribute.type.name === 'boolean') {
      booleanAttributes.push(attribute as AttributeDefinitionWithType<AttributeBooleanType>);
    }
  });

  const isFiltersApplied = !Object.keys({ ...defaultFilterAttributes, ...appliedFilter }).every(
    (key) => defaultFilterAttributes[key] === appliedFilter[key],
  );
  const isFilterAttributesChanged = !Object.keys({ ...filterAttributes, ...appliedFilter }).every(
    (key) => filterAttributes[key] === appliedFilter[key],
  );
  const isPriceFilterAttributeFilledIn =
    !!filterAttributes[ATTRIBUTE_NAME_LOWER_PRICE_BOUND] || !!filterAttributes[ATTRIBUTE_NAME_UPPER_PRICE_BOUND];
  const isCurrencySwitched = currency !== appliedFilterCurrency;

  const isButtonResetAppliedFiltersDisabled = !isFiltersApplied;
  const isButtonApplyFiltersDisabled =
    !isFilterAttributesChanged && !(isPriceFilterAttributeFilledIn && isCurrencySwitched);

  const handleChangeFilterSelectAttribute = (event: SelectChangeEvent): void => {
    const { name, value } = event.target;

    setFilterAttributes({ ...filterAttributes, [name]: value });
  };

  const handleClickResetAppliedFilters = (): void => {
    setFilterAttributes(defaultFilterAttributes);
    setAppliedFilter(defaultFilterAttributes);
    setAppliedFilterCurrency(currency);

    dispatch(searchProductProjections({ filter: `categories.id:"${categoryId}"` }));
  };

  const handleClickApplyFilters = (): void => {
    const filterQueryArgArray = getFilterSearchQueryArg(filterAttributes);
    filterQueryArgArray.push(`categories.id:"${categoryId}"`);

    setAppliedFilter(filterAttributes);
    setAppliedFilterCurrency(currency);

    dispatch(searchProductProjections({ filter: filterQueryArgArray, priceCurrency: currency }));
  };

  const resetFilterAttribute = (attributeName: string): void => {
    setFilterAttributes({ ...filterAttributes, [attributeName]: undefined });
  };

  return (
    <Stack spacing={2} my={2}>
      <LenumFilterAttributes
        attributes={lenumAttributes}
        filterAttributes={filterAttributes}
        onChange={handleChangeFilterSelectAttribute}
        resetFilterAttribute={resetFilterAttribute}
      />
      <Divider />
      <Typography>Price</Typography>
      <PriceFilterAttributes
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
        resetFilterAttribute={resetFilterAttribute}
      />
      <Divider />
      <BooleanFilterAttributes
        attributes={booleanAttributes}
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
      />
      <Button
        fullWidth
        variant="outlined"
        disabled={isButtonResetAppliedFiltersDisabled}
        onClick={handleClickResetAppliedFilters}
      >
        Reset applied filters
      </Button>
      <Button fullWidth variant="contained" disabled={isButtonApplyFiltersDisabled} onClick={handleClickApplyFilters}>
        Apply filters
      </Button>
    </Stack>
  );
};
