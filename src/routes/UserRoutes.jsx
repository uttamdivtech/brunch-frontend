import { Outlet, Route } from 'react-router-dom';
import UserDashboard from '../dashboards/UserDashboard';
import { ProtectedRoute } from '../components/ProtectedRoute';
import UserMenu from '../dashboards/UserDashboard/UserMenu/UserMenu';

const UserRoutes = () => {
  return (
    <Route
      path="user/*"
      element={
        <ProtectedRoute allowedRoles={['user']}>
          <Outlet />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<UserDashboard />} />
      <Route path="menu" element={<UserMenu />} />
    </Route>
  );
};

export default UserRoutes;
