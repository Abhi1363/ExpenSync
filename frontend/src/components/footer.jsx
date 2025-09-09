import React from "react";
import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
   
        <div className="footer-brand">
          <span className="logos"> Expensync</span>
          <p className="tagline">Track. Manage. Grow.</p>
        </div>

    
        <div className="footer-contact">
         <p>
        Expensync HQ<br></br>
        3rd Floor, Sunrise Tech Park,<br></br>
        Hinjewadi Phase 1, Pune, MH 411057
      </p>
      <p>
        Email: <a href="mailto:support@expensync.com">support@expensync.com</a><br></br>
        Phone: <a href="tel:+919999999999">+91 99999 99999</a>
      </p>
          
        </div>

        <div className="footer-social">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">💼</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">💻</a>
        </div>
      </div>

      <div className="footer-bottom">
        © {currentYear} Expensync. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
