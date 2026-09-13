import './index.css'

const colorMap = {
  green: '#10B981',
  blue: '#3B82F6',
  purple: '#8B5CF6',
  orange: '#F59E0B',
  pink: '#EC4899',
  teal: '#14B8A6',
  red: '#EF4444',
  indigo: '#6366F1',
}

const projects = [
  {
    title: 'Jaganalar',
    desc: 'Educational app for detecting fake vs. real news. Interactive modules, level progression, AI-powered question generation and user feedback.',
    tags: [
      { label: 'Flutter', color: 'blue' },
      { label: 'AI', color: 'purple' },
      { label: 'Solo', color: 'teal' },
    ],
    link: 'https://github.com/femnixx/jaganalar',
    preview: 'phone',
    accent: 'purple',
  },
  {
    title: 'Sigma — Siaga Malang',
    desc: 'Public safety mobile app for real-time emergency reporting, AI analytics, emergency call integration, and news module.',
    tags: [
      { label: 'Flutter', color: 'blue' },
      { label: 'AI', color: 'purple' },
      { label: 'Team', color: 'orange' },
    ],
    link: 'https://github.com/Raion-Mobile-Engineer/ZELOW',
    preview: 'phone',
    accent: 'red',
  },
  {
    title: 'Phishing Email Detector',
    desc: 'Tool that detects potential phishing attempts from user-submitted URLs or text using AI/ML models.',
    tags: [
      { label: 'Python', color: 'green' },
      { label: 'AI/ML', color: 'indigo' },
    ],
    link: 'https://github.com/femnixx/phishing-email-detector',
    preview: 'desktop',
    accent: 'indigo',
  },
  {
    title: 'Audit App — Sekawan Media',
    desc: 'Internal audit application built for Sekawan Media. Supports structured audits, reporting workflows, and data management.',
    tags: [
      { label: 'Laravel', color: 'pink' },
      { label: 'Full-stack', color: 'teal' },
    ],
    link: null,
    preview: 'dashboard',
    accent: 'orange',
  },
  {
    title: 'Laravel Dashboard',
    desc: 'Custom dashboard built with Laravel for admin and analytics use cases.',
    tags: [
      { label: 'Laravel', color: 'pink' },
      { label: 'PHP', color: 'indigo' },
    ],
    link: 'https://github.com/femnixx/laravel-dashboard',
    preview: 'dashboard',
    accent: 'blue',
  },
  {
    title: 'Foodmind',
    desc: 'Application focused on food tracking, meal planning, or nutrition management.',
    tags: [
      { label: 'Flutter', color: 'blue' },
      { label: 'Mobile', color: 'green' },
    ],
    link: 'https://github.com/femnixx/foodmind',
    preview: 'phone',
    accent: 'green',
  },
  {
    title: 'Mining Technical Test',
    desc: 'Technical project involving data processing and algorithmic challenges.',
    tags: [
      { label: 'Python', color: 'green' },
      { label: 'Algorithms', color: 'purple' },
    ],
    link: 'https://github.com/femnixx/mining-technical-test',
    preview: 'data',
    accent: 'orange',
  },
  {
    title: 'Auto File Sorter',
    desc: 'Automation tool that sorts files into organized directories based on file type or custom rules.',
    tags: [
      { label: 'Python', color: 'green' },
      { label: 'Automation', color: 'teal' },
    ],
    link: 'https://github.com/femnixx/auto-file-sorter',
    preview: 'files',
    accent: 'teal',
  },
  {
    title: 'Dockerized Todo App',
    desc: 'Todo application containerized with Docker, featuring a complete development and deployment setup.',
    tags: [
      { label: 'Docker', color: 'blue' },
      { label: 'Full-stack', color: 'teal' },
    ],
    link: 'https://github.com/femnixx/dockerized-todo-app',
    preview: 'todo',
    accent: 'blue',
  },
]

