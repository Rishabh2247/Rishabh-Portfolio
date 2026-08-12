const { useState, useRef, useEffect } = React;

function KhasiyevProjectsSection({ onOpenAllWorks }) {
  const [activeProject, setActiveProject] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const containerRef = useRef(null);
  const previewRef = useRef(null);

  const targetPosRef = useRef({ x: 0, y: 0 });
  const currPosRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  const projects = [
    {
      id: 1,
      name: 'Cyber Vision 01',
      role: 'AI & Chrome Sculpting',
      year: '2026',
      image: './Project 1.jpeg',
      tag: 'CYBER SCULPT // 01'
    },
    {
      id: 2,
      name: 'Chrome Spikes AI',
      role: 'Generative Design & Shader',
      year: '2026',
      image: './Project 2.jpeg',
      tag: 'GENERATIVE LAB // 02'
    },
    {
      id: 3,
      name: 'Gentle Monster AI',
      role: 'Virtual Reality & Concept',
      year: '2025',
      image: './Project 3.jpeg',
      tag: 'CONCEPT SPECS // 03'
    }
  ];

  useEffect(() => {
    if (viewMode !== 'list') return;
    const updatePhysics = () => {
      if (previewRef.current) {
        currPosRef.current.x += (targetPosRef.current.x - currPosRef.current.x) * 0.12;
        currPosRef.current.y += (targetPosRef.current.y - currPosRef.current.y) * 0.12;

        const deltaX = targetPosRef.current.x - currPosRef.current.x;
        const tilt = Math.max(-6, Math.min(6, deltaX * 0.06));

        previewRef.current.style.left = `${currPosRef.current.x}px`;
        previewRef.current.style.top = `${currPosRef.current.y}px`;
        previewRef.current.style.transform = `translate(-50%, -50%) rotate(${tilt}deg) scale(${activeProject ? 1.05 : 0.9})`;
      }
      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeProject, viewMode]);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      targetPosRef.current.x = e.clientX - rect.left;
      targetPosRef.current.y = e.clientY - rect.top;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="khasiyev-client-work-container" 
      onMouseMove={handleMouseMove}
    >
      <div className="client-work-header">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
          <span className="client-work-label">Client work</span>
          <h2 className="client-work-title">
            Client work shipped <em>end to end,</em><br />
            from Figma frame to production
          </h2>

          {/* Grid / List View Toggle Switcher Buttons */}
          <div className="view-toggle-capsule">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <span>☰</span> List View
            </button>
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <span>☵</span> Grid View
            </button>
          </div>
        </div>
      </div>

      {/* Conditional Layout: LIST VIEW vs GRID VIEW */}
      {viewMode === 'list' ? (
        <>
          {/* Permanent Floating Hover Image Preview Window */}
          <div 
            ref={previewRef}
            className={`floating-project-preview ${activeProject ? 'visible' : ''}`}
          >
            <div className="preview-image-wrapper">
              {projects.map((proj) => (
                <img 
                  key={proj.id}
                  src={proj.image} 
                  alt={proj.name} 
                  className={`preview-img-layer ${activeProject?.id === proj.id ? 'active-img' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Project Rows List */}
          <div className="project-rows-list">
            {projects.map((proj) => (
              <div 
                key={proj.id} 
                className={`project-row-item ${activeProject?.id === proj.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveProject(proj)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className="row-col-name">{proj.name}</div>
                <div className="row-col-role">{proj.role}</div>
                <div className="row-col-year">{proj.year}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* 3-Column Grid View Layout */
        <div className="project-grid-container">
          {projects.map((proj) => (
            <div key={proj.id} className="project-grid-card">
              <div className="grid-card-img-box">
                <img src={proj.image} alt={proj.name} />
              </div>
              <div className="grid-card-content">
                <span className="grid-card-tag">{proj.tag}</span>
                <h3 className="grid-card-title">{proj.name}</h3>
                <p className="grid-card-role">{proj.role} — {proj.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Section */}
      <div className="client-work-footer">
        <h3 className="footer-headline">
          A collection of <em>student projects,</em><br />
          freelance work and <em>experiments.</em>
        </h3>
        <button className="all-work-btn" onClick={onOpenAllWorks}>All work</button>
      </div>
    </div>
  );
}
