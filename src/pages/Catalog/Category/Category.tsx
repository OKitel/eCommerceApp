import { Box, Container, Typography } from '@mui/material';

import './styles.scss';

export const Category: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Category
      </Typography>
      <Box className="category"></Box>
    </Container>
  );
};
