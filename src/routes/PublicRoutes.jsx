import { Outlet, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { AppLayout } from '../components/AppLayout';

const PublicRoutes = () => {
  return (
    <Route
      element={
        <ProtectedRoute allowGuest={true}>
          <Outlet />
        </ProtectedRoute>
      }
    >
      <Route path="" element={<AppLayout />} />
    </Route>
  );
};

export default PublicRoutes;
