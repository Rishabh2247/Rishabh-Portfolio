const { useEffect, useRef, useState } = React;

function CompactMusicWidgetApp() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  const [transparentLogoSrc, setTransparentLogoSrc] = useState('./Logo.png');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showAllWorksPage, setShowAllWorksPage] = useState(false);
  const [gta6Time, setGta6Time] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isScrolled, setIsScrolled] = useState(false);

  // Direct DOM Refs for High-Performance Zero-Lag Cursor Animation
  const cursorRingRef = useRef(null);
  const cursorDotRef = useRef(null);
  const trailContainerRef = useRef(null);

  const mouseTargetRef = useRef({ x: -1000, y: -1000, active: false });
  const ringPosRef = useRef({ x: -1000, y: -1000 });
  const dotPosRef = useRef({ x: -1000, y: -1000 });
  const trailPointsRef = useRef(
    Array.from({ length: 12 }, () => ({ x: -1000, y: -1000 }))
  );

  // Listen for window scroll to trigger dynamic navbar under-border
  useEffect(() => {
    const handleNavbarScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    return () => window.removeEventListener('scroll', handleNavbarScroll);
  }, []);

  // GTA VI Release Countdown Logic (Continuously running live countdown timer)
  useEffect(() => {
    const calculateCountdown = () => {
      const now = Date.now();
      const target = new Date('2026-11-19T00:00:00Z').getTime();
      let diff = target - now;

      if (diff <= 0) {
        diff = 262 * 24 * 60 * 60 * 1000;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setGta6Time({ days, hours, mins, secs });
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Apply theme mode class to HTML/Body tags dynamically
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    }
  }, [isDarkMode]);

  // High-Impact GSAP Entrance Reveal Timeline for Hero Section (Page 1 - Foreground Elements Only)
  useEffect(() => {
    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Navigation Bar slide down
      tl.fromTo(
        '.khasiyev-navbar',
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, delay: 0.15 }
      );

      // 2. Stagger Animate Hero Words (Design, Code, AI Workflows)
      tl.fromTo(
        ['.word-design', '.word-code', '.word-ai'],
        { y: 45, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.85, stagger: 0.16 },
        '-=0.7'
      );

      // 3. Animate Typewriter Subtitle Container
      tl.fromTo(
        '.intro-line-secondary',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );

      // 4. Elastic Reveal Audio Vinyl Music Badge
      tl.fromTo(
        '.audio-widget-container',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.7)' },
        '-=0.6'
      );
    }
  }, []);

  // Initialize GSAP & Lenis Smooth Scroll Engine
  useEffect(() => {
    if (typeof Lenis !== 'undefined' && typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 0.88,
        touchMultiplier: 1.6,
        lerp: 0.075
      });

      // Sync Lenis smooth scroll position with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Add Lenis animation ticker to GSAP main ticker
      const updateFn = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(updateFn);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(updateFn);
        lenis.destroy();
      };
    }
  }, []);

  // Process Logo.png to remove black background
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = img.naturalWidth;
      tempCanvas.height = img.naturalHeight;
      const tCtx = tempCanvas.getContext('2d');
      tCtx.drawImage(img, 0, 0);

      const imgData = tCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r < 25 && g < 25 && b < 25) {
          data[i + 3] = 0; // Alpha 0
        }
      }

      tCtx.putImageData(imgData, 0, 0);
      setTransparentLogoSrc(tempCanvas.toDataURL());
    };
    img.src = './Logo.png';
  }, []);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const tracks = [
    {
      id: 'travis',
      title: 'Highest in the Room',
      artist: 'Travis Scott',
      cover: './Travis.jpeg',
      src: './Highest_In_The_Room.mp3'
    },
    {
      id: 'heyjude',
      title: 'Hey Jude',
      artist: 'The Beatles',
      cover: './Hey Jude.jpeg',
      src: './Hey_Jude.mp3'
    },
    {
      id: 'likehim',
      title: 'Like Him',
      artist: 'Tyler, The Creator',
      cover: './Tyler_Cover.jpeg',
      src: './Like_Him.mp3'
    }
  ];

  const currentTrack = tracks[currentTrackIndex];

  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const mousePosRef = useRef({ x: -1000, y: -1000, active: false });
  const imagesLoadedRef = useRef(false);

  const img1Ref = useRef(new Image());
  const img2Ref = useRef(new Image());

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleVinylClick = () => {
    setIsPopupOpen(!isPopupOpen);
    if (!isPlaying) {
      playTrack(currentTrackIndex);
    }
  };

  const playTrack = (index) => {
    const track = tracks[index];
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = track.src;
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Audio play error:", err);
        setIsPlaying(false);
      });
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsPopupOpen(false); // Auto-close music player card popup on pause
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Audio play error:", err);
        setIsPlaying(false);
      });
    }
  };

  const handleNextSong = () => {
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    playTrack(nextIdx);
  };

  const handlePrevSong = () => {
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIdx);
    playTrack(prevIdx);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    let animationFrameId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');

    const checkImagesReady = () => {
      if (
        img1Ref.current.complete && img1Ref.current.naturalWidth > 0 &&
        img2Ref.current.complete && img2Ref.current.naturalWidth > 0
      ) {
        imagesLoadedRef.current = true;
      }
    };

    img1Ref.current.onload = checkImagesReady;
    img2Ref.current.onload = checkImagesReady;

    img1Ref.current.src = encodeURI('./Image 1.png');
    img2Ref.current.src = encodeURI('./Image 2.png');

    checkImagesReady();

    const resize = () => {
      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        offscreenCanvas.width = canvas.width;
        offscreenCanvas.height = canvas.height;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const addPoints = (mx, my) => {
      const now = Date.now();
      const lastPt = pointsRef.current[pointsRef.current.length - 1];
      const distFromLast = lastPt ? Math.hypot(mx - lastPt.x, my - lastPt.y) : 100;

      // Sleeker, less wide fluid brush width (110px to 175px)
      const dynamicWidth = Math.min(175, Math.max(110, 120 + distFromLast * 0.75));

      if (distFromLast > 1.0) {
        const steps = Math.min(28, Math.max(1, Math.floor(distFromLast / 1.2)));
        for (let s = 1; s <= steps; s++) {
          const ratio = s / steps;
          const ix = lastPt ? lastPt.x + (mx - lastPt.x) * ratio : mx;
          const iy = lastPt ? lastPt.y + (my - lastPt.y) * ratio : my;

          pointsRef.current.push({
            x: ix,
            y: iy,
            time: now,
            width: dynamicWidth
          });
        }
      }

      mouseRef.current.x = mx;
      mouseRef.current.y = my;
      mouseRef.current.active = true;
    };

    const handleMouseMove = (e) => {
      mouseTargetRef.current = { x: e.clientX, y: e.clientY, active: true };
      mousePosRef.current = { x: e.clientX, y: e.clientY, active: true };

      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      addPoints(mx, my);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseTargetRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, active: true };
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const mx = e.touches[0].clientX - rect.left;
        const my = e.touches[0].clientY - rect.top;
        addPoints(mx, my);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const getCoverBounds = (img, w, h) => {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;
      let renderW, renderH, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        renderW = w;
        renderH = w / imgRatio;
        offsetX = 0;
        offsetY = (h - renderH) / 2;
      } else {
        renderH = h;
        renderW = h * imgRatio;
        offsetX = (w - renderW) / 2;
        offsetY = 0;
      }

      return { offsetX, offsetY, renderW, renderH };
    };

    const render = () => {
      if (!canvas) return;
      const now = Date.now();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width;
      const h = canvas.height;

      // 1. Direct DOM Hardware-Accelerated High-Speed Cursor LERP
      if (mouseTargetRef.current.active) {
        const tx = mouseTargetRef.current.x;
        const ty = mouseTargetRef.current.y;

        // Instant 1:1 Dot tracking (Factor 0.9 = 0ms input latency!)
        dotPosRef.current.x += (tx - dotPosRef.current.x) * 0.9;
        dotPosRef.current.y += (ty - dotPosRef.current.y) * 0.9;

        // Smooth fluid Ring tracking (Factor 0.38 = silky fluid follow)
        ringPosRef.current.x += (tx - ringPosRef.current.x) * 0.38;
        ringPosRef.current.y += (ty - ringPosRef.current.y) * 0.38;

        if (cursorDotRef.current) {
          cursorDotRef.current.style.transform = `translate3d(${dotPosRef.current.x - 3}px, ${dotPosRef.current.y - 3}px, 0)`;
        }
        if (cursorRingRef.current) {
          cursorRingRef.current.style.transform = `translate3d(${ringPosRef.current.x - 16}px, ${ringPosRef.current.y - 16}px, 0)`;
        }

        // Smooth Particle Trail Chain
        const trail = trailPointsRef.current;
        trail[0].x += (tx - trail[0].x) * 0.55;
        trail[0].y += (ty - trail[0].y) * 0.55;

        for (let t = 1; t < trail.length; t++) {
          trail[t].x += (trail[t - 1].x - trail[t].x) * 0.55;
          trail[t].y += (trail[t - 1].y - trail[t].y) * 0.55;
        }

        if (trailContainerRef.current) {
          const particleNodes = trailContainerRef.current.children;
          for (let p = 0; p < particleNodes.length && p < trail.length; p++) {
            const pt = trail[p];
            const node = particleNodes[p];
            const ratio = p / trail.length;
            const size = Math.max(2, 8 * (1 - ratio));
            node.style.transform = `translate3d(${pt.x - size / 2}px, ${pt.y - size / 2}px, 0)`;
          }
        }
      }

      ctx.clearRect(0, 0, w, h);

      if (mouseRef.current.active && pointsRef.current.length > 0) {
        const lastPt = pointsRef.current[pointsRef.current.length - 1];
        lastPt.time = now;
      }

      if (imagesLoadedRef.current) {
        const bounds = getCoverBounds(img1Ref.current, w, h);

        // Draw Image 1.png as base cover layer
        ctx.drawImage(img1Ref.current, bounds.offsetX, bounds.offsetY, bounds.renderW, bounds.renderH);

        const maxLifetime = 2800; // 2.8s smooth fluid ribbon dissipation
        pointsRef.current = pointsRef.current.filter(p => now - p.time < maxLifetime);
        const points = pointsRef.current;

        if (points.length > 0) {
          offscreenCtx.clearRect(0, 0, w, h);
          offscreenCtx.globalCompositeOperation = 'source-over';

          // Silky smooth, feathered drop-shadow outline around the revealed path
          offscreenCtx.shadowBlur = 18 * dpr;
          offscreenCtx.shadowColor = 'rgba(0, 0, 0, 0.95)';

          for (let i = 0; i < points.length; i++) {
            const p = points[i];
            const age = now - p.time;
            const progress = age / maxLifetime;
            const alpha = Math.max(0, Math.pow(1 - progress, 1.5));
            const currentRadius = (p.width / 2) * Math.max(0.35, Math.pow(1 - progress, 1.3)) * dpr;
            const px = p.x * dpr;
            const py = p.y * dpr;

            offscreenCtx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
            offscreenCtx.beginPath();
            offscreenCtx.arc(px, py, currentRadius, 0, Math.PI * 2);
            offscreenCtx.fill();

            if (i > 0) {
              const prev = points[i - 1];
              const prevAge = now - prev.time;
              const prevProgress = prevAge / maxLifetime;
              const prevAlpha = Math.max(0, Math.pow(1 - prevProgress, 1.5));
              const midAlpha = (alpha + prevAlpha) / 2;

              offscreenCtx.strokeStyle = `rgba(0, 0, 0, ${midAlpha})`;
              offscreenCtx.lineWidth = currentRadius * 2;
              offscreenCtx.lineCap = 'round';
              offscreenCtx.lineJoin = 'round';

              offscreenCtx.beginPath();
              offscreenCtx.moveTo(prev.x * dpr, prev.y * dpr);
              const xc = ((prev.x + p.x) / 2) * dpr;
              const yc = ((prev.y + p.y) / 2) * dpr;
              offscreenCtx.quadraticCurveTo(prev.x * dpr, prev.y * dpr, xc, yc);
              offscreenCtx.stroke();
            }
          }

          offscreenCtx.shadowBlur = 0;

          // Composite Image 2.png strictly inside the brush mask
          offscreenCtx.globalCompositeOperation = 'source-in';
          offscreenCtx.drawImage(img2Ref.current, bounds.offsetX, bounds.offsetY, bounds.renderW, bounds.renderH);

          // Draw revealed Image 2 layer on top of Image 1
          ctx.drawImage(offscreenCanvas, 0, 0);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="main-app-wrapper">

      {/* Glowing Cursor Circle, Center Dot & Trailing Particles (Direct DOM Hardware-Accelerated) */}
      <div 
        ref={cursorRingRef} 
        className="custom-cursor-ring" 
        style={{ transform: 'translate3d(-1000px, -1000px, 0)' }}
      />
      <div 
        ref={cursorDotRef} 
        className="custom-cursor-dot" 
        style={{ transform: 'translate3d(-1000px, -1000px, 0)' }}
      />
      <div ref={trailContainerRef}>
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className="cursor-trail-particle"
            style={{
              transform: 'translate3d(-1000px, -1000px, 0)',
              width: `${Math.max(2, 8 * (1 - idx / 12))}px`,
              height: `${Math.max(2, 8 * (1 - idx / 12))}px`,
              opacity: Math.max(0, 0.75 * Math.pow(1 - idx / 12, 1.4))
            }}
          />
        ))}
      </div>

      {/* Top Navigation Bar */}
      <nav className={`khasiyev-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="#page-1" className="nav-brand">
          <img src={transparentLogoSrc} alt="RY Logo" className="nav-logo-img" />
          <span className="nav-name">Rishabh Yadav</span>
          <span className="nav-role">AI Vibe Coder</span>
        </a>

        <div className="nav-right">
          <a href="#work" className="nav-link">Work</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
          
          {/* GTA VI Launch Countdown Widget */}
          <div 
            className="nav-gta6-widget" 
            title="Countdown to GTA VI Release"
          >
            <img src="./gta 6 logo.png" alt="GTA VI Logo" className="gta6-logo-img" />
            <span className="gta6-label">GTA VI</span>
            <span className="gta6-timer">
              {gta6Time.days}d {gta6Time.hours}h {gta6Time.mins}m {gta6Time.secs}s
            </span>
          </div>
        </div>
      </nav>

      {/* PAGE 1: HERO SECTION */}
      <section id="page-1" className="page-1-section">
        <div className="canvas-container">
          <canvas ref={canvasRef} />

          {/* Interactive Khasiyev Style Intro Typography Container */}
          <div className="khasiyev-intro-widget">
            <div className="intro-line-primary">
              <span className="hover-word word-design">
                <span className="word-text">Design</span>
                <div className="figma-selection-box">
                  <span className="figma-label-top">Design</span>
                  <span className="figma-handle handle-tl"></span>
                  <span className="figma-handle handle-tr"></span>
                  <span className="figma-handle handle-bl"></span>
                  <span className="figma-handle handle-br"></span>
                  <span className="figma-label-bottom">240 × 77</span>
                </div>
              </span>
              ,{' '}
              <span className="hover-word word-code">
                <span className="word-text">Code</span>
                <div className="code-snippet-popover">
                  <div className="code-line"><span className="code-num">1</span> <span className="kw">float</span> d = <span className="fn">dist</span>(uv, p);</div>
                  <div className="code-line"><span className="code-num">2</span> v += ink * <span className="fn">exp</span>(-d*d);</div>
                  <div className="code-line"><span className="code-num">3</span> frag = <span className="kw">vec4</span>(col, v);</div>
                </div>
              </span>
              , &{' '}
              <span className="hover-word word-ai">
                <span className="word-text">AI Workflows</span>
                <div className="ai-nodes-popover">
                  <div className="node-item"><span className="node-icon">+</span> prompt</div>
                  <div className="node-line"></div>
                  <div className="node-item"><span className="node-icon">p</span> plan</div>
                  <div className="node-line"></div>
                  <div className="node-item"><span className="node-icon">g</span> generate</div>
                  <div className="node-line"></div>
                  <div className="node-item"><span className="node-icon">s</span> ship</div>
                </div>
              </span>
              .
            </div>

            {/* Self-Writing Typewriter Effect */}
            <div className="intro-line-secondary">
              <TypewriterEffect />
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2: CLIENT WORK & PROJECTS SECTION WITH HOVER PREVIEWS */}
      <section id="work" className="page-2-section">
        <div className="page2-gradient-container">
          <div className="gradient-orb-1"></div>
          <div className="gradient-orb-2"></div>
        </div>
        <KhasiyevProjectsSection onOpenAllWorks={() => setShowAllWorksPage(true)} />
      </section>

      {/* FULLSCREEN ALL WORKS ARCHIVE GALLERY PAGE */}
      {showAllWorksPage && (
        <AllWorksPage onClose={() => setShowAllWorksPage(false)} />
      )}

      {/* KHASIYEV STYLE ABOUT SECTION */}
      <AboutSectionComponent />

      {/* CLEAN SCROLL TO ZOOM IMAGE SECTION */}
      <ScrollZoomImageSection />

      {/* PREMIUM AESTHETIC PORTFOLIO FOOTER */}
      <PortfolioFooterComponent />

      {/* HTML5 Audio Tag */}
      <audio 
        ref={audioRef} 
        src={currentTrack.src} 
        loop 
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={handleNextSong}
      />

      {/* Right Middle Corner Audio Vinyl Widget */}
      <div className="audio-widget-container">

        {/* Vinyl Record Button wrapped in Rotating Circular Text SVG Ring */}
        <div className="vinyl-wrapper-ring-container">
          
          <svg className="circular-text-svg" viewBox="0 0 140 140">
            <path
              id="vinylCirclePath"
              d="M 70, 70 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
              fill="none"
            />
            <text className="circular-text-content">
              <textPath href="#vinylCirclePath" startOffset="0%">
                VIBE AS YOU SCROLL • VIBE AS YOU SCROLL • VIBE AS YOU SCROLL • 
              </textPath>
            </text>
          </svg>

          <button 
            onClick={handleVinylClick}
            className={`vinyl-btn ${isPlaying ? 'playing' : ''}`}
            title="Toggle Music Card"
          >
            <div className="vinyl-disc">
              <div className="vinyl-groove groove-1"></div>
              <div className="vinyl-groove groove-2"></div>
              <div className="vinyl-center-label">
                <div className="vinyl-center-hole"></div>
              </div>
            </div>
          </button>

        </div>

        {/* Small Pop-up Card appearing directly BELOW (downward of) the vinyl music button */}
        <div className={`small-player-popup ${isPopupOpen ? 'open' : ''}`}>
          <div className="popup-top-row">
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title} 
              className="popup-cover-img"
            />
            <div className="popup-track-details">
              <div className="popup-track-name">{currentTrack.title}</div>
              <div className="popup-artist-name">{currentTrack.artist}</div>
            </div>
          </div>

          {/* Music Timeline Progress Bar */}
          <div className="popup-timeline-container">
            <div className="timeline-labels">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max={duration || 100} 
              step="0.1"
              value={currentTime} 
              onChange={handleSeek}
              className="popup-timeline-slider"
            />
          </div>

          <div className="popup-controls-row">
            <button className="popup-btn" onClick={handlePrevSong} title="Previous Song">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
              <span>Prev</span>
            </button>

            <button className="popup-btn popup-btn-play" onClick={togglePlayPause} title="Play / Pause">
              {isPlaying ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '1px' }}>
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>

            <button className="popup-btn" onClick={handleNextSong} title="Next Song">
              <span>Next</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CompactMusicWidgetApp />);