function ProjectPreview({ type, accent }) {
  const accentColor = colorMap[accent] || '#000000'

  if (type === 'phone') {
    return (
      <div className="project-preview-inner">
        <div className="preview-accent" style={{ background: accentColor }} />
        <div className="project-preview-bar">
          <div className="project-preview-dot" />
          <div className="project-preview-dot" />
          <div className="project-preview-dot" />
        </div>
        <div className="project-preview-content">
          <div className="project-preview-line short" />
          <div className="project-preview-line long" />
          <div className="project-preview-line medium" />
          <div className="project-preview-line short" />
        </div>
      </div>
    )
  }

  if (type === 'desktop') {
    return (
      <div className="project-preview-inner">
        <div className="preview-accent" style={{ background: accentColor }} />
        <div className="project-preview-bar">
          <div className="project-preview-dot" />
          <div className="project-preview-dot" />
          <div className="project-preview-dot" />
        </div>
        <div className="project-preview-content">
          <div className="project-preview-line medium" />
          <div className="project-preview-line long" />
          <div className="project-preview-line short" />
          <div className="project-preview-line long" />
        </div>
      </div>
    )
  }

  if (type === 'dashboard') {
    return (
      <div className="project-preview-inner">
        <div className="preview-accent" style={{ background: accentColor }} />
        <div className="project-preview-bar">
          <div className="project-preview-dot" />
          <div className="project-preview-dot" />
          <div className="project-preview-dot" />
        </div>
        <div className="project-preview-content" style={{ flexDirection: 'row' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div className="project-preview-line short" />
            <div className="project-preview-line medium" />
            <div className="project-preview-line short" />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
            <div className="project-preview-line medium" />
            <div className="project-preview-line short" />
            <div className="project-preview-line long" />
          </div>
        </div>
      </div>
    )
  }

  if (type === 'data') {
    return (
      <div className="project-preview-inner">
        <div className="preview-accent" style={{ background: accentColor }} />
        <div className="project-preview-bar">
          <div className="project-preview-dot" />
          <div className="project-preview-dot" />
          <div className="project-preview-dot" />
        </div>
        <div className="project-preview-content">
          <div style={{ display: 'flex', gap: 4 }}>
            <div className="project-preview-line short" style={{ flex: 1 }} />
            <div className="project-preview-line medium" style={{ flex: 1 }} />
            <div className="project-preview-line short" style={{ flex: 1 }} />
          </div>
          <div className="project-preview-line long" />
          <div className="project-preview-line medium" />
          <div className="project-preview-line short" />
        </div>
      </div>
    )
  }

  if (type === 'files') {
    return (
      <div className="project-preview-inner">
        <div className="preview-accent" style={{ background: accentColor }} />
        <div className="project-preview-bar">
          <div className="project-preview-dot" />
          <div className="project-preview-dot" />
          <div className="project-preview-dot" />
        </div>
        <div className="project-preview-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, background: 'var(--border)', borderRadius: 2 }} />
              <div className="project-preview-line short" style={{ flex: 1, margin: 0 }} />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, background: 'var(--border)', borderRadius: 2 }} />
              <div className="project-preview-line medium" style={{ flex: 1, margin: 0 }} />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, background: 'var(--border)', borderRadius: 2 }} />
              <div className="project-preview-line short" style={{ flex: 1, margin: 0 }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'todo') {
    return (
      <div className="project-preview-inner">
        <div className="preview-accent" style={{ background: accentColor }} />
        <div className="project-preview-bar">
          <div className="project-preview-dot" />
          <div className="project-preview-dot" />
          <div className="project-preview-dot" />
        </div>
        <div className="project-preview-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 10, height: 10, border: '1px solid var(--border)', borderRadius: 2 }} />
              <div className="project-preview-line medium" style={{ flex: 1, margin: 0 }} />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 10, height: 10, border: '1px solid var(--border)', borderRadius: 2 }} />
              <div className="project-preview-line short" style={{ flex: 1, margin: 0 }} />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 10, height: 10, background: 'var(--border)', borderRadius: 2 }} />
              <div className="project-preview-line long" style={{ flex: 1, margin: 0 }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

function ProjectCard({ title, desc, tags, link, preview, accent }) {
  return (
    <div className="project-card">
      <div className="project-preview">
        <ProjectPreview type={preview} accent={accent} />
      </div>
      <div className="project-info">
        <div className="project-title">{title}</div>
        <div className="project-desc">{desc}</div>
        <div className="project-meta">
          <div className="project-tags">
            {tags.map((tag) => (
              <span key={tag.label} className="tag" data-color={tag.color}>{tag.label}</span>
            ))}
          </div>
          {link ? (
            <a className="project-link" href={link} target="_blank" rel="noopener">GitHub →</a>
          ) : (
            <span className="project-link" style={{ opacity: 0.4, cursor: 'default' }}>Private</span>
          )}
        </div>
      </div>
    </div>
  )
}

function Cat() {
  return (
    <div className="cat-wrap">
      <div className="cat">
        <div className="cat-ear left" />
        <div className="cat-ear right" />
        <div className="cat-head">
          <div className="cat-eye left" />
          <div className="cat-eye right" />
        </div>
        <div className="cat-body">
          <div className="cat-paw left" />
          <div className="cat-paw right" />
        </div>
        <div className="cat-tail" />
      </div>
    </div>
  )
}

function Stars() {
  return (
    <div className="stars">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="star" />
      ))}
    </div>
  )
}

