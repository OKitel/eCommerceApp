import { Box, Container, Typography } from '@mui/material';

import './styles.scss';

export const Catalog: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Catalog
      </Typography>
      <Box className="catalog"></Box>
    </Container>
  );
};
