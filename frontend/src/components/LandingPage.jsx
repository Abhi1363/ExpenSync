import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.css";
import Video from "../assets/generated-video.mp4";
import Footer from "./footer";
import logo from "../assets/newLogo.png";

const featureCards = [
  {
    title: "Track every transaction",
    text: "Log daily spending in seconds and keep your finances organized in one place.",
  },
  {
    title: "See category patterns",
    text: "Understand where money goes with clear breakdowns for food, travel, bills, and more.",
  },
  {
    title: "Stay budget aware",
    text: "Watch monthly budgets and get a clear signal before overspending becomes a problem.",
  },
  {
    title: "Export with confidence",
    text: "Share clean reports and keep a reliable record of your financial activity when needed.",
  },
];

const steps = [
  {
    label: "01",
    title: "Add expenses",
    text: "Capture each payment as it happens or review the full month later.",
  },
  {
    label: "02",
    title: "Review insights",
    text: "Use charts, categories, and trends to understand your habits at a glance.",
  },
  {
    label: "03",
    title: "Improve monthly",
    text: "Adjust budgets, cut waste, and make better decisions with less guesswork.",
  },
];

const testimonials = [
  {
    quote:
      "The dashboard feels polished and practical. I can finally see where my money is going without digging through spreadsheets.",
    name: "Ankit Sharma",
    role: "Freelancer",
  },
  {
    quote:
      "It is simple enough for daily use, but the reporting is strong enough for serious budgeting.",
    name: "Priya Nair",
    role: "Operations Lead",
  },
  {
    quote:
      "The layout looks like a real product now. It feels trustworthy and easy to explain to users.",
    name: "Rohan Mehta",
    role: "Product Designer",
  },
];

const metrics = [
  { value: "24/7", label: "expense visibility" },
  { value: "3 min", label: "to get started" },
  { value: "100%", label: "private by design" },
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <Link to="/" className="brand">
          <img src={logo} alt="ExpenSync logo" className="brand-logo" />
          <span className="brand-name">ExpenSync</span>
        </Link>

        <nav className="header-nav" aria-label="Primary">
          <a href="#features">Features</a>
          <a href="#workflow">How it works</a>
          <a href="#reviews">Reviews</a>
        </nav>

        <div className="cta-buttons">
          <Link to="/login" className="button button-ghost">
            Sign in
          </Link>
          <Link to="/signup" className="button button-solid">
            Get started
          </Link>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Expense tracking built for real life</p>
            <h1>See where every rupee goes, then take control of your budget.</h1>
            <p className="hero-text">
              ExpenSync gives individuals and small teams a clean, professional
              place to track spending, spot patterns, and make better financial
              decisions with less effort.
            </p>

            <div className="hero-actions">
              <Link to="/signup" className="button button-solid">
                Start free
              </Link>
              <a href="#features" className="button button-secondary">
                Explore features
              </a>
            </div>

            <ul className="hero-points">
              <li>Simple transaction capture</li>
              <li>Category-based insights</li>
              <li>Monthly budget visibility</li>
            </ul>

            <div className="hero-metrics" aria-label="Platform highlights">
              {metrics.map((metric) => (
                <div className="metric-card" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="dashboard-shell">
              <div className="dashboard-topbar">
                <span />
                <span />
                <span />
              </div>

              <div className="dashboard-screen">
                <div className="screen-copy">
                  <p className="screen-label">Monthly overview</p>
                  <h2>Smart spending, clear signal.</h2>
                </div>

                <div className="video-frame">
                  <video src={Video} autoPlay muted loop playsInline />
                </div>

                <div className="floating-grid">
                  <div className="floating-card">
                    <span>Monthly spend</span>
                    <strong>Rs 24,850</strong>
                    <small>7% below last month</small>
                  </div>
                  <div className="floating-card accent">
                    <span>Budget status</span>
                    <strong>On track</strong>
                    <small>Spending trend is stable</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div>
            <span className="trust-label">Why teams and individuals use it</span>
            <h2>A serious interface for everyday money management.</h2>
          </div>
          <p>
            Clean design, useful insights, and a workflow that feels closer to a
            real financial product than a student project.
          </p>
        </section>

        <section id="features" className="feature-section">
          <div className="section-heading">
            <p className="eyebrow">Core features</p>
            <h2>Everything needed to keep spending under control.</h2>
          </div>

          <div className="feature-grid">
            {featureCards.map((card, index) => (
              <article className="feature-card" key={card.title}>
                <div className="feature-index">0{index + 1}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="workflow-section">
          <div className="section-heading">
            <p className="eyebrow">How it works</p>
            <h2>A simple flow that keeps the product easy to use.</h2>
          </div>

          <div className="workflow-grid">
            {steps.map((step) => (
              <article className="workflow-card" key={step.label}>
                <span className="workflow-label">{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="reviews" className="reviews-section">
          <div className="section-heading">
            <p className="eyebrow">User feedback</p>
            <h2>Built to feel credible, calm, and easy to trust.</h2>
          </div>

          <div className="reviews-grid">
            {testimonials.map((item) => (
              <article className="review-card" key={item.name}>
                <p className="quote">"{item.quote}"</p>
                <div className="reviewer">
                  <div className="avatar">{item.name.charAt(0)}</div>
                  <div>
                    <h3>{item.name}</h3>
                    <span>{item.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div>
            <p className="eyebrow">Ready to launch</p>
            <h2>Give your expense tracker the polished landing page it deserves.</h2>
            <p>
              Let users understand the value in a few seconds, then guide them
              straight into the app with confidence.
            </p>
          </div>
          <div className="cta-actions">
            <Link to="/signup" className="button button-solid">
              Create account
            </Link>
            <Link to="/login" className="button button-ghost">
              I already have an account
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
