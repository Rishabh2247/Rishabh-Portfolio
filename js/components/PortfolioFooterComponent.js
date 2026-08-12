const { useState, useEffect } = React;

function PortfolioFooterComponent() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
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
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Send form data as email to rishabhy2247@gmail.com via FormSubmit AJAX service
      const response = await fetch('https://formsubmit.co/ajax/rishabhy2247@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `⚡ New Portfolio Enquiry from ${formData.name}`,
          _template: 'table'
        })
      });

      const result = await response.json();
      if (response.ok || result.success === 'true' || result.success === true) {
        setSubmitted(true);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMsg('Could not send automatically. You can also send via mail app:');
    } finally {
      setIsSubmitting(false);
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
                <h4 className="success-title">Enquiry Sent Successfully!</h4>
                <p className="success-desc">
                  Thanks for reaching out, <strong>{formData.name || 'friend'}</strong>. Your enquiry has been sent to <strong>rishabhy2247@gmail.com</strong>. I'll get back to you shortly!
                </p>
                <button 
                  type="button" 
                  className="footer-form-submit-btn" 
                  style={{ marginTop: '14px', width: 'auto' }}
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                >
                  Send Another Message 💬
                </button>
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
                      disabled={isSubmitting}
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
                      placeholder="john@example.com" 
                      required 
                      disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    className="contact-textarea-field"
                  />
                </div>

                {errorMsg && (
                  <div className="form-error-msg" style={{ color: '#ff5555', fontSize: '0.84rem', fontFamily: 'Space Grotesk, sans-serif', margin: '4px 0' }}>
                    ⚠️ {errorMsg}{' '}
                    <a 
                      href={`mailto:rishabhy2247@gmail.com?subject=Enquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`}
                      style={{ color: '#ff8533', textDecoration: 'underline', fontWeight: 600 }}
                    >
                      Click here to email directly ↗
                    </a>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="footer-form-submit-btn"
                  style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'wait' : 'pointer' }}
                >
                  <span>{isSubmitting ? 'Sending Enquiry... ⏳' : 'Send Message 🚀'}</span>
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
