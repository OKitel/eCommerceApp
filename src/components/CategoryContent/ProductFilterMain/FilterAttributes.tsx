import { useState } from 'react';
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { AttributeBooleanType, AttributeDefinition, AttributeLocalizedEnumType } from '@commercetools/platform-sdk';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { searchProductProjections } from '../../../slices/productProjections/slice';
import { getDefaultFilterAttributes, getFilterSearchQueryArg } from './utils';
import {
  ATTRIBUTE_NAME_LOWER_PRICE_BOUND,
  ATTRIBUTE_NAME_UPPER_PRICE_BOUND,
  REGEXP_NUMERIC_ONLY,
  REGEXP_PRICE,
} from './consts';
import { AttributeDefinitionWithType, TFilterAttributes, TPriceAttribute } from './types';

import './styles.scss';

type Props = {
  attributes: AttributeDefinition[];
  categoryId: string;
};

export const FilterAttributes: React.FC<Props> = ({ attributes, categoryId }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { localization, currency } = useAppSelector((state) => state.settings);
  const defaultFilterAttributes = getDefaultFilterAttributes(attributes);

  const [filterAttributes, setFilterAttributes] = useState<TFilterAttributes>(defaultFilterAttributes);
  const [appliedFilter, setAppliedFilter] = useState<TFilterAttributes>(defaultFilterAttributes);
  const [appliedFilterCurrency, setAppliedFilterCurrency] = useState(currency);

  const attributesLenum: AttributeDefinitionWithType<AttributeLocalizedEnumType>[] = [];
  const attributesBoolean: AttributeDefinitionWithType<AttributeBooleanType>[] = [];
  attributes.forEach((attribute) => {
    if (attribute.type.name === 'lenum') {
      attributesLenum.push(attribute as AttributeDefinitionWithType<AttributeLocalizedEnumType>);
    }

    if (attribute.type.name === 'boolean') {
      attributesBoolean.push(attribute as AttributeDefinitionWithType<AttributeBooleanType>);
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

  const handleBeforeInputPriceNumber = (event: React.CompositionEvent<HTMLInputElement>): void => {
    // prevent input of some non-decimal signs that html input with type="number"
    // allows to type in without calling the change event
    if (!REGEXP_NUMERIC_ONLY.test(event.data)) {
      event.preventDefault();
    }
  };

  const handleChangeFilterSelectAttribute = (event: SelectChangeEvent): void => {
    const { name, value } = event.target;

    setFilterAttributes({ ...filterAttributes, [name]: value });
  };

  const handleChangeFilterCheckboxAttribute = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;

    setFilterAttributes({
      ...filterAttributes,
      [name]: checked || undefined,
    });
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

  const changePrice = (priceValue: string, priceAttributeName: TPriceAttribute): void => {
    if (priceValue === '') {
      resetFilterAttribute(priceAttributeName);
    } else if (REGEXP_PRICE.test(priceValue)) {
      setFilterAttributes({ ...filterAttributes, [priceAttributeName]: Number(priceValue) });
    }
  };

  return (
    <Stack spacing={2} my={2}>
      {attributesLenum.map((attribute) => (
        <Stack key={attribute.name} direction="row" alignItems="center" gap={0.5}>
          <FormControl fullWidth>
            <InputLabel size="small" id={`filter-${attribute.name}-select-label`}>
              {attribute.label[localization]}
            </InputLabel>
            <Select
              labelId={`filter-${attribute.name}-select-label`}
              id={`filter-${attribute.name}-select`}
              name={attribute.name}
              value={String(filterAttributes[attribute.name] || '')}
              label={attribute.label[localization]}
              size="small"
              onChange={handleChangeFilterSelectAttribute}
            >
              {attribute.type.values.map((typeValue) => (
                <MenuItem key={typeValue.key} value={typeValue.key}>
                  {typeValue.label[localization]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            color="error"
            disabled={!filterAttributes[attribute.name]}
            onClick={(): void => resetFilterAttribute(attribute.name)}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
      ))}
      <Divider />
      <Typography>Price</Typography>
      <Stack direction="row" alignItems="center" gap={0.5}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="filter-price-from">Starts from</InputLabel>
          <OutlinedInput
            id="filter-price-from"
            type="number"
            size="small"
            startAdornment={<InputAdornment position="start">{currency}</InputAdornment>}
            label="Starts from"
            value={filterAttributes[ATTRIBUTE_NAME_LOWER_PRICE_BOUND] || ''}
            inputProps={{ inputMode: 'numeric' }}
            onBeforeInput={handleBeforeInputPriceNumber}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              changePrice(event.target.value, 'priceFrom');
            }}
          />
        </FormControl>
        <IconButton
          color="error"
          disabled={!filterAttributes[ATTRIBUTE_NAME_LOWER_PRICE_BOUND]}
          onClick={(): void => resetFilterAttribute(ATTRIBUTE_NAME_LOWER_PRICE_BOUND)}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Stack>
      <Stack direction="row" alignItems="center" gap={0.5}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="filter-price-to">Up to</InputLabel>
          <OutlinedInput
            id="filter-price-to"
            type="number"
            size="small"
            startAdornment={<InputAdornment position="start">{currency}</InputAdornment>}
            label="Up to"
            value={filterAttributes[ATTRIBUTE_NAME_UPPER_PRICE_BOUND] || ''}
            onBeforeInput={handleBeforeInputPriceNumber}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              changePrice(event.target.value, 'priceTo');
            }}
          />
        </FormControl>
        <IconButton
          color="error"
          disabled={!filterAttributes[ATTRIBUTE_NAME_UPPER_PRICE_BOUND]}
          onClick={(): void => resetFilterAttribute(ATTRIBUTE_NAME_UPPER_PRICE_BOUND)}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Stack>
      <Divider />
      {attributesBoolean.map((attribute) => (
        <Stack key={attribute.name} direction="row" alignItems="center" gap={0.5}>
          <FormGroup>
            <FormControlLabel
              sx={{ marginLeft: 0 }}
              name={attribute.name}
              control={
                <Checkbox
                  sx={{ marginRight: 0.5 }}
                  name={attribute.name}
                  icon={<MusicNoteOutlinedIcon />}
                  checkedIcon={<MusicNoteIcon />}
                  checked={Boolean(filterAttributes[attribute.name])}
                  onChange={handleChangeFilterCheckboxAttribute}
                />
              }
              label={`${attribute.label[localization]} only`}
            />
          </FormGroup>
        </Stack>
      ))}
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
