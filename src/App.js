import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import HomePage from './pages/home/homePage';
import AboutPage from './pages/about/aboutPage';
import NavBar from './layouts/navbar/navBar';
import StorePage from './pages/store/storePage';
import PlantDetailPage from './components/plants/plantDetail';
import Login from './pages/authentication/login/loginPage';
import Register from './pages/authentication/register/registerPage';
import ChangePassword from './pages/authentication/changepassword/changePasswordPage';
import Footer from './layouts/footer/footer';
import PostPage from './pages/posts/postPage';
import ProfileModal from './pages/profile/profileModal';
import Cart from './pages/cart/cartPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changepass" element={<ChangePassword />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/plant/:id" element={<PlantDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfileModal />} />
          <Route path="/posts" element={<PostPage />} />
          
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
