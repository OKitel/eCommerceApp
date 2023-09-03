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
import { AttributeDefinitionWithType, TFilterAttributes } from './types';

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

  const handleChangeAttribute = (event: SelectChangeEvent): void => {
    const { name, value } = event.target;

    setFilterAttributes({ ...filterAttributes, [name]: value });
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
              onChange={handleChangeAttribute}
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
            onClick={(): void => setFilterAttributes({ ...filterAttributes, [attribute.name]: undefined })}
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
            value={filterAttributes.priceFrom || ''}
            inputProps={{ inputMode: 'numeric' }}
            onBeforeInput={(event: React.CompositionEvent<HTMLInputElement>): void => {
              const regex = /^[0-9\b]+$/;
              if (!regex.test(event.data)) {
                event.preventDefault();
              }
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              const regex = /^[1-9]\d{0,7}(?:\.\d{1,4})?$/;

              if (event.target.value === '') {
                setFilterAttributes({ ...filterAttributes, priceFrom: undefined });
              } else if (regex.test(event.target.value)) {
                setFilterAttributes({ ...filterAttributes, priceFrom: Number(event.target.value) });
              }
            }}
          />
        </FormControl>
        <IconButton
          color="error"
          disabled={!filterAttributes.priceFrom}
          onClick={(): void => setFilterAttributes({ ...filterAttributes, priceFrom: undefined })}
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
            value={filterAttributes.priceTo || ''}
            onBeforeInput={(event: React.CompositionEvent<HTMLInputElement>): void => {
              const regex = /^[0-9\b]+$/;
              if (!regex.test(event.data)) {
                event.preventDefault();
              }
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              const regex = /^[1-9]\d{0,7}(?:\.\d{1,4})?$/;

              if (event.target.value === '') {
                setFilterAttributes({ ...filterAttributes, priceTo: undefined });
              } else if (regex.test(event.target.value)) {
                setFilterAttributes({ ...filterAttributes, priceTo: Number(event.target.value) });
              }
            }}
          />
        </FormControl>
        <IconButton
          color="error"
          disabled={!filterAttributes.priceTo}
          onClick={(): void => setFilterAttributes({ ...filterAttributes, priceTo: undefined })}
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
                  icon={<MusicNoteOutlinedIcon />}
                  checkedIcon={<MusicNoteIcon />}
                  checked={Boolean(filterAttributes[attribute.name])}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setFilterAttributes({
                      ...filterAttributes,
                      [attribute.name]: event.target.checked || undefined,
                    })
                  }
                />
              }
              label="On stock only"
            />
          </FormGroup>
        </Stack>
      ))}
      <Button
        fullWidth
        variant="outlined"
        disabled={Object.keys({ ...defaultFilterAttributes, ...appliedFilter }).every(
          (key) => defaultFilterAttributes[key] === appliedFilter[key],
        )}
        onClick={(): void => {
          setFilterAttributes(defaultFilterAttributes);
          setAppliedFilter(defaultFilterAttributes);
          setAppliedFilterCurrency(currency);

          dispatch(searchProductProjections({ filter: `categories.id:"${categoryId}"` }));
        }}
      >
        Reset applied filters
      </Button>
      <Button
        fullWidth
        variant="contained"
        disabled={
          Object.keys({ ...filterAttributes, ...appliedFilter }).every(
            (key) => filterAttributes[key] === appliedFilter[key],
          ) &&
          !(
            (Boolean(filterAttributes.priceFrom) || Boolean(filterAttributes.priceTo)) &&
            currency !== appliedFilterCurrency
          )
        }
        onClick={(): void => {
          setAppliedFilter(filterAttributes);
          setAppliedFilterCurrency(currency);
          const filterQueryArgArray = getFilterSearchQueryArg(filterAttributes);
          filterQueryArgArray.push(`categories.id:"${categoryId}"`);

          dispatch(searchProductProjections({ filter: filterQueryArgArray, priceCurrency: currency }));
        }}
      >
        Apply filters
      </Button>
    </Stack>
  );
};
