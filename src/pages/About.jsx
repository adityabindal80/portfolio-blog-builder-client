import React from 'react';
import '../styles/About.css'; // Create this file for styling

function About() {
  return (
    <div className="about-container d-flex justify-content-center align-items-center">
      <div className="about-card p-5 shadow bg-white rounded">
        <h2 className="text-center mb-4">About This Project</h2>

        <p>
          <strong>Portfolio & Blog Builder</strong> is a full-stack web application that empowers users to
          showcase their skills, projects, and personal blogs in a professional and customizable format.
          It is designed for students, developers, freelancers, and job seekers to build their online
          presence effortlessly.
        </p>

        <hr />

        <h4 className="mt-4 mb-2">🔧 Features:</h4>
        <ul>
          <li>Create and edit your personal profile (name, bio, GitHub, LinkedIn)</li>
          <li>Add and manage your projects with descriptions and links</li>
          <li>Write and publish technical blogs using Markdown</li>
          <li>Share a public portfolio page like <code>/user/yourname</code></li>
        </ul>

        <h4 className="mt-4 mb-2">🛠 Tech Stack:</h4>
        <ul>
          <li><strong>Frontend:</strong> React.js, Bootstrap</li>
          <li><strong>Backend:</strong> Node.js, Express.js</li>
          <li><strong>Database:</strong> MongoDB (Mongoose)</li>
          <li><strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
        </ul>

        <div className="text-center mt-4">
          <p className="text-muted">Built with 💻, ☕, and a passion for clean design.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
