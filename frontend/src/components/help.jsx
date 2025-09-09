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
          <h1 className="help-title">Help & Support</h1>
          <p className="help-intro">
            Welcome to the Expense Tracker Help Center! Here you’ll find answers to common questions
            and guidance to help you use Expensync effectively.
          </p>

          <section className="help-section">
            <h2>📌 About Expensync</h2>
            <p>
              Expensync helps you manage your finances by tracking your expenses, categorizing them,
              and giving you insights so you can stay on top of your budget.
            </p>
          </section>

          <section className="help-section">
            <h2>🚀 Getting Started</h2>
            <ol>
              <li>Create an account and log in.</li>
              <li>Add your first expense using the “Add Expense” button.</li>
              <li>Select a category and amount, then save it.</li>
              <li>View your expenses and charts in the Dashboard.</li>
            </ol>
          </section>

          <section className="help-section">
            <h2>❓ Frequently Asked Questions</h2>
            <div className="faq">
              <p><strong>Q:</strong> Can I delete an expense?<br />Yes, go to your expense list and click delete.</p>
              <p><strong>Q:</strong> Is my data secure?<br />Absolutely. Your data is stored securely and never shared.</p>
              <p><strong>Q:</strong> Can I download my expenses?<br />Yes, from the transaction section.</p>
            </div>
          </section>

          <section className="help-section">
            <h2>📧 Need More Help?</h2>
            <p>
              Email us at{" "}
              <a href="mailto:support@expensync.com" className="help-link">
                support@expensync.com
              </a>
              {" "}and we’ll get back to you as soon as possible.
            </p>
          </section>
        </div>
      </div>
      <Footer></Footer>

    </>
  );
};

export default Help;
