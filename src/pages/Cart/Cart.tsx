import { Box } from '@mui/material';
import wipUrl from '../../assets/images/wip.png';
import './styles.scss';
import { setAlert } from '../../slices/alertsSlice';
import { useAppDispatch } from '../../store/hooks';

export const Cart: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  dispatch(
    setAlert({
      message: `Dear cross-checker, you accidentally ended up on the cart page because of some magical Netlify tricks. Please, go to another pages and see what we've prepared for you!`,
      severity: 'info',
    }),
  );

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
