import './App.css';
import { createContext, useState, useCallback, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
}
  from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import Home from './pages/Home.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import RootLayout from './pages/RootLayout.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Success from './pages/Success.jsx';
import Authenticate from './users/pages/Authenticate.jsx';
import MainNavigation from './components/MainNavigation.jsx';
import Users from './users/pages/Users.jsx';
import Menuitems from './menuitems/pages/Menuitems.jsx'
import AddMenuitem from './menuitems/pages/AddMenuitem.jsx'

import { AuthContext } from './shared/context/auth-context.js';


export const Context = createContext();

const queryClient = new QueryClient();

let logoutTimer;
function App() {

  const [cart, setCart] = useState([])
  const [token, setToken] = useState(false);
  const [userId, setuser] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setuser(uid);

    //current date + 1h
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationDate.toISOString()
      })
    )
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setuser(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token &&
      new Date(storedData.expiration) > new Date() //if greater, the expiration is in the future
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  let routes;
  if (token) {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<div className='default'><Home /></div>} />
          <Route path="/cart" element={<div className='default'><Cart /></div>} />
          <Route path="/checkout" element={<div className='default_left'><Checkout /></div>} />
          <Route path="/success" element={<div className='default_left'><Success /></div>} />
          <Route path="/auth" element={<div className='default'><Authenticate /></div>} />
          <Route path="/users" element={<div className='default'><Users /></div>} />
          <Route path="/edit" element={<div className='default'><Menuitems /></div>} />
          <Route path="/add" element={<div className='default'><AddMenuitem /></div>} />
        </Routes>

      </>
    );
  } else {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<div className='default'><Home /></div>} />
          <Route path="/auth" element={<div className='default'><Authenticate /></div>} />
          <Route path="/cart" element={<div className='default'><Navigate to="/auth" /></div>} />
          <Route path="/checkout" element={<div className='default_left'><Navigate to="/auth" /></div>} />
          <Route path="/success" element={<div className='default_left'><Navigate to="/auth" /></div>} />
          <Route path="/users" element={<div className='default'><Navigate to="/auth" /></div>} />
          <Route path="/edit" element={<div className='default'><Navigate to="/auth" /></div>} />
          <Route path="/add" element={<div className='default'><Navigate to="/auth" /></div>} />
        </Routes>
      </>
    );
  }

  return (

    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Context.Provider value={[cart, setCart]}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <RootLayout />
            <main>
              {routes}
            </main>

          </Router>
        </QueryClientProvider>
      </Context.Provider>
    </AuthContext.Provider>
  )
}

export default App
