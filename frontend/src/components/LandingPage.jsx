import React, { useEffect } from "react";
import "./landingpage.css";
import Video from "../assets/generated-video.mp4"
import Footer from "./footer";
import logo from "../assets/logo.jpg"

const LandingPage = () => {

  useEffect(() => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }, []);

  return (
    <>
      <header>
        <div
          className="nav"
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <img src={logo} alt="" />
          ExpenSync
        </div>
        <nav>
          <a href="#reviews">Reviews</a>
          <a href="#reviews">Contact Us</a>
        </nav>
        <div className="cta-buttons">
          <a href="http://localhost:3003/login">Get started</a>
        </div>
      </header>

      <section className="hero">
        <h1>Your's Personal expense tracking system</h1>
        <p>This is your personal expense tracker that monitors your expenses.</p>
        <div className="hero-buttons">
          <a href="#about">Tell me more</a>
        </div>
      </section>

      <section className="brands">
        <h3>Trusted by teams at:</h3>
        <div className="brands-logos">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
            alt="Brand 1"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Brand 2"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
            alt="Brand 3"
          />
        </div>
      </section>

      <section>
        <div style={{ display: "flex", margin: "auto", justifyContent: "center", padding: "80px",  backgroundColor:"beige"}}>
         <video src={Video} autoPlay muted loop></video>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <h2>Tell Me More</h2>
          <p>
            Expensync is a simple and powerful expense tracker that helps you manage your
            personal finances with ease. You can add your daily expenses, categorize them,
            and get a clear picture of where your money goes. With features like
            transaction history, category insights, and PDF reports, staying on top of
            your budget has never been easier.
          </p>

          <div className="features">
            <div className="feature-box">
              <h3><i className="fa fa-pie-chart icon inline"/> Track Expenses</h3>
              <p>Record every transaction and keep your budget organized.</p>
            </div>
            <div className="feature-box">
              <h3><i className="fa fa-folder-open icon inline"/> Categories</h3>
              <p>Group expenses into categories for better insights.</p>
            </div>
            <div className="feature-box">
              <h3><i className="fa fa-file-text icon inline"/> Reports</h3>
              <p>Generate reports and download them in PDF for future reference.</p>
            </div>
            <div className="feature-box">
              <h3><i className="fa fa-lock icon inline"/> Secure</h3>
              <p>Your data is protected with authentication and encryption.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews">
        <h2>What Our Users Say</h2>

        <div className="reviews-container">
            <div className="review-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"This tracker helped me save more every month!"</p>
            <div className="reviewer">
              <i className="fa fa-user-circle icon small" aria-hidden="true"></i>
              <h4>- Ankit</h4>
            </div>
          </div>

            <div className="review-card">
            <div className="stars">⭐⭐⭐⭐☆</div>
            <p>"Clean design and easy to use. Great work!"</p>
            <div className="reviewer">
              <i className="fa fa-user-circle icon small" aria-hidden="true"></i>
              <h4>- Priya</h4>
            </div>
          </div>

            <div className="review-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"The statistics graphs are awesome. Very useful!"</p>
            <div className="reviewer">
              <i className="fa fa-user-circle icon small" aria-hidden="true"></i>
              <h4>- Rohan</h4>
            </div>
          </div>
        </div>
      </section>
<Footer></Footer>
   
    </>
  );
};

export default LandingPage;
