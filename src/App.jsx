import { Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useContext } from 'react';
import { ResetPassword } from './modals/ResetPassword';
import { LoginContext } from './contexts/LoginProvider/LoginContext';
import Navbar from './components/common/Navbar';
import PublicRoutes from './routes/PublicRoutes';
import UserRoutes from './routes/UserRoutes';
import OwnerRoutes from './routes/OwnerRoutes';
import { NotFound } from './components/common/NotFound';

const App = () => {
  const { setLoggedInUser } = useContext(LoginContext);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    setLoggedInUser(!!storedUser);
  }, [setLoggedInUser]);

  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          {PublicRoutes()}
          {UserRoutes()}
          {OwnerRoutes()}
        </Route>

        {/* Reset Password */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};
export default App;
