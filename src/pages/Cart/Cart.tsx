import { Box, Container, Paper } from '@mui/material';

import { useAppSelector } from '../../store/hooks';

import { CartStepper } from '../../components/CartStepper/CartStepper';
import { CartLineItem } from '../../components/CartLineItem/CartLineItem';
import { CartSummary } from '../../components/CartSummary/CartSummary';
import { EmptyCart } from '../../components/EmptyCart/EmptyCart';
import { ProgressLoader } from '../../components/ProgressLoader/ProgressLoader';

import './styles.scss';

export const Cart: React.FC = (): JSX.Element => {
  const { activeCart, progress } = useAppSelector((state) => state.cart);

  if (progress.getActiveCart) {
    return (
      <Container sx={{ mt: 5 }}>
        <ProgressLoader />
      </Container>
    );
  }

  if (activeCart) {
    const { lineItems } = activeCart;

    if (lineItems.length !== 0) {
      return (
        <>
          <Container sx={{ mt: 5 }}>
            <CartStepper />
            <Box className="cart_wrapper">
              <Paper elevation={3} className="cart-items_wrapper">
                {lineItems.map((item, index) => {
                  return <CartLineItem key={item.id} item={item} isLast={index === lineItems.length - 1} />;
                })}
              </Paper>
              <CartSummary cart={activeCart} />
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
