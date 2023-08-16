import React from 'react';
import "./Footer.css"
import { Link } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext.js'

const Footer = () =>
{
  const { user, adminRights } = useUserContext()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: sssgustavsss@gmail.com</p>
          <p>Phone: +370 678-50-633</p>
          {/* Add other relevant contact information to your page */}
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            {user && <li><Link to="/cart">Cart</Link></li>}
            <li><Link to="/tracking">Order Tracking</Link></li>
            {!user && <li><Link to="/login">Login/Register</Link></li>}
            {adminRights && <li><Link to="/admin">Admin</Link></li>}
            {/* Add other relevant links to your pages */}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/jevgenij-truksin/" target="_blank" rel="noopener noreferrer">
                <img src="/icons/linkedin-icon.svg" alt="LinkedIn" />
              </a>
            </li>
            <li>
              <a href="https://www.github.com/TheCukrus" target="_blank" rel="noopener noreferrer">
                <img src="/icons/github-icon.svg" alt="Github" />
              </a>
            </li>
          </ul>
          {/* Add social media icons or links here */}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mamos Virtuvė. All rights reserved.</p>
        {/* Add additional copyright or legal information if needed */}
      </div>
    </footer>
  );
};

export default Footer;
