import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function PublicPortfolio() {
  const { user, loadingUser } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const fetchUserPortfolio = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/public/${username}`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setProjects(data.projects);
        setProfile(data.user);
        setBlogs(data.blogs);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      }
    };

    fetchUserPortfolio();
  }, [username]);

  if (loadingUser || !profile)
    return <p className="text-center text-light mt-5">Loading Portfolio...</p>;

  return (
    <div
      className="min-vh-100 py-5 px-3"
      style={{
        backgroundColor: '#0f1a2a',
        color: '#e0e6ed',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-info">
            {profile.name || profile.username} 
          </h1>
          <p className="lead">{profile.bio}</p>
          <p>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light btn-sm mx-2"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light btn-sm"
            >
              LinkedIn
            </a>
          </p>
       
        </div>

        <hr className="border-light" />
        <h3 className="text-info mb-4">🚀 Projects</h3>
        <div className="row">
          {projects.length === 0 ? (
            <p className="text-muted">No projects available.</p>
          ) : (
            projects.map((p, idx) => (
              <div className="col-md-6 mb-4" key={idx}>
                <div className="card bg-dark border-info text-light h-100 shadow">
                  <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                  <div className="card-footer bg-transparent border-top-0">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-info btn-sm"
                    >
                      🔗 View Project
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <hr className="border-light mt-5" />
        <h3 className="text-info mb-4">📝 Blog Posts</h3>
        {blogs.length === 0 ? (
          <p className="text-muted">No blog posts available.</p>
        ) : (
          blogs.map((blog, idx) => (
            <div key={idx} className="mb-4 p-4 bg-dark text-light rounded shadow-sm">
              <h5 className="text-info">{blog.title}</h5>
              <div className="mt-2">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {blog.content}
                </ReactMarkdown>
              </div>
             
            </div>
            
          ))
        )}
      </div>
      <div className='d-flex justify-content-center mt-3'>
        {!loadingUser && user === username && (
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-outline-info btn-sm mt-3"
            >
              ✏️ Edit Portfolio / Blogs
            </button>
          )}
          </div>
      
    </div>
  );
}

export default PublicPortfolio;
