import { Box } from '@mui/material';
import wipUrl from '../../assets/images/wip.png';
import './styles.scss';

export const Cart: React.FC = (): JSX.Element => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <h2 className="cart-title">Cart Page</h2>
        <div className="wip-container">
          <img className="wip-image" src={wipUrl} alt="work in progress" />
          <h4 className="wip-text">WORK IN PROGRESS</h4>
        </div>
      </Box>
    </>
  );
};
