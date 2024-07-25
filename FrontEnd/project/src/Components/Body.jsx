import React from 'react';
import './Body.css';

const Body = () => {
  return (
    <div className="body">
      <section className="hero">
        <h1>Welcome to MyWebsite</h1>
        <p>Your journey to greatness starts here. Explore our services and offerings!</p>
        <button className="btn-primary">Get Started</button>
      </section>
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-card">
          <h3>Service One</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="service-card">
          <h3>Service Two</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="service-card">
          <h3>Service Three</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </section>
      <section className="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out to us!</p>
        <button className="btn-primary">Contact Us</button>
      </section>
    </div>
  );
}

export default Body;
