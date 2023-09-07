import { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getCategories } from '../../../slices/categories/slice';
import { ChipBreadcrumbs } from '../../../components/Breadcrumbs/Breadcrumbs';
import { ProgressLoader } from '../../../components/ProgressLoader/ProgressLoader';
import { CategoryContent } from '../../../components/CategoryContent/CategoryContent';
import { CatalogCategoryCard } from '../../../components/CatalogCategoryCard/CatalogCategoryCard';
import { URL_PARAMS } from '../../../components/consts';

export const Category: React.FC = (): JSX.Element => {
  const { [URL_PARAMS.categorySlug]: categorySlug } = useParams();
  const dispatch = useAppDispatch();
  const { localization } = useAppSelector((state) => state.settings);

  const { categories, progress: progressCategories } = useAppSelector((state) => state.categories);

  const currentCategory = categories?.find((category) => category.slug[localization] === categorySlug);

  useEffect(() => {
    if (!categories) {
      dispatch(getCategories());
    }
  }, [categories, dispatch]);

  if (progressCategories) {
    return (
      <Container>
        <ProgressLoader />
      </Container>
    );
  }

  if (!currentCategory) {
    return (
      <Container>
        <Box marginY={3}>
          <ChipBreadcrumbs />
        </Box>
        <Typography variant="h1" gutterBottom>
          No category found
        </Typography>
      </Container>
    );
  }

  const rootCategories = categories?.filter((category) => !category.parent);
  const rootCategoryId = currentCategory.parent ? currentCategory.parent.id : currentCategory.id;

  return (
    <Container>
      <Box marginY={3}>
        <ChipBreadcrumbs />
      </Box>
      <Typography variant="h1" gutterBottom>
        Catalog
      </Typography>
      <Typography variant="h5">Categories</Typography>
      {rootCategories && (
        <Box className="category-cards">
          {rootCategories.map((category) => (
            <CatalogCategoryCard active={category.id === rootCategoryId} key={category.id} category={category} />
          ))}
        </Box>
      )}
      <CategoryContent category={currentCategory} />
    </Container>
  );
};
