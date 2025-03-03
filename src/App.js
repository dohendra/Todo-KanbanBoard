import React, {  Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './utlis/PrivateRoute.jsx'
import TaskManagement from './Pages/TaskManagement/TaskManagement.jsx';

// Lazy load components
const LoginForm = lazy(() => import('./Pages/LoginForm/LoginForm'));
const LoginFormGoogle = lazy(() => import('./Pages/LoginForm/LoginFormGoogle'));
const RegistrationForm = lazy(() => import('./Pages/RegistrationForm/RegistrationForm'));
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
const PageNotFound = lazy(() => import('./Pages/PageNotFound/PageNotFound'));

function App() {
  

  return (
    <Router>
      <div className="App">
        <div className="container d-flex align-items-center flex-column">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={<LoginForm />}
                // element={<LoginFormGoogle />}
              />
              <Route
                path="/register"
                element={<RegistrationForm />}
              />
              <Route
                path="/login"
                element={<LoginForm />}
                // element={<LoginFormGoogle />}
              />
              <Route
              
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                   </PrivateRoute>
                }
              />
              <Route
              
                path="/task-management"
                element={
                  <PrivateRoute>
                    <TaskManagement />
                   </PrivateRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />

            </Routes>
          </Suspense>
          {/* <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/> */}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
