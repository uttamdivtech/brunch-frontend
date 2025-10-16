import { Outlet, Route } from 'react-router-dom';
import OwnerDashboard from '../dashboards/OwnerDashboard';
import { ProtectedRoute } from '../components/ProtectedRoute';
import MyHotel from '../dashboards/OwnerDashboard/MyHotel';
import MenuManagement from '../dashboards/OwnerDashboard/MyMenu';

const OwnerRoutes = () => {
  return (
    <Route
      path="owner/*"
      element={
        <ProtectedRoute allowedRoles={['owner']}>
          <Outlet />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<OwnerDashboard />} />
      <Route path="hotel" element={<MyHotel />} />
      <Route path="menu" element={<MenuManagement />} />
    </Route>
  );
};

export default OwnerRoutes;