function App() {
  return (
    <>
      <Stars />
      <nav>
        <a className="nav-name" href="#hero">Surya Pradipta</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="container">
          <div className="hero-meta">Malang, Indonesia · 2026</div>
          <h1 className="hero-name">
            <strong>Surya</strong> builds apps<br />
            and solves problems.
          </h1>
          <p className="hero-sub">
            Computer Science student. Full-stack developer. I work end-to-end —
            from idea to deployment. Always learning, always shipping.
          </p>
          <a className="hero-cta" href="#projects">View projects →</a>
        </div>
        <Cat />
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="section-header">01 — About</div>
          <div className="about-text">
            <p>
              I'm a 19-year-old Computer Science student from Malang who got into
              coding because I genuinely enjoy building things that work. Not just
              theoretically — <strong>actually shipped, actually used.</strong>
            </p>
            <p>
              I've built mobile apps for emergency reporting, educational
              platforms with AI feedback, custom budgeting tools, and security
              auditing systems. Mostly under tight deadlines and in small teams.
            </p>
            <p>
              I've learned that <strong>showing up, communicating clearly, and
              delivering what you promised</strong> matters more than being the
              smartest person in the room. I'm always adapting. If I don't know
              something, I figure it out.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="container">
          <div className="section-header">02 — Selected Work</div>
          <div className="projects-grid">
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="section-header">03 — Contact</div>
          <div className="contact-grid">
            <div>
              <div className="contact-label">Status</div>
              <div className="contact-text">
                Open for freelance work — web apps, mobile apps, backends.
                <br />
                Starting from <strong>Rp 1.3jt</strong>.
              </div>
            </div>
            <div>
              <div className="contact-label">Links</div>
              <div className="contact-links">
                <a
                  className="contact-link"
                  href="https://wa.me/6282248969863"
                  target="_blank"
                  rel="noopener"
                >
                  WhatsApp
                </a>
                <a
                  className="contact-link"
                  href="mailto:suryarpadipta06@gmail.com"
                >
                  Email
                </a>
                <a
                  className="contact-link"
                  href="https://github.com/femnixx"
                  target="_blank"
                  rel="noopener"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span>Surya Pradipta · Malang, Indonesia</span>
        <span>2026</span>
      </footer>
    </>
  )
}

export default App
