import { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCategories } from '../../slices/categories/slice';
import { ChipBreadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { CatalogCategory } from '../../components/CatalogCategory/CatalogCategory';
import { ProgressLoader } from '../../components/ProgressLoader/ProgressLoader';

import './styles.scss';

export const Catalog: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { categories, progress } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (!categories) {
      dispatch(getCategories());
    }
  }, [categories, dispatch]);

  const renderCatalogContent = (): React.ReactElement | React.ReactElement[] | null => {
    if (progress) {
      return <ProgressLoader />;
    }

    if (!categories) {
      return null;
    }

    const rootCategories = categories.filter((category) => !category.parent);

    return (
      <Box className="category-cards">
        {rootCategories.map((category) => (
          <CatalogCategory key={category.id} category={category} />
        ))}
      </Box>
    );
  };

  return (
    <Container>
      <Box marginY={3}>
        <ChipBreadcrumbs />
      </Box>
      <Typography variant="h1" gutterBottom>
        Catalog
      </Typography>
      {renderCatalogContent()}
    </Container>
  );
};
