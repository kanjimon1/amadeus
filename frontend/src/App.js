import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './assets/styles/main.css';
import Navbar from './components/common/Navbar';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Footer from './components/common/Footer';
import MainPage from './components/inside/Main';
import UsersExtraHours from './components/inside/UsersExtraHours';
import EmployeesList from './components/inside/EmployeesList';
import ProductList from './components/inside/ProductList';
//import Layout from './components/common/Layout';
import { AuthProvider, AuthContext } from './components/context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, auth } = useContext(AuthContext);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(auth.role)) {
    return auth.role === 'ADMIN' ? <Navigate to="/main" replace /> : <Navigate to="/users-extra-hours" replace />;
  }

  return children;
};

function App() {
  return (
    < BrowserRouter >
      <AuthProvider>
        <div>
          <header>
            <Navbar />
          </header>
          <main>
            {/*<Routes>*/}

            {/*<Route exact path="/" element={<LoginForm />} />
              <Route exact path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />*/}
            {/*<Route path="/main" element={<MainPage />} />
            <Route path="/users-extra-hours" element={<UsersExtraHours />} />
            <Route path="/employees" component={EmployeesList} />
            <Route path="/products" component={ProductList} />*/}
            {/* Protected Routes */}
            {/*<Route
                path="/main"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <Layout>
                      <MainPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users-extra-hours"
                element={
                  <ProtectedRoute allowedRoles={['USER', 'ADMIN']}>
                    <Layout>
                      <UsersExtraHours />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <Layout>
                      <EmployeesList />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <Layout>
                      <ProductList />
                    </Layout>
                  </ProtectedRoute>
                }
              />*/}
            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {/*{UserService.adminOnly() && (
              <>
                <Route path="/main" element={<MainPage />} />
              </>
            )}*/}
            {/*<Route path="*" element={<Navigate to="/login" />} />‰*/}

            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/main"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <MainPage />
                  </ProtectedRoute>
                }
              >
                <Route path="employees" element={<EmployeesList />} />
                <Route path="products" element={<ProductList />} />
                <Route path="users-extra-hours" element={<UsersExtraHours />} />
              </Route>
              <Route
                path="/users-extra-hours"
                element={
                  <ProtectedRoute allowedRoles={['USER', 'ADMIN']}>
                    <UsersExtraHours />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </ Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </AuthProvider>
    </BrowserRouter >
  );
};

export default App;
