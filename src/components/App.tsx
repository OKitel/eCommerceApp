import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '../pages/NotFound/NotFound';
import { Registration } from '../pages/Registration/Registration';
import { Login } from '../pages/Login/Login';
import { Header } from './Header/Header';
import { AlertsSnackbar } from './AlertsSnackbar/AlertsSnackbar';
import { getLoggedInCustomer } from '../slices/customer/slice';
import { useAppDispatch } from '../store/hooks';
import { Cart } from '../pages/Cart/Cart';
import { Main } from '../pages/Main/Main';
import { LINKS } from './consts';
import { Catalog } from '../pages/Catalog/Catalog';
import { Profile } from '../pages/Profile/Profile';

export const App: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLoggedInCustomer());
  }, [dispatch]);

  return (
    <>
      <AlertsSnackbar />
      <Header />
      <Routes>
        <Route path={LINKS.main} element={<Main />}></Route>
        <Route path={LINKS.login} element={<Login />}></Route>
        <Route path={LINKS.registration} element={<Registration />}></Route>
        <Route path={LINKS.cart} element={<Cart />}></Route>
        <Route path={LINKS.catalog} element={<Catalog />}></Route>
        <Route path={LINKS.profile} element={<Profile />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
