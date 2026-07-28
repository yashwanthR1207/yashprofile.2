import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsTrash, BsPencil, BsPlus, BsX } from 'react-icons/bs';

export default function Admin() {
  // Fix scrolling: override global overflow:hidden on body and .page
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    const pageEl = document.querySelector('.page');
    if (pageEl) {
      pageEl.style.overflow = 'auto';
      pageEl.style.height = 'auto';
      pageEl.style.minHeight = '100vh';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      if (pageEl) {
        pageEl.style.overflow = '';
        pageEl.style.height = '';
        pageEl.style.minHeight = '';
      }
    };
  }, []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  
  const [projects, setProjects] = useState([]);
  const [aboutData, setAboutData] = useState({ stats: { cgpa: 0, projects: 0, certifications: 0, dedication: 0 }, skills: [], credentials: [] });
  const [loading, setLoading] = useState(false);
  
  // Modal state for Projects
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ title: '', link: '' });

  // Modal state for About Items (Skills/Credentials)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [aboutModalType, setAboutModalType] = useState('skills'); // 'skills' or 'credentials'
  const [editingAboutItem, setEditingAboutItem] = useState(null);
  const [aboutFormData, setAboutFormData] = useState({ title: '', stage: '' });

  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: token })
      }).then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
          fetchProjects();
          fetchAboutData();
        } else {
          sessionStorage.removeItem('adminToken');
        }
      }).catch(() => sessionStorage.removeItem('adminToken'));
    }
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects?t=' + Date.now());
      if (res.ok) setProjects(await res.json());
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchAboutData = async () => {
    try {
      const res = await fetch('/api/about?t=' + Date.now());
      if (res.ok) setAboutData(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        sessionStorage.setItem('adminToken', password);
        setIsAuthenticated(true);
        fetchProjects();
        fetchAboutData();
      } else {
        setError('Invalid password.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setPassword('');
  };

  // --- PROJECT LOGIC ---
  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({ title: project.title, link: project.link });
    } else {
      setEditingProject(null);
      setFormData({ title: '', link: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('adminToken');
    const method = editingProject ? 'PUT' : 'POST';
    const body = editingProject ? { id: String(editingProject.id), ...formData } : formData;
      
    try {
      const res = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      if (res.status === 401) { handleLogout(); setError('Session expired. Please login again.'); return; }
      if (res.ok) {
        closeModal();
        await fetchProjects();
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Failed to save project: ${errData.message || res.statusText}`);
      }
    } catch (err) {
      console.error('Save project error:', err);
      alert('Network error: Could not save project.');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    const token = sessionStorage.getItem('adminToken');
    try {
      const res = await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ id: String(id) })
      });
      if (res.status === 401) { handleLogout(); setError('Session expired. Please login again.'); return; }
      if (res.ok) {
        await fetchProjects();
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Failed to delete project: ${errData.message || res.statusText}`);
      }
    } catch (err) {
      console.error('Delete project error:', err);
      alert('Network error: Could not delete project.');
    }
  };

  // --- ABOUT LOGIC ---
  const handleSaveAboutData = async () => {
    const token = sessionStorage.getItem('adminToken');
    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(aboutData)
      });
      if (res.status === 401) { handleLogout(); setError('Session expired. Please login again.'); return; }
      if (res.ok) {
        alert('About data saved successfully!');
        await fetchAboutData();
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Failed to save about data: ${errData.message || res.statusText}`);
      }
    } catch (err) {
      console.error('Save about data error:', err);
      alert('Network error: Could not save about data.');
    }
  };

  const updateStat = (key, value) => {
    setAboutData({ ...aboutData, stats: { ...aboutData.stats, [key]: Number(value) } });
  };

  const openAboutModal = (type, item = null) => {
    setAboutModalType(type);
    if (item) {
      setEditingAboutItem(item);
      setAboutFormData({ title: item.title, stage: item.stage });
    } else {
      setEditingAboutItem(null);
      setAboutFormData({ title: '', stage: '' });
    }
    setIsAboutModalOpen(true);
  };

  const closeAboutModal = () => {
    setIsAboutModalOpen(false);
    setEditingAboutItem(null);
  };

  const handleSaveAboutItem = (e) => {
    e.preventDefault();
    const type = aboutModalType;
    let newItems = [...aboutData[type]];
    
    if (editingAboutItem) {
      const idx = newItems.findIndex(i => i.id === editingAboutItem.id);
      newItems[idx] = { ...editingAboutItem, ...aboutFormData };
    } else {
      newItems.push({ id: Date.now().toString(), ...aboutFormData });
    }
    
    setAboutData({ ...aboutData, [type]: newItems });
    closeAboutModal();
  };

  const handleDeleteAboutItem = (type, id) => {
    if (!confirm('Delete this item?')) return;
    const newItems = aboutData[type].filter(i => i.id !== id);
    setAboutData({ ...aboutData, [type]: newItems });
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-primary/30 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/5 backdrop-blur-md border border-black/20 p-8 rounded-2xl w-full max-w-md shadow-2xl text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-black">Admin Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/5 border border-black/20 rounded-lg p-3 text-black placeholder:text-black/50 focus:outline-none focus:border-accent"
              required
            />
            <button type="submit" className="btn-glossy font-bold py-3 text-black w-full text-center">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary/30 pt-24 pb-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-5xl font-bold text-black">Admin <span className="text-accent">Panel.</span></h1>
          <button onClick={handleLogout} className="glare-effect text-black/70 hover:text-black border border-black/20 hover:bg-black/10 px-4 py-2 rounded-lg transition-all text-sm">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'projects' ? 'bg-accent text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'}`}
          >
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'about' ? 'bg-accent text-white' : 'bg-black/10 text-black/70 hover:bg-black/20'}`}
          >
            About Page Data
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="bg-black/5 backdrop-blur-sm border border-black/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-black">Your Projects</h2>
              <button onClick={() => openModal()} className="btn-glossy flex items-center gap-2 px-4 py-2 text-black font-semibold">
                <BsPlus className="text-xl" /><span>Add New</span>
              </button>
            </div>
            {loading ? (
              <p className="text-center text-black/50 py-10">Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-black/10 text-black/60">
                      <th className="pb-3 px-4">Title</th>
                      <th className="pb-3 px-4">Link</th>
                      <th className="pb-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id} className="border-b border-black/5 hover:bg-black/5 transition-all">
                        <td className="py-4 px-4 font-medium text-black">{project.title}</td>
                        <td className="py-4 px-4 text-black/60 text-sm max-w-[200px] sm:max-w-xs truncate">
                          <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-accent">{project.link}</a>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-end gap-3">
                            <button onClick={() => openModal(project)} className="p-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-600 rounded-lg"><BsPencil /></button>
                            <button onClick={() => handleDeleteProject(project.id)} className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-600 rounded-lg"><BsTrash /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {projects.length === 0 && <tr><td colSpan="3" className="text-center py-10 text-black/50">No projects found.</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="bg-black/5 backdrop-blur-sm border border-black/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-black">About Page Stats & Data</h2>
              <button onClick={handleSaveAboutData} className="btn-glossy px-4 py-2 text-black font-semibold">
                Save All About Data
              </button>
            </div>
            
            {/* Stats */}
            <div className="mb-10">
              <h3 className="text-lg font-medium text-accent mb-4">Numerical Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(aboutData.stats).map(key => (
                  <div key={key}>
                    <label className="block text-sm text-black/70 uppercase mb-1">{key}</label>
                    <input 
                      type="number" 
                      value={aboutData.stats[key] || 0} 
                      onChange={(e) => updateStat(key, e.target.value)}
                      className="w-full bg-black/5 border border-black/20 rounded-lg p-2 text-black focus:border-accent outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-accent">Skills</h3>
                <button onClick={() => openAboutModal('skills')} className="text-sm bg-black/10 hover:bg-black/20 px-3 py-1 rounded-lg text-black">Add Skill</button>
              </div>
              <div className="space-y-3">
                {aboutData.skills.map(skill => (
                  <div key={skill.id} className="flex justify-between items-center bg-black/5 p-4 rounded-lg border border-black/10">
                    <div>
                      <h4 className="font-bold text-black">{skill.title}</h4>
                      <p className="text-sm text-black/60">{skill.stage}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openAboutModal('skills', skill)} className="text-blue-600 p-2"><BsPencil/></button>
                      <button onClick={() => handleDeleteAboutItem('skills', skill.id)} className="text-red-600 p-2"><BsTrash/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-accent">Credentials</h3>
                <button onClick={() => openAboutModal('credentials')} className="text-sm bg-black/10 hover:bg-black/20 px-3 py-1 rounded-lg text-black">Add Credential</button>
              </div>
              <div className="space-y-3">
                {aboutData.credentials.map(cred => (
                  <div key={cred.id} className="flex justify-between items-center bg-black/5 p-4 rounded-lg border border-black/10">
                    <div>
                      <h4 className="font-bold text-black">{cred.title}</h4>
                      <p className="text-sm text-black/60">{cred.stage}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openAboutModal('credentials', cred)} className="text-blue-600 p-2"><BsPencil/></button>
                      <button onClick={() => handleDeleteAboutItem('credentials', cred.id)} className="text-red-600 p-2"><BsTrash/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white border border-black/10 p-6 md:p-8 rounded-2xl w-full max-w-lg shadow-2xl relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-black/50 hover:text-black"><BsX className="text-3xl" /></button>
            <h2 className="text-2xl font-bold mb-6 text-black">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSaveProject} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-black/80 mb-2">Project Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-black/5 border border-black/20 rounded-lg p-3 text-black focus:border-accent outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/80 mb-2">GitHub URL</label>
                <input type="text" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="w-full bg-black/5 border border-black/20 rounded-lg p-3 text-black focus:border-accent outline-none" required />
              </div>
              <button type="submit" className="btn-glossy mt-4 font-bold py-3 text-black w-full text-center">
                {editingProject ? 'Save Changes' : 'Create Project'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* About Data Modal */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white border border-black/10 p-6 md:p-8 rounded-2xl w-full max-w-lg shadow-2xl relative">
            <button onClick={closeAboutModal} className="absolute top-4 right-4 text-black/50 hover:text-black"><BsX className="text-3xl" /></button>
            <h2 className="text-2xl font-bold mb-6 text-black capitalize">{editingAboutItem ? `Edit ${aboutModalType.slice(0, -1)}` : `Add New ${aboutModalType.slice(0, -1)}`}</h2>
            <form onSubmit={handleSaveAboutItem} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-black/80 mb-2">Title</label>
                <input type="text" value={aboutFormData.title} onChange={(e) => setAboutFormData({ ...aboutFormData, title: e.target.value })} className="w-full bg-black/5 border border-black/20 rounded-lg p-3 text-black focus:border-accent outline-none" required placeholder="e.g. Embedded & Hardware" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/80 mb-2">Description / Stage</label>
                <input type="text" value={aboutFormData.stage} onChange={(e) => setAboutFormData({ ...aboutFormData, stage: e.target.value })} className="w-full bg-black/5 border border-black/20 rounded-lg p-3 text-black focus:border-accent outline-none" required placeholder="e.g. C/C++, Arduino" />
              </div>
              <button type="submit" className="btn-glossy mt-4 font-bold py-3 text-black w-full text-center">
                {editingAboutItem ? 'Save Changes' : 'Add Item'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
