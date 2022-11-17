import LayoutComponent from './components/Layout';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Users = lazy(() => import('./pages/Users'));
const Login = lazy(() => import('./pages/Login'));


const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth")

  if (isAuthenticated) {
    return (
      <LayoutComponent>
        {children}
      </LayoutComponent>
    )
  }

  return <Navigate to="/login" />;
};

const App = () => (
  <Router>
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  </Router>
);

export default App
