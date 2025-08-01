import React, { useState } from 'react';
import '../styles/Feedback.css'; // (create this if you want custom styles)

const Feedback = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', rating: 0 });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRating = (rating) => {
    setForm({ ...form, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://portfolio-backend-7vmj.onrender.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to send feedback');
      setSubmitted(true);
      setForm({ name: '', email: '', message: '', rating: 0 });
    } catch (err) {
      console.error(err);
      alert('Error sending feedback');
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-welcome mb-4">💬 We value your Feedback</h2>
      {submitted && <div className="alert alert-success w-100">✅ Thanks for your feedback!</div>}

      <form className="dashboard-section w-100" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Your Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Email Address</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Feedback Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} className="form-control" rows="4" required />
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold">Rate Your Experience</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => handleRating(star)}
                className={`btn me-2 ${form.rating >= star ? 'btn-warning' : 'btn-outline-secondary'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
