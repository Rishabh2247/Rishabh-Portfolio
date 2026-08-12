const { useRef, useEffect } = React;

function AboutSectionComponent() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Platform data gathered from DOM elements
    let platforms = [];

    const updatePlatforms = () => {
      const secRect = section.getBoundingClientRect();
      canvas.width = secRect.width;
      canvas.height = secRect.height;

      const newPlatforms = [];

      // Ground floor of about section
      newPlatforms.push({
        left: 0,
        right: secRect.width,
        top: secRect.height - 6,
        bottom: secRect.height
      });

      // Target DOM elements to treat as solid platforms
      const targetSelectors = [
        '.about-main-headline',
        '.about-body-paragraph',
        '.book-call-btn',
        '.about-photo-card',
        '.about-art-card'
      ];

      targetSelectors.forEach((sel) => {
        const els = section.querySelectorAll(sel);
        els.forEach((el) => {
          const r = el.getBoundingClientRect();
          newPlatforms.push({
            left: r.left - secRect.left,
            right: r.right - secRect.left,
            top: r.top - secRect.top,
            bottom: r.bottom - secRect.top
          });
        });
      });

      platforms = newPlatforms;
    };

    updatePlatforms();
    window.addEventListener('resize', updatePlatforms);

    // Mouse Tracking for Interactive Curiosity
    const mouse = { x: -1000, y: -1000, isOver: false, clickTimer: 0 };

    const handleMouseMove = (e) => {
      const secRect = section.getBoundingClientRect();
      mouse.x = e.clientX - secRect.left;
      mouse.y = e.clientY - secRect.top;
      mouse.isOver = true;
    };

    const handleMouseLeave = () => {
      mouse.isOver = false;
    };

    const handleClick = () => {
      mouse.clickTimer = 60; // Trigger Meow / Stretch
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);
    section.addEventListener('click', handleClick);

    // Floating Zzz Particles Array
    let zzzParticles = [];

    const createZzz = (x, y) => {
      zzzParticles.push({
        x: x + (Math.random() * 10 - 5),
        y: y - 10,
        vx: 0.3 + Math.random() * 0.4,
        vy: -0.6 - Math.random() * 0.4,
        size: 9 + Math.random() * 4,
        alpha: 1,
        life: 1,
        decay: 0.012
      });
    };

    // TIMED REPEATING CAT CLASS
    class TimedNaturalCat {
      constructor(x) {
        this.x = x;
        this.y = 60;
        this.vx = 0;
        this.vy = 0;
        this.facing = 1;
        this.grounded = false;

        this.animTimer = Math.random() * 100;
        
        // EXACT USER TIMED SCHEDULE LOOP:
        // Phase 0: Roam all over for 5 sec (300 ticks @ 60fps)
        // Phase 1: Sleep on letters for 3 sec (180 ticks @ 60fps)
        // Phase 2: Play & Roam all over for 5 sec (300 ticks @ 60fps)
        this.loopPhase = 0;
        this.phaseTimer = 300; 
        this.state = 'walking';

        this.tailAngle = 0;
        this.headLookX = 0;
        this.headLookY = 0;
        this.jumpCooldown = 0;
        this.meowTimer = 0;
      }

      update(width, height) {
        this.animTimer += 0.1;
        if (this.jumpCooldown > 0) this.jumpCooldown--;

        if (mouse.clickTimer > 0) {
          mouse.clickTimer--;
          if (this.meowTimer <= 0) {
            this.meowTimer = 90;
          }
        }
        if (this.meowTimer > 0) this.meowTimer--;

        // TIMED BEHAVIOR LOOP MACHINE
        this.phaseTimer--;
        if (this.phaseTimer <= 0) {
          if (this.loopPhase === 0) {
            // Enter 3-Second Sleep Phase
            this.loopPhase = 1;
            this.state = 'sleeping';
            this.vx = 0;
            this.phaseTimer = 180; // 3 seconds @ 60fps
          } else if (this.loopPhase === 1) {
            // Enter 5-Second Play & Roam Phase
            this.loopPhase = 2;
            this.state = 'playing';
            this.meowTimer = 80;
            this.facing = Math.random() < 0.5 ? 1 : -1;
            this.phaseTimer = 300; // 5 seconds @ 60fps
          } else {
            // Loop back to 5-Second Roam Phase
            this.loopPhase = 0;
            this.state = 'walking';
            this.facing = Math.random() < 0.5 ? 1 : -1;
            this.phaseTimer = 300; // 5 seconds @ 60fps
          }
        }

        // PHYSICAL BEHAVIOR FOR CURRENT PHASE
        if (this.grounded) {
          if (this.loopPhase === 0 || this.loopPhase === 2) {
            // ROAMING & PLAYING ALL OVER THE PAGE (PHASES 0 & 2)
            if (this.state !== 'jumping') {
              this.state = this.loopPhase === 2 ? 'playing' : 'walking';
            }
            this.vx = this.facing * (2.2 + Math.sin(this.animTimer * 0.8) * 0.4);

            // Turn around at canvas boundaries
            if (this.x < 35) { this.facing = 1; }
            if (this.x > width - 35) { this.facing = -1; }

            // Frequent platform hops (letters, CTA button, photo & art cards)
            if (this.jumpCooldown <= 0 && Math.random() < 0.028) {
              this.vy = -7.0 - Math.random() * 2.5;
              this.vx = this.facing * (3.0 + Math.random() * 1.8);
              this.grounded = false;
              this.state = 'jumping';
              this.jumpCooldown = 65;
            }
          } else {
            // SLEEPING PHASE (PHASE 1 - 3 SECONDS)
            this.state = 'sleeping';
            this.vx *= 0.7; // Come to complete rest

            // Emit floating Zzz particles over head
            if (Math.random() < 0.04) {
              createZzz(this.x + this.facing * 10, this.y - 12);
            }
          }
        }

        // Head tracking cursor curiosity
        if (mouse.isOver && this.loopPhase !== 1) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 220) {
            this.headLookX = (dx / dist) * 8;
            this.headLookY = (dy / dist) * 6;
          } else {
            this.headLookX *= 0.9;
            this.headLookY *= 0.9;
          }
        } else {
          this.headLookX *= 0.9;
          this.headLookY *= 0.9;
        }

        // Apply Gentle Feline Gravity
        this.vy += 0.35;
        this.x += this.vx;
        this.y += this.vy;

        // Platform Collision Detection (Lands on top of text letters & cards)
        this.grounded = false;
        const footY = this.y + 12;

        for (let p of platforms) {
          if (this.x >= p.left - 10 && this.x <= p.right + 10) {
            if (footY >= p.top - 4 && footY - this.vy <= p.top + 14 && this.vy >= 0) {
              this.y = p.top - 12;
              this.vy = 0;
              this.grounded = true;
              if (this.state === 'jumping') {
                this.state = this.loopPhase === 1 ? 'sleeping' : 'walking';
              }
              break;
            }
          }
        }

        // Tail dynamics
        this.tailAngle = Math.sin(this.animTimer * 2.0) * 0.4 + (this.loopPhase !== 1 ? 0.25 : 0);
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        const isSleeping = this.state === 'sleeping';
        const isPlaying = this.state === 'playing';

        // Cat Color Palette (Warm Cream Body, Neon Amber Ears, Soft Green Eyes)
        const bodyColor = '#f4efe6';
        const earColor = '#ff8533';
        const eyeColor = '#00ff88';

        // Tail Rendering with Bezier Curve
        ctx.save();
        ctx.strokeStyle = bodyColor;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        ctx.beginPath();
        const tailStartX = -this.facing * 14;
        const tailStartY = 2;
        const tailControlX = tailStartX - this.facing * 18 + Math.cos(this.tailAngle) * 9;
        const tailControlY = tailStartY - 14 + Math.sin(this.tailAngle) * 12;
        const tailEndX = tailControlX - this.facing * 8;
        const tailEndY = tailControlY - 10;

        ctx.quadraticCurveTo(tailControlX, tailControlY, tailEndX, tailEndY);
        ctx.stroke();
        ctx.restore();

        if (isSleeping) {
          // CURLED SLEEPING CAT ON TOP OF LETTERS / CARDS
          ctx.fillStyle = bodyColor;
          ctx.beginPath();
          ctx.ellipse(0, 4, 16, 11, 0, 0, Math.PI * 2);
          ctx.fill();

          // Sleeping Head nestled into body
          ctx.beginPath();
          ctx.arc(this.facing * 10, 2, 8, 0, Math.PI * 2);
          ctx.fill();

          // Cute Sleeping Ears
          ctx.fillStyle = earColor;
          ctx.beginPath();
          ctx.moveTo(this.facing * 8, -5);
          ctx.lineTo(this.facing * 12, -10);
          ctx.lineTo(this.facing * 14, -4);
          ctx.fill();

          // Closed Eye Crescent Line
          ctx.strokeStyle = '#2a1a24';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(this.facing * 12, 2, 2.5, 0.2, Math.PI - 0.2);
          ctx.stroke();

        } else {
          // ROAMING & PLAYING CAT SPRINTING ACROSS THE PAGE
          ctx.fillStyle = bodyColor;

          // Main Torso
          ctx.beginPath();
          ctx.ellipse(0, 0, 16, 9, 0, 0, Math.PI * 2);
          ctx.fill();

          // 4 Animated Walking Legs
          const legPhase = this.animTimer * 5;
          ctx.strokeStyle = bodyColor;
          ctx.lineWidth = 3.5;
          ctx.lineCap = 'round';

          // Front Legs
          ctx.beginPath();
          ctx.moveTo(8 * this.facing, 4);
          ctx.lineTo(8 * this.facing + Math.sin(legPhase) * 6, 13);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(4 * this.facing, 4);
          ctx.lineTo(4 * this.facing - Math.sin(legPhase) * 6, 13);
          ctx.stroke();

          // Back Legs
          ctx.beginPath();
          ctx.moveTo(-8 * this.facing, 4);
          ctx.lineTo(-8 * this.facing - Math.sin(legPhase) * 6, 13);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(-12 * this.facing, 4);
          ctx.lineTo(-12 * this.facing + Math.sin(legPhase) * 6, 13);
          ctx.stroke();

          // Head
          const headX = 14 * this.facing + this.headLookX * 0.3;
          const headY = -6 + this.headLookY * 0.3;

          ctx.beginPath();
          ctx.arc(headX, headY, 8.5, 0, Math.PI * 2);
          ctx.fill();

          // Ears
          ctx.fillStyle = earColor;
          ctx.beginPath();
          ctx.moveTo(headX - 4, headY - 5);
          ctx.lineTo(headX - 5, headY - 13);
          ctx.lineTo(headX + 1, headY - 6);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(headX + 2, headY - 6);
          ctx.lineTo(headX + 6, headY - 13);
          ctx.lineTo(headX + 5, headY - 4);
          ctx.fill();

          // Glowing Green Eyes
          ctx.fillStyle = eyeColor;
          ctx.beginPath();
          ctx.arc(headX + this.facing * 3, headY - 1, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Speech Bubble on Play / Click
        if (this.meowTimer > 0 || isPlaying) {
          ctx.save();
          ctx.font = 'bold 11px "Space Grotesk", sans-serif';
          ctx.fillStyle = '#ff4d26';
          ctx.fillText(isPlaying ? 'play~ 🐾' : 'meow~ 🐾', 10 * this.facing, -22);
          ctx.restore();
        }

        ctx.restore();
      }
    }

    // Instantiate 1 Timed Natural Cat
    const cat = new TimedNaturalCat(160);

    // Main Render Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & Draw Cat
      cat.update(canvas.width, canvas.height);
      cat.draw(ctx);

      // Update & Draw Zzz Floating Particles
      for (let i = zzzParticles.length - 1; i >= 0; i--) {
        const z = zzzParticles[i];
        z.x += z.vx;
        z.y += z.vy;
        z.alpha -= z.decay;

        if (z.alpha <= 0) {
          zzzParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = z.alpha;
        ctx.font = `bold ${z.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = '#ff8533';
        ctx.fillText('z', z.x, z.y);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      section.removeEventListener('click', handleClick);
      window.removeEventListener('resize', updatePlatforms);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="khasiyev-about-section">
      
      {/* Natural Cat Animation Overlay Canvas */}
      <canvas 
        ref={canvasRef} 
        className="stickman-lightsaber-canvas"
      />

      <div className="about-inner-container">
        
        {/* Left Column: Typography & Text */}
        <div className="about-text-column">
          <span className="about-section-label">About Me</span>
          
          <h2 className="about-main-headline">
            Hey, I’m Rishabh — a Lucknow, India-based <em>Vibe frontend coder</em> who likes making the web a little less boring.
          </h2>

          <div className="about-body-paragraphs">
            <p className="about-body-paragraph">
              I graduated in 2024 and started turning my ideas into interactive experiences through code, motion, and a questionable amount of debugging. 😌
            </p>
            <p className="about-body-paragraph">
              I’m into clean UI, smooth interactions, creative animations, and building websites that don’t just work — they have a vibe.
            </p>
            <p className="about-body-paragraph">
              Basically, I write code, break things, fix them, and call it frontend development. 🚀
            </p>
          </div>

          <div className="about-cta-buttons">
            <a href="#contact" className="book-call-btn">
              <span className="green-call-dot"></span> Book a call
            </a>
          </div>
        </div>

        {/* Right Column: 2 Side-by-Side Cards matching Khasiyev screenshot */}
        <div className="about-cards-column">
          
          {/* Card 1: Portrait Photo Card with Overlay Name Tag */}
          <div className="about-photo-card">
            <img src="./Image 2.png" alt="Rishabh Yadav" />
            <div className="photo-card-badge">
              <span className="badge-name">Rishabh Yadav</span>
              <span className="badge-title">Vibe Frontend Coder</span>
            </div>
          </div>

          {/* Card 2: Liquid Abstract Gradient Cover Card */}
          <div className="about-art-card">
            <img src="./Horizontal.jpeg" alt="Abstract Art Cover" />
          </div>

        </div>

      </div>
    </section>
  );
}
