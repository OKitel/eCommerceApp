import { Box, Card, CardContent, Typography } from '@mui/material';
import { FilterAttributes } from './FilterAttributes';

import { useAppSelector } from '../../../store/hooks';
import { ProgressLoader } from '../../ProgressLoader/ProgressLoader';

import './styles.scss';

export const ProductFilterMain: React.FC = (): JSX.Element => {
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

    return <FilterAttributes attributes={attributes} />;
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
