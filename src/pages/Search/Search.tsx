import { Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { ProductsList } from '../../components/ProductList/ProductsList';
import { SEARCH_QUERY_PARAM } from '../../consts';

export const Search: React.FC = (): JSX.Element => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const searchQueryString = params.get(SEARCH_QUERY_PARAM) || undefined;

  return (
    <Container>
      <Typography mt={3} variant="h1" gutterBottom>
        Search results for "{searchQueryString || ''}"
      </Typography>
      <ProductsList textSearch={searchQueryString} />
    </Container>
  );
};
