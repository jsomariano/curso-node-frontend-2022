import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>        
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App
