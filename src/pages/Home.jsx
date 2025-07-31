import React from 'react';
import '../styles/Home.css'; // 🔁 Add this line to apply styles
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="text-center text-white mb-5">
        <h1 className="display-4 fw-bold">Build Your Professional Portfolio & Blog</h1>
        <p className="lead mt-3">
          Showcase your projects, write insightful blogs, and create an impressive personal brand — all in one place.
        </p>
        <button className="btn btn-primary mt-4 px-4 py-2 mb-5" onClick={() => navigate('/login')}>Get Started</button>
        <button
  className="mx-3 btn btn-outline-light mt-4 px-4 py-2 mb-5"
  onClick={() => {
    setTimeout(() => {
      navigate('/user/demo');
    }, 1000); // 2 second delay
  }}
>
  View Demo
</button>

      </div>

      <div className="container mt-5">
        <div className="row align-items-center mb-5">
          <div className="col-md-6 ">
            <img
              src="https://plus.unsplash.com/premium_photo-1661324498792-0fe8977062b7?w=600&auto=format&fit=crop&q=60"
              alt="Portfolio Showcase"
              className="custom-image"
            />
          </div>
          <div className="col-md-6 text-white">
            <h3 className="fw-bold">✨ Create a Stunning Portfolio</h3>
            <p>
              Present your skills, achievements, and experiences in a clean and structured format.
              Your portfolio helps recruiters, clients, and collaborators instantly understand your strengths and passions.
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-5 flex-md-row-reverse">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=60"
              alt="Write Blogs"
              className="custom-image"
            />
          </div>
          <div className="col-md-6 text-white">
            <h3 className="fw-bold">📝 Publish Technical Blogs</h3>
            <p>
              Share your learnings, projects, and insights with the world. Writing blogs not only helps you grow,
              but also demonstrates your communication skills and thought leadership.
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=60"
              alt="Job Ready"
              className="custom-image"
            />
          </div>
          <div className="col-md-6 text-white">
            <h3 className="fw-bold">🚀 Become Job-Ready</h3>
            <p>
              Stand out in job applications and interviews with a personalized portfolio link. Highlight your real-world projects, blogs, and active tech presence to make a lasting impression.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
