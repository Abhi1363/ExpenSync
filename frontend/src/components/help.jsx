import React from "react";
import "./help.css";
import Footer from "./footer";
import Sidebar from "./sidebar";

const Help = () => {
  return (
    <>
 
      <div style={{ display: "flex" }}>
             <Sidebar></Sidebar>
        <div className="help-container" >
          <h1 className="help-title"><i className="fa fa-life-ring" style={{marginRight:10}}></i>Help & Support</h1>
          <p className="help-intro">
            Welcome to the Expense Tracker Help Center. Find quick answers, guides, and support resources to use Expensync effectively.
          </p>

          <section className="help-section"  style={{display:"flex", alignItems:"flex-start"}}>
            <h2><i className="fa fa-info-circle" style={{marginRight:8}}></i>About Expensync</h2>
            <p>
              Expensync helps you manage your finances by tracking expenses, categorizing them,
              and giving you actionable insights so you can stay on top of your budget.
            </p>
          </section>

          <section className="help-section" style={{display:"flex", alignItems:"flex-start"}}>
            <h2><i className="fa fa-rocket" style={{marginRight:8}}></i>Getting Started</h2>
            <ol className="help-list">
              <li>Create an account and log in.</li>
              <li>Add your first expense using the Add Expense form.</li>
              <li>Choose a category and amount, then save.</li>
              <li>View charts and insights in the Dashboard.</li>
            </ol>
          </section>

          <section className="help-section" style={{display:"flex", alignItems:"flex-start"}}>
            <h2><i className="fa fa-question-circle" style={{marginRight:8}}></i>Frequently Asked Questions</h2>
            <div className="faq">
              <div className="faq-item"><strong>Q:</strong> Can I delete an expense?<br /><span>A: Yes — open Recent Transactions and click Delete on the row.</span></div>
              <div className="faq-item"><strong>Q:</strong> Is my data secure?<br /><span>A: Yes — data is stored securely and access is protected by authentication.</span></div>
              <div className="faq-item"><strong>Q:</strong> Can I download my expenses?<br /><span>A: Yes — use Download in the Transaction menu to export CSV/PDF.</span></div>
            </div>
          </section>

          <section className="help-section contact">
            <h2><i className="fa fa-envelope" style={{marginRight:8}}></i>Need More Help?</h2>
            <p>
              Contact our support team at <a href="mailto:support@expensync.com" className="help-link">support@expensync.com</a> or use the in-app chat (if available).
            </p>
            <div className="help-cta">
              <a className="help-btn" href="mailto:support@expensync.com"><i className="fa fa-paper-plane" style={{marginRight:8}}></i>Contact Support</a>
            </div>
          </section>
        </div>
      </div>
      <Footer></Footer>

    </>
  );
};

export default Help;
