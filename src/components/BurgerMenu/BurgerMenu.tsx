import * as React from 'react';
import { useState } from 'react';
import Hidden from '@mui/material/Hidden';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Badge } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCustomerData } from '../../slices/customer/slice';
import { clearCart } from '../../slices/cart/slice';
import { LINKS } from '../consts';

import { CurrencySelector } from '../Header/CurrencySelector';

import './styles.scss';

export const BurgerMenu: React.FC = (): JSX.Element => {
  const customerData = useAppSelector((state) => state.customer.customerData);
  const progressIntrospect = useAppSelector((state) => state.customer.progress.introspect);
  const { activeCart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const numberOfCartLineItems = activeCart?.lineItems.length;

  return (
    <>
      <Hidden smUp>
        <IconButton onClick={(): void => setOpen(true)} color="secondary">
          <MenuIcon />
        </IconButton>
      </Hidden>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={(): void => setOpen(true)}
        onClose={(): void => setOpen(false)}
      >
        <div onClick={(): void => setOpen(false)} onKeyUp={(): void => setOpen(false)} role="button" tabIndex={0}>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <Button
          component={RouterLink}
          to={LINKS.cart}
          variant="text"
          color="primary"
          className="burger-button"
          aria-label="cart"
          onClick={(): void => {
            setOpen(false);
          }}
        >
          <Badge
            badgeContent={numberOfCartLineItems}
            color="secondary"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            data-testid="cart-icon-badge"
          >
            <ShoppingCartRoundedIcon />
          </Badge>
          &nbsp;Cart
        </Button>
        <Button
          component={RouterLink}
          to={LINKS.catalog}
          variant="text"
          color="primary"
          className="burger-button"
          onClick={(): void => {
            setOpen(false);
          }}
        >
          Catalog
        </Button>

        {progressIntrospect ? null : customerData ? (
          <>
            <Button
              component={RouterLink}
              to={LINKS.profile}
              variant="text"
              color="primary"
              className="burger-button"
              onClick={(): void => {
                setOpen(false);
              }}
            >
              Profile
            </Button>
            <Button
              component={RouterLink}
              to={LINKS.main}
              variant="outlined"
              color="primary"
              className="burger-button"
              onClick={(): void => {
                dispatch(clearCustomerData());
                dispatch(clearCart());
                setOpen(false);
              }}
            >
              <LogoutRoundedIcon />
              &nbsp;Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              component={RouterLink}
              to={LINKS.login}
              variant="text"
              color="primary"
              className="burger-button"
              onClick={(): void => {
                setOpen(false);
              }}
            >
              Login
            </Button>
            <Button
              component={RouterLink}
              to={LINKS.registration}
              variant="text"
              color="primary"
              className="burger-button"
              onClick={(): void => {
                setOpen(false);
              }}
            >
              Register
            </Button>
          </>
        )}
        <div className="burger-selector">
          <CurrencySelector />
        </div>
      </SwipeableDrawer>
    </>
  );
};
