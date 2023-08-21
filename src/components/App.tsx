import { Routes, Route } from 'react-router-dom';
import { NotFound } from '../pages/NotFound/NotFound';
import { Header } from './Header/Header';
import { Cart } from '../pages/Cart/Cart';
import { Main } from '../pages/Main/Main';

export const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<h1>Login Page</h1>}></Route>
        <Route path="/registration" element={<h1>Registration Page</h1>}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
