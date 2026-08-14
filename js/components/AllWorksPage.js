const { useState } = React;

function AllWorksPage({ onClose }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const allProjects = [
    {
      id: 1,
      title: 'Max Verstappen Fan Website',
      category: '3D & SHADERS',
      role: 'FAN WEBSITE',
      year: '2026',
      image: './Porjects/Max Website Mockup.png',
      description: 'Interactive Formula 1 fan experience featuring WebGL liquid cursor shaders, GSAP ScrollTrigger timeline animation, procedural topographic contour engine, and Lenis smooth scrolling.',
      tech: ['Vite 5.1', 'WebGL & GLSL', 'GSAP ScrollTrigger', 'Lenis 1.1.18', 'Simplex Noise', 'HTML5 Canvas']
    },
    {
      id: 2,
      title: 'Chrome Spikes AI',
      category: 'AI DESIGN',
      role: 'Generative Design & Shader',
      year: '2026',
      image: './Project 2.jpeg',
      description: 'Generative AI design system creating metallic organic geometries reacting in real-time to user audio frequencies.',
      tech: ['React 18', 'Midjourney API', 'Web Audio API', 'GSAP']
    },
    {
      id: 3,
      title: 'Gentle Monster AI',
      category: '3D & SHADERS',
      role: 'Virtual Reality & Concept',
      year: '2025',
      image: './Project 3.jpeg',
      description: 'Spatial virtual reality eyewear showcase with interactive 360-degree glassmorphic material preview.',
      tech: ['React Three Fiber', 'Figma', 'WebGL', 'TailwindCSS']
    },
    {
      id: 4,
      title: 'Vibe Beats Synthesizer',
      category: 'REACT WEB',
      role: 'Web Audio Architecture',
      year: '2025',
      image: './Image 1.png',
      description: 'Interactive browser-based vinyl record audio player and visualizer with custom equalizer effects.',
      tech: ['Web Audio API', 'React', 'Canvas 2D', 'CSS3 Animations']
    },
    {
      id: 5,
      title: 'Aetheria Spatial OS',
      category: 'EXPERIMENTS',
      role: 'Spatial Glassmorphism UI',
      year: '2025',
      image: './Image 2.png',
      description: 'Futuristic spatial operating system concept featuring live fluid dynamics and particle physics engine.',
      tech: ['JavaScript ES6+', 'HTML5 Canvas', 'CSS Glassmorphism']
    },
    {
      id: 6,
      title: 'Solaria Planetary Engine',
      category: '3D & SHADERS',
      role: 'Astronomical Simulation',
      year: '2026',
      image: './Image 3.png',
      description: 'Procedural 3D planetary motion simulator with inverse kinematics and light caustics physics.',
      tech: ['Canvas 2D Engine', 'React Hooks', 'Skeletal Kinematics']
    }
  ];

  const categories = ['ALL', '3D & SHADERS', 'AI DESIGN', 'REACT WEB', 'EXPERIMENTS'];

  const filteredProjects = allProjects.filter((proj) => {
    const matchesCategory = activeCategory === 'ALL' || proj.category === activeCategory;
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="all-works-page-overlay">
      {/* Top Header Bar */}
      <header className="all-works-header">
        <div className="all-works-brand">
          <button className="back-home-btn" onClick={onClose}>
            ← Back to Portfolio
          </button>
          <span className="brand-divider">//</span>
          <h1 className="all-works-title">ALL WORKS ARCHIVE</h1>
        </div>

        <button className="close-works-btn" onClick={onClose} title="Close All Works">
          ✕
        </button>
      </header>

      {/* Control Bar: Categories & Search Bar */}
      <div className="all-works-control-bar">
        <div className="category-tabs-container">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search projects by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-field"
          />
        </div>
      </div>

      {/* Main Works Grid */}
      <div className="all-works-grid-container">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((proj) => (
            <div 
              key={proj.id} 
              className="all-works-card"
              onClick={() => window.location.href = `./project-detail.html?id=${proj.id}`}
            >
              <div className="works-card-img-box">
                <img src={proj.image} alt={proj.title} className="works-card-img" />
                <div className="works-card-overlay-badge">{proj.category}</div>
              </div>
              <div className="works-card-info">
                <div className="works-card-meta">
                  <span className="works-card-role">{proj.role}</span>
                  <span className="works-card-year">{proj.year}</span>
                </div>
                <h3 className="works-card-title">{proj.title}</h3>
                <p className="works-card-desc">{proj.description}</p>
                <div className="works-card-tech-tags">
                  {proj.tech.map((t, idx) => (
                    <span key={idx} className="tech-tag-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-projects-found">
            <span className="no-found-icon">📁</span>
            <h3>No projects found matching "{searchQuery}"</h3>
            <p>Try clearing your search or switching category filters.</p>
          </div>
        )}
      </div>

      {/* Project Quick View Modal Popup */}
      {selectedProject && (
        <div className="project-detail-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-detail-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>✕</button>
            <img src={selectedProject.image} alt={selectedProject.title} className="modal-hero-img" />
            <div className="modal-body-content">
              <span className="modal-category-badge">{selectedProject.category} • {selectedProject.year}</span>
              <h2 className="modal-title">{selectedProject.title}</h2>
              <h4 className="modal-subtitle">{selectedProject.role}</h4>
              <p className="modal-desc">{selectedProject.description}</p>
              <div className="modal-tech-stack">
                <span className="tech-stack-label">TECH STACK:</span>
                <div className="tech-pills-row">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="modal-tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
