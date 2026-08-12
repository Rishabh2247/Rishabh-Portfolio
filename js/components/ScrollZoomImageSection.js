const { useState, useRef, useEffect } = React;

function ScrollZoomImageSection() {
  const sectionRef = useRef(null);
  const [zoomProgress, setZoomProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollDistance = vh - rect.top;
      const progress = Math.max(0, Math.min(1, scrollDistance / vh));
      setZoomProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const coverWidth = 50 + (100 - 50) * zoomProgress;
  const coverHeight = 45 + (100 - 45) * zoomProgress;
  const borderRadius = 28 * (1 - zoomProgress);
  const coverScale = 0.88 + (1.0 - 0.88) * zoomProgress;

  return (
    <section ref={sectionRef} id="about" className="scroll-zoom-section-wrapper">
      <div className="sticky-zoom-container">
        <div 
          className="zoom-image-card"
          style={{
            width: `${coverWidth}vw`,
            height: `${coverHeight}vh`,
            borderRadius: `${borderRadius}px`,
            transform: `scale(${coverScale})`,
            border: zoomProgress >= 0.99 ? 'none' : '1px solid var(--border-color)'
          }}
        >
          <img src="./Horizontal.jpeg" alt="Horizontal Cover" className="zoom-img" />
          <div className="zoom-overlay-text" style={{ opacity: Math.max(0, 1 - zoomProgress * 1.5) }}>
            <span className="zoom-indicator-tag">SCROLL TO UNLOCK GALLERY</span>
            <h2 className="zoom-title">RISHABH YADAV</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
