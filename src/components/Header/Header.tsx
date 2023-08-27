import * as React from 'react';
import Hidden from '@mui/material/Hidden';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCustomerData } from '../../slices/customer/slice';
import { LINKS } from '../consts';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import './styles.scss';

export const Header: React.FC = (): JSX.Element => {
  const customerData = useAppSelector((state) => state.customer.customerData);
  const progressIntrospect = useAppSelector((state) => state.customer.progress.introspect);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClickCart = (): void => navigate(LINKS.cart);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <div className="logo">
            <RouterLink to={LINKS.main} className="logo-main">
              Maestro
              <span className="logo-sub">Market</span>
            </RouterLink>
          </div>
          <Hidden smDown>
            <div>
              <IconButton size="medium" color="inherit" onClick={handleClickCart}>
                <ShoppingCartRoundedIcon />
              </IconButton>
              {progressIntrospect ? null : customerData ? (
                <Button
                  component={RouterLink}
                  to={LINKS.main}
                  variant="contained"
                  color="secondary"
                  onClick={(): void => {
                    dispatch(clearCustomerData());
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button component={RouterLink} to={LINKS.login} variant="contained" sx={{ m: 1 }} color="secondary">
                    Login
                  </Button>
                  <Button component={RouterLink} to={LINKS.registration} color="secondary" variant="contained">
                    Register
                  </Button>
                </>
              )}
            </div>
          </Hidden>
          <BurgerMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
