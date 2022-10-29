import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token")
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
  <Router>
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  </Router>
);

export default App
