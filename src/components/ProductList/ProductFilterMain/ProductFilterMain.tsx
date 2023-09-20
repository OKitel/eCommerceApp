import { Box, Card, CardContent, Typography } from '@mui/material';

import { useAppSelector } from '../../../store/hooks';
import { TFilterAttributes } from '../types';

import { ProgressLoader } from '../../ProgressLoader/ProgressLoader';
import { FilterAttributes } from './FilterAttributes/FilterAttributes';

import './styles.scss';

type Props = {
  applyFilters: (filterAttributes: TFilterAttributes) => void;
};

export const ProductFilterMain: React.FC<Props> = ({ applyFilters }): JSX.Element => {
  const {
    types: { main: mainProductType },
    progress,
  } = useAppSelector((state) => state.productTypes);

  if (progress) {
    return <ProgressLoader />;
  }

  if (!mainProductType) {
    return <Box className="product-filter">No filters available for the current product type</Box>;
  }

  const { attributes } = mainProductType;

  const renderFilterAttributes = (): React.ReactElement | React.ReactElement[] => {
    if (!attributes) {
      return <Box className="product-filter">No filters attributes available</Box>;
    }

    return <FilterAttributes attributes={attributes} applyFilters={applyFilters} />;
  };

  return (
    <Card className="product-filter">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Filters
        </Typography>
        {renderFilterAttributes()}
      </CardContent>
    </Card>
  );
};
