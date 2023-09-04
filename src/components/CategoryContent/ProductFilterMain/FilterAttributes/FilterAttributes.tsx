import { useState } from 'react';
import { Button, Divider, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { AttributeBooleanType, AttributeDefinition, AttributeLocalizedEnumType } from '@commercetools/platform-sdk';

import { LenumFilterAttributes } from './LenumFilterAttributes';
import { PriceFilterAttributes } from './PriceFilterAttributes';
import { BooleanFilterAttributes } from './BooleanFilterAttributes';
import { getDefaultFilterAttributes } from '../utils';
import { TFilterAttributes } from '../../types';
import { AttributeDefinitionWithType } from '../types';

type Props = {
  attributes: AttributeDefinition[];
  applyFilters: (filterAttributes: TFilterAttributes) => void;
};

export const FilterAttributes: React.FC<Props> = ({ attributes, applyFilters }): JSX.Element => {
  const defaultFilterAttributes = getDefaultFilterAttributes(attributes);

  const [filterAttributes, setFilterAttributes] = useState<TFilterAttributes>(defaultFilterAttributes);
  const [appliedFilter, setAppliedFilter] = useState<TFilterAttributes>(defaultFilterAttributes);

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

  const isButtonResetAppliedFiltersDisabled = !isFiltersApplied;
  const isButtonApplyFiltersDisabled = !isFilterAttributesChanged;

  const handleChangeFilterSelectAttribute = (event: SelectChangeEvent): void => {
    const { name, value } = event.target;

    setFilterAttributes({ ...filterAttributes, [name]: value });
  };

  const handleClickResetAppliedFilters = (): void => {
    setFilterAttributes(defaultFilterAttributes);
    setAppliedFilter(defaultFilterAttributes);

    applyFilters({});
  };

  const handleClickApplyFilters = (): void => {
    setAppliedFilter(filterAttributes);

    applyFilters(filterAttributes);
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
