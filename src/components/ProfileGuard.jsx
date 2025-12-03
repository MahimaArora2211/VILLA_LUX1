import { Navigate } from 'react-router-dom';
import { isUserLoggedIn } from '../utils/auth';

export default function ProfileGuard({ children }) {
  if (!isUserLoggedIn()) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}