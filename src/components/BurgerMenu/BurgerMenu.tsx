import * as React from 'react';
import { useState } from 'react';
import Hidden from '@mui/material/Hidden';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCustomerData } from '../../slices/customer/slice';
import './styles.scss';

// eslint-disable-next-line max-lines-per-function
export const BurgerMenu: React.FC = (): JSX.Element => {
  const customerData = useAppSelector((state) => state.customer.customerData);
  const progressIntrospect = useAppSelector((state) => state.customer.progress.introspect);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClickCart = (): void => navigate('/cart');
  const [open, setOpen] = useState(false);

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
        <IconButton
          size="medium"
          color="inherit"
          onClick={(): void => {
            handleClickCart();
            setOpen(false);
          }}
        >
          <ShoppingCartRoundedIcon />
        </IconButton>
        {progressIntrospect ? null : customerData ? (
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="secondary"
            className="burger-button"
            onClick={(): void => {
              dispatch(clearCustomerData());
              setOpen(false);
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              color="secondary"
              className="burger-button"
              onClick={(): void => {
                setOpen(false);
              }}
            >
              Login
            </Button>
            <Button
              component={RouterLink}
              to="/registration"
              color="secondary"
              variant="contained"
              className="burger-button"
              onClick={(): void => {
                setOpen(false);
              }}
            >
              Register
            </Button>
          </>
        )}
      </SwipeableDrawer>
    </>
  );
};