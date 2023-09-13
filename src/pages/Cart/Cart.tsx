import { Box, Container, Paper } from '@mui/material';

import { useAppSelector } from '../../store/hooks';

import { CartStepper } from '../../components/CartStepper/CartStepper';
import { CartLineItem } from '../../components/CartLineItem/CartLineItem';
import { CartSummary } from '../../components/CartSummary/CartSummary';
import { EmptyCart } from '../../components/EmptyCart/EmptyCart';

import './styles.scss';

export const Cart: React.FC = (): JSX.Element => {
  const { activeCart } = useAppSelector((state) => state.cart);

  if (activeCart) {
    const { lineItems } = activeCart;

    if (lineItems.length !== 0) {
      return (
        <>
          <Container sx={{ mt: 5 }}>
            <CartStepper />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <Paper elevation={3} sx={{ flex: '60%', padding: '2rem' }}>
                {lineItems.map((item) => {
                  console.log(item);
                  return <CartLineItem />;
                })}
              </Paper>
              <CartSummary />
            </Box>
          </Container>
        </>
      );
    }
  }

  return (
    <>
      <EmptyCart />
    </>
  );
};
