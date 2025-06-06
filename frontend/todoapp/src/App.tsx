import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage'
import type { JSX } from 'react';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { useAuth } from './contexts/AuthContext';

function App() {

  const { isAuthenticated } = useAuth()

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? children : <Navigate to="/register"/>
  };

  const PublicRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated ? <Navigate to="/home" /> : children;
};

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/home" : "/register"} />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
