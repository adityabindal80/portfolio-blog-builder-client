const API_BASE = 'http://localhost:5000/api'; // adjust if your backend runs elsewhere

export async function fetchProjects(token) {
  const res = await fetch(`${API_BASE}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return await res.json();
}
