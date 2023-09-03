import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useAppSelector } from '../../../../store/hooks';
import {
  ATTRIBUTE_NAME_LOWER_PRICE_BOUND,
  ATTRIBUTE_NAME_UPPER_PRICE_BOUND,
  REGEXP_NUMERIC_ONLY,
  REGEXP_PRICE,
} from './consts';
import { TFilterAttributes } from '../types';
import { TPriceAttribute } from './types';

type Props = {
  filterAttributes: TFilterAttributes;
  setFilterAttributes: React.Dispatch<React.SetStateAction<TFilterAttributes>>;
  resetFilterAttribute: (attributeName: string) => void;
};

export const PriceFilterAttributes: React.FC<Props> = ({
  filterAttributes,
  setFilterAttributes,
  resetFilterAttribute,
}): JSX.Element => {
  const { currency } = useAppSelector((state) => state.settings);

  const handleBeforeInputPriceNumber = (event: React.CompositionEvent<HTMLInputElement>): void => {
    // prevent input of some non-decimal signs that html input with type="number"
    // allows to type in without calling the change event
    if (!REGEXP_NUMERIC_ONLY.test(event.data)) {
      event.preventDefault();
    }
  };

  const changePrice = (priceValue: string, priceAttributeName: TPriceAttribute): void => {
    if (priceValue === '') {
      resetFilterAttribute(priceAttributeName);
    } else if (REGEXP_PRICE.test(priceValue)) {
      setFilterAttributes({ ...filterAttributes, [priceAttributeName]: Number(priceValue) });
    }
  };

  return (
    <>
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
    </>
  );
};
