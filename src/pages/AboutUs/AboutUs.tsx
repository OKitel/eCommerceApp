import { Container, Typography } from '@mui/material';

import './styles.scss';

export const AboutUs: React.FC = (): JSX.Element => {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h1" className="about-title">
        About us
      </Typography>
    </Container>
  );
};
