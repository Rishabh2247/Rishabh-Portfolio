const { useState, useEffect } = React;

function PortfolioFooterComponent() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setTimeStr(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rishabhy2247@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="site-footer-premium">
      {/* Moving Flowing Ambient Radial Gradient Backdrop Orbs */}
      <div className="footer-moving-gradient-bg">
        <div className="footer-gradient-orb footer-orb-1"></div>
        <div className="footer-gradient-orb footer-orb-2"></div>
        <div className="footer-gradient-orb footer-orb-3"></div>
      </div>

      <div className="footer-glow-backdrop"></div>

      <div className="footer-inner-container">
        
        {/* Top Row: Availability Status & Local Time */}
        <div className="footer-top-meta">
          <div className="status-pill">
            <span className="status-dot-green"></span>
            <span className="status-text">AVAILABLE FOR NEW PROJECTS</span>
          </div>
          <div className="time-pill">
            <span className="time-icon">🌐</span>
            <span>DELHI, IN // {timeStr || '12:00 PM IST'}</span>
          </div>
        </div>

        {/* 2-Column Main Contact & CTA Section */}
        <div className="footer-cta-split-container">
          
          {/* Left Column: Headline & Interactive Email Button */}
          <div className="footer-cta-left">
            <h2 className="footer-cta-title">
              Let's build <em className="animated-moving-gradient-text">future-proof</em><br />
              AI & web experiences.
            </h2>
            
            <p className="footer-cta-subtext">
              Have a project in mind or want to collaborate? Fill out the form or click below to reach out directly.
            </p>

            {/* Interactive Direct Email Copy Button Capsule */}
            <div className="email-copy-capsule" onClick={handleCopyEmail} title="Click to copy email address">
              <span className="email-icon">✉️</span>
              <span className="email-text">rishabhy2247@gmail.com</span>
              <button className="copy-btn" type="button">
                {copied ? '✓ Copied!' : 'Copy Email 📋'}
              </button>
            </div>
          </div>

          {/* Right Column: Fill Contact Form */}
          <div className="footer-contact-form-card">
            {submitted ? (
              <div className="form-success-state">
                <div className="success-icon">✨</div>
                <h4 className="success-title">Message Received!</h4>
                <p className="success-desc">
                  Thanks for reaching out, <strong>{formData.name || 'friend'}</strong>. I'll get back to you shortly!
                </p>
              </div>
            ) : (
              <form className="footer-contact-form" onSubmit={handleSubmit}>
                <div className="form-group-row">
                  <div className="form-field-group">
                    <label htmlFor="contact-name" className="field-label">YOUR NAME</label>
                    <input 
                      id="contact-name"
                      type="text" 
                      name="name"
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder="John Doe" 
                      required 
                      className="contact-input-field"
                    />
                  </div>
                  <div className="form-field-group">
                    <label htmlFor="contact-email" className="field-label">YOUR EMAIL</label>
                    <input 
                      id="contact-email"
                      type="email" 
                      name="email"
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder="rishabhy2247@gmail.com" 
                      required 
                      className="contact-input-field"
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-message" className="field-label">YOUR MESSAGE</label>
                  <textarea 
                    id="contact-message"
                    name="message"
                    value={formData.message} 
                    onChange={handleChange}
                    placeholder="Tell me about your idea or project..." 
                    rows="3" 
                    required 
                    className="contact-textarea-field"
                  />
                </div>

                <button type="submit" className="footer-form-submit-btn">
                  <span>Send Message 🚀</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Links & Navigation Grid */}
        <div className="footer-grid-row">
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <img src="./Logo.png" alt="RY Logo" className="footer-logo-img" />
              <span className="footer-brand-name">Rishabh Yadav</span>
            </div>
            <p className="footer-brand-bio">
              Frontend Vibe Coder specializing in liquid shader reveals, high-performance React architectures & AI design systems.
            </p>
          </div>

          <div className="footer-links-col">
            <span className="col-label">NAVIGATION</span>
            <a href="#page-1" className="footer-nav-link">Home</a>
            <a href="#work" className="footer-nav-link">Client Work</a>
            <a href="#about" className="footer-nav-link">Studio Archives</a>
          </div>

          <div className="footer-links-col">
            <span className="col-label">CONNECT</span>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-nav-link">GitHub ↗</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-nav-link">Twitter / X ↗</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-nav-link">LinkedIn ↗</a>
            <a href="https://figma.com" target="_blank" rel="noreferrer" className="footer-nav-link">Figma ↗</a>
          </div>
        </div>

        {/* Bottom Row: Copyright & Back to Top */}
        <div className="footer-bottom-bar">
          <span className="copy-rights">© 2026 RISHABH YADAV. ALL RIGHTS RESERVED.</span>
          <button className="back-to-top-btn" onClick={scrollToTop}>
            Back to Top ↑
          </button>
        </div>

      </div>
    </footer>
  );
}
