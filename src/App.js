import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/admin/admin_dashboard/AdminDashboard';
import UpdateProduct from './pages/admin/updateProduct/UpdateProduct';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import AdminRoutes from './protected_routes/AdminRoutes';
import UserRoutes from './protected_routes/UserRoutes';
import Profile from './pages/profile/Profile';
import Stopwatch from './pages/test/Stopwatch';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route
          path='/watch'
          element={<Stopwatch/>}
        />

        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        {/* Admin Routes */}
        <Route element={<AdminRoutes/>}>
          <Route path='/admin/dashboard' element={<AdminDashboard />}
          />
          <Route
            path='/admin/update/:id'
            element={<UpdateProduct />}></Route>
        </Route>

        {/* User Routes */}
      <Route element={<UserRoutes/>}>
        <Route path='/profile'element={<Profile/>} />


      </Route>




      </Routes>
    </Router>
  );
}

export default App;
