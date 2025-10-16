import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({
  allowedRoles,
  children,
  allowGuest = false,
}) => {
  const token = sessionStorage.getItem('token');
  const storedUser = sessionStorage.getItem('loggedInUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // 🔹 Agar user logged in nahi hai
  if (!user || !token) {
    if (allowGuest) return children; // guest allowed (like homepage)
    return <Navigate to="/" replace />; // otherwise redirect to home
  }

  // 🔹 Agar user logged in hai aur guest page pe hai (like "/")
  if (allowGuest) {
    if (user.role === 'user') return <Navigate to="/user/dashboard" replace />;
    if (user.role === 'owner')
      return <Navigate to="/owner/dashboard" replace />;
  }

  // 🔹 Agar role allowed nahi hai (unauthorized)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // 🔹 Otherwise render karo
  return children;
};
