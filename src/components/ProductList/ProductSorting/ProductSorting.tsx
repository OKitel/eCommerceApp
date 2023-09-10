import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';

import { useAppSelector } from '../../../store/hooks';
import { getSortingOptions } from './utils';
import { SORTING_ORDER_LABEL } from './consts';
import { TSortingOrder, TSortingParams } from '../types';

import { ProgressLoader } from '../../ProgressLoader/ProgressLoader';

import './styles.scss';

type Props = {
  applySorting: (sortingParams: TSortingParams) => void;
};

export const ProductSorting: React.FC<Props> = ({ applySorting }): JSX.Element => {
  const { localization } = useAppSelector((state) => state.settings);
  const {
    types: { main: mainProductType },
    progress,
  } = useAppSelector((state) => state.productTypes);

  const [sortingParam, setSortingParam] = useState<string>('');
  const [sortingOrder, setSortingOrder] = useState<TSortingOrder | ''>('');

  const [appliedSortingParam, setAppliedSortingParam] = useState<string>('');
  const [appliedSortingOrder, setAppliedSortingOrder] = useState<TSortingOrder | ''>('');

  if (progress) {
    return <ProgressLoader />;
  }

  if (!mainProductType) {
    return <Box className="product-filter">No sorting params available for the current product type</Box>;
  }

  const { attributes } = mainProductType;

  if (!attributes) {
    return <Box className="product-sorting">No sorting params available</Box>;
  }

  const sortingOptions = getSortingOptions(attributes, localization);

  const isButtonResetDisabled = !appliedSortingParam || !appliedSortingOrder;
  const isButtonApplyDisabled =
    (sortingParam === appliedSortingParam && sortingOrder === appliedSortingOrder) || !sortingParam || !sortingOrder;

  const handleClickApplySorting = (): void => {
    setAppliedSortingParam(sortingParam);
    setAppliedSortingOrder(sortingOrder);

    applySorting({ [sortingParam]: sortingOrder });
  };

  const handleClickResetSorting = (): void => {
    setSortingParam('');
    setSortingOrder('');
    setAppliedSortingParam('');
    setAppliedSortingOrder('');

    applySorting({});
  };

  return (
    <Card className="product-sorting">
      <CardContent>
        <Stack gap="1rem">
          <Stack direction="row" justifyContent="end" alignItems="center" gap="1rem" flexWrap="wrap">
            <Typography variant="h5" component="div">
              Sort
            </Typography>
            <Stack direction="row" gap="1rem">
              <FormControl>
                <InputLabel size="small" id={'sorting-by-select-label'}>
                  By
                </InputLabel>
                <Select
                  sx={{ width: '10rem' }}
                  labelId={'sorting-by-select-label'}
                  id={'sorting-by-select'}
                  value={sortingParam}
                  label="By"
                  size="small"
                  onChange={(event: SelectChangeEvent): void => setSortingParam(event.target.value)}
                >
                  {sortingOptions.map((sortingOption) => (
                    <MenuItem key={sortingOption.key} value={sortingOption.key}>
                      {sortingOption.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel size="small" id={'sorting-order-select-label'}>
                  In order
                </InputLabel>
                <Select
                  sx={{ width: '10rem' }}
                  labelId={'sorting-order-select-label'}
                  id={'sorting-order-select'}
                  value={sortingOrder}
                  label="In order"
                  size="small"
                  onChange={(event: SelectChangeEvent): void => setSortingOrder(event.target.value as TSortingOrder)}
                >
                  <MenuItem key="asc" value="asc">
                    Ascending
                  </MenuItem>
                  <MenuItem key="desc" value="desc">
                    Descending
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="row" gap="1rem">
              <Button variant="outlined" disabled={isButtonResetDisabled} onClick={handleClickResetSorting}>
                Reset
              </Button>
              <Button variant="contained" disabled={isButtonApplyDisabled} onClick={handleClickApplySorting}>
                Apply
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="end" alignItems="center" gap="1rem" flexWrap="wrap">
            {!appliedSortingParam || !appliedSortingOrder
              ? 'There is no sorting applied'
              : `Now sorted by ${appliedSortingParam} ${SORTING_ORDER_LABEL[appliedSortingOrder]}`}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
