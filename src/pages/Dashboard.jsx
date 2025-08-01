import React from 'react';
import { useState  , useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import { fetchProjects } from '../api';
import remarkGfm from 'remark-gfm';
import '../styles/Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [editingId, setEditingId] = useState(null);
  const { user, logout, token , setUser} = useAuth();
  const [blog, setBlog] = useState({ title: '', content: '' });
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (user) {
      console.log(user);
      setProfile(prev => ({
        ...prev,
        name: user.name || '',
        bio: user.bio || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
      }));
    }
  }, [user]);
  

  const handleEdit = (blogToEdit) => {
    setBlog({ title: blogToEdit.title, content: blogToEdit.content });
    setEditingId(blogToEdit._id);
  };
  const fetchUserBlogs = async () => {
    try {
      const res = await fetch(`https://portfolio-backend-7vmj.onrender.com/api/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };
  const handleSaveBlog = async () => {
    try {
      const url = editingId
        ? `https://portfolio-backend-7vmj.onrender.com/api/blogs/${editingId}`
        : 'https://portfolio-backend-7vmj.onrender.com/api/blogs';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blog),
      });
      if (!res.ok) throw new Error('Failed to save blog');
      alert(editingId ? 'Blog updated!' : 'Blog saved!');
      setBlog({ title: '', content: '' });
      setEditingId(null);
      fetchUserBlogs();
    } catch (err) {
      console.error(err);
      alert('Error saving blog');
    }
  };
  useEffect(() => {
    if (token && user?._id) {
      fetchUserBlogs();
    }
  }, [token, user?._id]);
  const handleDeleteBlog = async (id) => {
    try {
      const res = await fetch(`https://portfolio-backend-7vmj.onrender.com/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete blog');
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting blog');
    }
  };
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    github: '',
    linkedin: '',
  });
  useEffect(() => {
    if (token) {
      fetch('https://portfolio-backend-7vmj.onrender.com/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch profile');
          return res.json();
        })
        .then(data => setProfile(data))
        .catch(console.error);
    }
  }, [token]);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if (token) {
      fetchProjects(token)
        .then(setProjects)
        .catch(console.error);
    }
  }, [token]);
  const [newProject, setNewProject] = useState({ title: '', description: '', link: '' });
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const handleSaveProfile = async () => {
    try {
      const res = await fetch('https://portfolio-backend-7vmj.onrender.com/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),

      });
      if (!res.ok) throw new Error('Failed to update profile');
      const updatedUser = await res.json();
      setUser(updatedUser);
      console.log(user);
      console.log(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  };
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    try{
      const res = await fetch('https://portfolio-backend-7vmj.onrender.com/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });
      if (!res.ok) throw new Error('Failed to create project');
      const savedProject = await res.json();
      setProjects([...projects, savedProject]);
      setNewProject({ title: '', description: '', link: '' });
    }
    catch(err){
      console.log(err);
      alert('Error adding project');
    }
  };
  const handleDeleteProject = (index) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };

  return ( 
    <div className="dashboard-container">
      <div className="tab-buttons">
        <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profile</button>
        <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Projects</button>
        <button className={`tab-btn ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => setActiveTab('blogs')}>Blogs</button>
      </div>
      <h2 className="dashboard-welcome">Welcome, {user?.username}</h2>
      {activeTab === 'profile' && (
        <div className="dashboard-section">
          <h4>Edit Profile</h4>
          <label>Name</label>
          <input name="name" value={profile.name} onChange={handleProfileChange} className="form-control" />
          <label>Bio</label>
          <textarea name="bio" value={profile.bio} onChange={handleProfileChange} className="form-control" />
          <label>GitHub</label>
          <input name="github" value={profile.github} onChange={handleProfileChange} className="form-control" />
          <label>LinkedIn</label>
          <input name="linkedin" value={profile.linkedin} onChange={handleProfileChange} className="form-control" />
          <button onClick={handleSaveProfile} className="btn btn-primary mt-2">Save Profile</button>
        </div>
      )}
      {activeTab === 'projects' && (
        <div className="dashboard-section">
          <h4>Projects</h4>
          <form onSubmit={handleAddProject} className="mb-3">
            <div className="row g-2">
              <div className="col-md-3">
                <input type="text" placeholder="Title" className="form-control" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
              </div>
              <div className="col-md-4">
                <input type="text" placeholder="Description" className="form-control" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
              </div>
              <div className="col-md-4">
                <input type="text" placeholder="Link" className="form-control" value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} />
              </div>
              <div className="col-md-1">
                <button type="submit" className="btn btn-success w-100">+</button>
              </div>
            </div>
          </form>
          <ul className="list-group">
            {projects.map((project, idx) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={idx}>
                <div>
                  <strong>{project.title}</strong>: {project.description} <a href={project.link} className="ms-2" target="_blank" rel="noreferrer">🔗</a>
                </div>
                <button onClick={() => handleDeleteProject(idx)} className="btn btn-sm btn-outline-danger">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === 'blogs' && (
        <div className="dashboard-section">
          <h4 className="mt-5">Write a Blog Post</h4>
          <div className="mb-3">
            <label>Blog Title</label>
            <input type="text" name="title" value={blog.title} onChange={handleBlogChange} className="form-control" placeholder="My First Blog Post" />
          </div>
          <div className="mb-3">
            <label>Blog Content (Markdown supported)</label>
            <textarea name="content" value={blog.content} onChange={handleBlogChange} className="form-control" rows="6" placeholder="Start writing your blog here..." />
          </div>
          <h5 className="mt-4">🔍 Live Preview:</h5>
          <div className="border p-3 bg-light rounded blog-preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content || '*Start writing to see preview...*'}
            </ReactMarkdown>
          </div>
          <hr />
          <h4 className="mt-5">My Blog Posts</h4>
          {blogs.length === 0 ? (
            <p>No blogs yet</p>
          ) : (
            blogs.map((b, idx) => (
              <div key={idx} className="border p-3 mb-3 bg-white shadow-sm rounded">
                <div className="d-flex justify-content-between align-items-start ">
                  <Link to={`/blogs/${b._id}`}><h4>{b.title}</h4></Link>
                  <div>
                    <button className="btn btn-sm btn-secondary me-2" onClick={() => handleEdit(b)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteBlog(b._id)}>Delete</button>
                  </div>
                </div>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{b.content}</ReactMarkdown>
              </div>
            ))
          )}
          <button className="btn btn-primary mt-3" onClick={handleSaveBlog}>Save Blog</button>
        </div>
      )}
      <button className="btn btn-danger mt-3" onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
