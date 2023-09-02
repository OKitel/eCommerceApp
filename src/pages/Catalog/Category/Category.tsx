import { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getCategories } from '../../../slices/categories/slice';
import { ChipBreadcrumbs } from '../../../components/Breadcrumbs/Breadcrumbs';
import { ProgressLoader } from '../../../components/ProgressLoader/ProgressLoader';
import { CategoryContent } from '../../../components/CategoryContent/CategoryContent';
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

  return (
    <Container>
      <Box marginY={3}>
        <ChipBreadcrumbs />
      </Box>
      <Typography variant="h1" gutterBottom>
        {currentCategory.name[localization]}
      </Typography>
      <CategoryContent category={currentCategory} />
    </Container>
  );
};
