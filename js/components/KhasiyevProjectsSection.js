const { useState, useRef, useEffect } = React;

function KhasiyevProjectsSection({ onOpenAllWorks }) {
  const [activeProject, setActiveProject] = useState(null);
  const [selectedModalProject, setSelectedModalProject] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const containerRef = useRef(null);
  const previewRef = useRef(null);

  const targetPosRef = useRef({ x: 0, y: 0 });
  const currPosRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  const projects = [
    {
      id: 1,
      name: 'Max Verstappen Fan Website',
      role: 'FAN WEBSITE',
      year: '2026',
      image: './Porjects/Max Website Mockup.png',
      tag: 'FORMULA 1 // 01',
      category: '3D & SHADERS',
      type: 'Fan Website',
      positioning: 'A visually immersive Formula 1 fan website created as a front-end development showcase. The project focuses on interaction design, motion, typography, procedural graphics and cinematic scroll-based storytelling rather than a conventional static fan page.',
      techStack: [
        { category: '1. Build Tool & Bundler', items: ['Vite (^5.1.0) — Modern frontend dev server and bundler', 'Rollup — Multi-page setup using index.html and article.html'] },
        { category: '2. Core Frontend & Structure', items: ['HTML5 — Semantic multi-page architecture', 'Vanilla ES6+ JavaScript — Native ES modules with custom controllers', 'Vanilla CSS — Custom visual styling (style.css & articleMinimal.css)'] },
        { category: '3. Animation & Scrolling', items: ['GSAP v3.12.5 — High-performance UI animation timelines & transitions', 'GSAP ScrollTrigger — Scroll-driven pinned sections & scroll-linked motion', 'Lenis v1.1.18 — Smooth inertia-based scroll behavior'] },
        { category: '4. Graphics, Shaders & Canvas', items: ['WebGL & Custom GLSL Shaders — Fluid/liquid cursor glass distortion (liquidShader.js)', 'HTML5 Canvas 2D — Real-time animated background contours (contourEngine.js)', 'Simplex Noise + Marching Squares — Procedural noise isolines (simplex-noise ^4.0.1)'] }
      ],
      liveUrl: 'https://max-verstappen-beryl.vercel.app/',
      features: [
        'Scroll-driven storytelling and transitions',
        'Sticky and overlapping section compositions',
        'Animated contour/topographic background',
        'Smooth inertia scrolling',
        'WebGL liquid/glass cursor distortion',
        'Interactive image/card layouts',
        'Multi-page article experience',
        'Responsive visual composition'
      ]
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

  const handleProjectClick = (proj) => {
    window.location.href = `./project-detail.html?id=${proj.id}`;
  };

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
                onClick={() => handleProjectClick(proj)}
                style={{ cursor: 'pointer' }}
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
            <div 
              key={proj.id} 
              className="project-grid-card"
              onClick={() => handleProjectClick(proj)}
              style={{ cursor: 'pointer' }}
            >
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

      {/* Rich Project Detail Modal Popup */}
      {selectedModalProject && (
        <div className="project-detail-modal-overlay" onClick={() => setSelectedModalProject(null)}>
          <div className="project-detail-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedModalProject(null)}>✕</button>
            <img src={selectedModalProject.image} alt={selectedModalProject.name} className="modal-hero-img" />
            <div className="modal-body-content">
              <span className="modal-category-badge">{selectedModalProject.tag || selectedModalProject.category} • {selectedModalProject.year}</span>
              <h2 className="modal-title">{selectedModalProject.name}</h2>
              <h4 className="modal-subtitle">Role: {selectedModalProject.role} {selectedModalProject.type ? `| Type: ${selectedModalProject.type}` : ''}</h4>
              
              {selectedModalProject.positioning && (
                <div style={{ marginBottom: '18px' }}>
                  <h5 style={{ color: '#ff4d26', fontFamily: 'Space Grotesk', marginBottom: '6px', fontSize: '0.9rem', letterSpacing: '1px' }}>PROJECT POSITIONING</h5>
                  <p className="modal-desc" style={{ marginTop: 0 }}>{selectedModalProject.positioning}</p>
                </div>
              )}

              {selectedModalProject.techStack ? (
                <div className="modal-tech-stack" style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  <span className="tech-stack-label" style={{ color: '#ff4d26' }}>TECHNOLOGY STACK ARCHITECTURE:</span>
                  {selectedModalProject.techStack.map((group, gIdx) => (
                    <div key={gIdx} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <strong style={{ color: '#ff8533', fontSize: '0.85rem', fontFamily: 'Space Grotesk', display: 'block', marginBottom: '6px' }}>{group.category}</strong>
                      <ul style={{ margin: 0, paddingLeft: '18px', color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', lineHeight: '1.5' }}>
                        {group.items.map((item, iIdx) => (
                          <li key={iIdx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}

              {selectedModalProject.features && (
                <div style={{ marginBottom: '16px' }}>
                  <h5 style={{ color: '#ff4d26', fontFamily: 'Space Grotesk', marginBottom: '8px', fontSize: '0.9rem', letterSpacing: '1px' }}>KEY PROJECT FEATURES:</h5>
                  <div className="tech-pills-row">
                    {selectedModalProject.features.map((feat, fIdx) => (
                      <span key={fIdx} className="modal-tech-pill" style={{ background: 'rgba(255, 77, 38, 0.15)', borderColor: 'rgba(255, 77, 38, 0.4)' }}>
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

