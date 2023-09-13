import { Box, Container, Paper } from '@mui/material';

import { CartStepper } from '../../components/CartStepper/CartStepper';
import { CartLineItem } from '../../components/CartLineItem/CartLineItem';
import { CartSummary } from '../../components/CartSummary/CartSummary';

import './styles.scss';

export const Cart: React.FC = (): JSX.Element => {
  return (
    <>
      <Container sx={{ mt: 5 }}>
        <CartStepper />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <Paper elevation={3} sx={{ flex: '60%', padding: '2rem' }}>
            <CartLineItem />
          </Paper>
          <CartSummary />
        </Box>
      </Container>
    </>
  );
};
