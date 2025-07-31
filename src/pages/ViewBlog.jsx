import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!res.ok) throw new Error('Failed to fetch blog');
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
        alert('Blog not found or server error');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="container my-4">
      <Link to="/" className="btn btn-sm btn-outline-secondary mb-3">← Back</Link>
      <h2>{blog.title}</h2>
      <hr />
      <ReactMarkdown>{blog.content}</ReactMarkdown>
    </div>
  );
}

export default ViewBlog;
