import { Box } from '@mui/material';
import './styles.scss';

export const Cart: React.FC = (): JSX.Element => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <h2 className="cart-title">Cart Page</h2>
      </Box>
    </>
  );
};
