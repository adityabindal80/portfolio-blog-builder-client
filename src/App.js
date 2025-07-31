import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ViewBlog from './pages/ViewBlog';
import LoggedInNavbar from './components/LoggedInNavbar';

import { useLocation } from 'react-router-dom';

import { useAuth } from './context/AuthContext';
import PublicPortfolio from './pages/PublicPortfolio';
import Feedback from './pages/Feedback';
import Footer from './components/Footer';

// PrivateRoute component
const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Login />;
};
function App() {
  const location = useLocation();

const isLoggedInRoute = ["/dashboard", "/about", "/blogs", "/user","/feedback"].some(path =>
  location.pathname.startsWith(path)
);

const renderNavbar = () => {
  if (isLoggedInRoute) return <LoggedInNavbar />;
  return <Navbar />;
};

  const { user } = useAuth();
  return (
    
    <>
      {renderNavbar()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element = {<Login/>}/>
        
        <Route path='/register' element = {<Register/>}/>
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/user/:username" element={<PublicPortfolio />} />
        <Route path="/blogs/:id" element={<PrivateRoute element={<ViewBlog />} />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
