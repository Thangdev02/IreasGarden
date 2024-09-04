import React from 'react';
import '../footer/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-column">
          <h3 className="footer-logo">Ireas</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>info@example.com</p>
          <p>+123 456 789</p>
          <p>123 Main Street, New York, NY 10001</p>
        </div>
        <div className="footer-column">
          <h4>News</h4>
          <ul>
            <li>
              <span className="date">20 Jul, 2021</span>
              <a href="#">A Clean Water Gives More Good Taste</a>
            </li>
            <li>
              <span className="date">20 Jul, 2021</span>
              <a href="#">A Clean Water Gives More Good Taste</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Explore</h4>
          <ul>
            <li><a href="#">New Projects</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Get in Touch</a></li>
            <li><a href="#">Volunteers</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Newsletter</h4>
          <p>Sign up now to get daily latest news & updates from us</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Email Address" />
            <button type="submit">Go</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
