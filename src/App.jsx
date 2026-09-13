import React from 'react'
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
    id: 1,
    title: 'Jaganalar',
    desc: 'Educational app for detecting fake vs. real news. Interactive modules, level progression, AI-powered question generation and user feedback.',
    tags: [
      { label: 'Flutter', color: 'blue' },
      { label: 'AI', color: 'purple' },
      { label: 'Solo', color: 'teal' },
    ],
    link: 'https://github.com/femnixx/jaganalar',
    accent: 'purple',
  },
  {
    id: 2,
    title: 'Sigma — Siaga Malang',
    desc: 'Public safety mobile app for real-time emergency reporting, AI analytics, emergency call integration, and news module.',
    tags: [
      { label: 'Flutter', color: 'blue' },
      { label: 'AI', color: 'purple' },
      { label: 'Team', color: 'orange' },
    ],
    link: 'https://github.com/Raion-Mobile-Engineer/ZELOW',
    accent: 'red',
  },
  {
    id: 3,
    title: 'Phishing Email Detector',
    desc: 'Tool that detects potential phishing attempts from user-submitted URLs or text using AI/ML models.',
    tags: [
      { label: 'Python', color: 'green' },
      { label: 'AI/ML', color: 'indigo' },
    ],
    link: 'https://github.com/femnixx/phishing-email-detector',
    accent: 'indigo',
  },
  {
    id: 4,
    title: 'Laravel Dashboard',
    desc: 'Custom dashboard built with Laravel for admin and analytics use cases.',
    tags: [
      { label: 'Laravel', color: 'pink' },
      { label: 'PHP', color: 'indigo' },
    ],
    link: 'https://github.com/femnixx/laravel-dashboard',
    accent: 'blue',
  },
  {
    id: 5,
    title: 'Foodmind',
    desc: 'Application focused on food tracking, meal planning, or nutrition management.',
    tags: [
      { label: 'Flutter', color: 'blue' },
      { label: 'Mobile', color: 'green' },
    ],
    link: 'https://github.com/femnixx/foodmind',
    accent: 'green',
  },
  {
    id: 6,
    title: 'Mining Technical Test',
    desc: 'Technical project involving data processing and algorithmic challenges.',
    tags: [
      { label: 'Python', color: 'green' },
      { label: 'Algorithms', color: 'purple' },
    ],
    link: 'https://github.com/femnixx/mining-technical-test',
    accent: 'orange',
  },
  {
    id: 7,
    title: 'Auto File Sorter',
    desc: 'Automation tool that sorts files into organized directories based on file type or custom rules.',
    tags: [
      { label: 'Python', color: 'green' },
      { label: 'Automation', color: 'teal' },
    ],
    link: 'https://github.com/femnixx/auto-file-sorter',
    accent: 'teal',
  },
  {
    id: 8,
    title: 'Dockerized Todo App',
    desc: 'Todo application containerized with Docker, featuring a complete development and deployment setup.',
    tags: [
      { label: 'Docker', color: 'blue' },
      { label: 'Full-stack', color: 'teal' },
    ],
    link: 'https://github.com/femnixx/dockerized-todo-app',
    accent: 'blue',
  },
]

function ProjectRow({ title, desc, tags, link, accent, isOpen, onClick }) {
  const accentColor = colorMap[accent] || '#000000'
  return (
    <div className={`project-row ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <div className="project-row-left">
        <div className="project-row-accent" style={{ background: accentColor }} />
        <div className="project-row-content">
          <div className="project-row-header">
            <span className="project-row-title">{title}</span>
            <span className="project-row-arrow">{isOpen ? '−' : '+'}</span>
          </div>
          {isOpen && (
            <div className="project-row-details">
              <p>{desc}</p>
              <div className="project-tags">
                {tags.map((tag) => (
                  <span key={tag.label} className="tag" data-color={tag.color}>{tag.label}</span>
                ))}
              </div>
              {link && (
                <a className="project-row-link" href={link} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
                  View on GitHub →
                </a>
              )}
            </div>
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

function FloatingShapes() {
  const shapes = [
    { type: 'circle', color: 'var(--c-green)', size: 60, top: '15%', left: '10%', duration: 12, delay: 0 },
    { type: 'square', color: 'var(--c-blue)', size: 40, top: '25%', right: '12%', duration: 15, delay: 2 },
    { type: 'triangle', color: 'var(--c-purple)', size: 50, top: '55%', left: '8%', duration: 18, delay: 4 },
    { type: 'circle', color: 'var(--c-orange)', size: 35, top: '70%', right: '15%', duration: 14, delay: 1 },
    { type: 'square', color: 'var(--c-pink)', size: 45, top: '40%', right: '8%', duration: 16, delay: 3 },
    { type: 'triangle', color: 'var(--c-teal)', size: 55, top: '80%', left: '15%', duration: 20, delay: 5 },
    { type: 'circle', color: 'var(--c-red)', size: 30, top: '10%', right: '20%', duration: 13, delay: 2.5 },
    { type: 'square', color: 'var(--c-indigo)', size: 50, top: '60%', left: '20%', duration: 17, delay: 1.5 },
  ]

  return (
    <div className="floating-shapes">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className={`floating-shape floating-${shape.type}`}
          style={{
            width: shape.size,
            height: shape.size,
            background: shape.color,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            animationDuration: `${shape.duration}s`,
            animationDelay: `${shape.delay}s`,
          }}
        />
      ))}
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

function ClickSpeedGame() {
  const [clicks, setClicks] = React.useState(0)
  const [timeLeft, setTimeLeft] = React.useState(5)
  const [active, setActive] = React.useState(false)
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    if (!active || timeLeft <= 0) {
      if (active && timeLeft <= 0) setDone(true)
      return
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(t)
  }, [active, timeLeft])

  const start = () => {
    setClicks(0)
    setTimeLeft(5)
    setActive(true)
    setDone(false)
  }

  return (
    <div className="game-card">
      <div className="game-title">⚡ Click Speed</div>
      <div className="game-desc">Click as fast as you can in 5 seconds</div>
      {!active && !done && (
        <button className="game-btn" onClick={start}>Start</button>
      )}
      {active && (
        <>
          <div className="game-score">Clicks: {clicks}</div>
          <div className="game-timer">{timeLeft}s</div>
          <button className="game-btn" onClick={() => setClicks((c) => c + 1)}>
            CLICK!
          </button>
        </>
      )}
      {done && (
        <div className="game-result">
          <div>You clicked <strong>{clicks}</strong> times!</div>
          <button className="game-btn" onClick={start}>Play Again</button>
        </div>
      )}
    </div>
  )
}

function ReactionGame() {
  const [state, setState] = React.useState('waiting') // waiting, ready, go, result
  const [time, setTime] = React.useState(0)
  const [startTime, setStartTime] = React.useState(0)
  const [best, setBest] = React.useState(null)

  React.useEffect(() => {
    if (state === 'ready') {
      const delay = 1500 + Math.random() * 3000
      const t = setTimeout(() => {
        setState('go')
        setStartTime(Date.now())
      }, delay)
      return () => clearTimeout(t)
    }
  }, [state])

  const start = () => {
    setState('waiting')
    setTimeout(() => setState('ready'), 500)
  }

  const handleClick = () => {
    if (state === 'waiting') {
      setState('waiting')
      alert('Wait for green!')
      return
    }
    if (state === 'ready') {
      setState('result')
      setTime(0)
      return
    }
    if (state === 'go') {
      const reaction = Date.now() - startTime
      setTime(reaction)
      setBest((b) => b === null ? reaction : Math.min(b, reaction))
      setState('result')
    }
  }

  const reset = () => {
    setState('waiting')
    setTime(0)
  }

  return (
    <div className="game-card" onClick={handleClick}>
      <div className="game-title">🎯 Reaction Time</div>
      <div className="game-desc">Click when the box turns green</div>
      {state === 'waiting' && (
        <button className="game-btn" onClick={(e) => { e.stopPropagation(); start() }}>Start</button>
      )}
      {state === 'ready' && (
        <div className="game-box waiting">Wait...</div>
      )}
      {state === 'go' && (
        <div className="game-box go">CLICK!</div>
      )}
      {state === 'result' && (
        <div className="game-result">
          <div>Reaction: <strong>{time}ms</strong></div>
          {best !== null && <div>Best: <strong>{best}ms</strong></div>}
          <button className="game-btn" onClick={(e) => { e.stopPropagation(); reset() }}>Play Again</button>
        </div>
      )}
    </div>
  )
}

function MemoryGame() {
  const emojis = ['🎮', '🎨', '🚀', '💡', '🎵', '⭐']
  const [cards, setCards] = React.useState(() => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    return shuffled.map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }))
  })
  const [flipped, setFlipped] = React.useState([])
  const [moves, setMoves] = React.useState(0)
  const [won, setWon] = React.useState(false)

  React.useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped
      if (cards[a].emoji === cards[b].emoji) {
        setCards((c) => c.map((card, i) => i === a || i === b ? { ...card, matched: true } : card))
        setFlipped([])
      } else {
        setTimeout(() => {
          setFlipped([])
        }, 800)
      }
      setMoves((m) => m + 1)
    }
  }, [flipped, cards])

  React.useEffect(() => {
    if (cards.every((c) => c.matched) && cards.length > 0) {
      setWon(true)
    }
  }, [cards])

  const flip = (i) => {
    if (flipped.length === 2 || cards[i].flipped || cards[i].matched) return
    setFlipped((f) => [...f, i])
    setCards((c) => c.map((card, idx) => idx === i ? { ...card, flipped: true } : card))
  }

  const reset = () => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    setCards(shuffled.map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false })))
    setFlipped([])
    setMoves(0)
    setWon(false)
  }

  return (
    <div className="game-card">
      <div className="game-title">🃏 Memory Match</div>
      <div className="game-desc">Match all the pairs</div>
      <div className="memory-grid">
        {cards.map((card, i) => (
          <button
            key={card.id}
            className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => flip(i)}
          >
            <span className="memory-front">?</span>
            <span className="memory-back">{card.emoji}</span>
          </button>
        ))}
      </div>
      <div className="game-footer">
        <span>Moves: {moves}</span>
        {won && <span className="game-win">You won!</span>}
        <button className="game-btn small" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

function App() {
  const [openProjects, setOpenProjects] = React.useState({})

  const toggleProject = (id) => {
    setOpenProjects((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>
      <FloatingShapes />
      <Stars />
      <nav>
        <a className="nav-name" href="#hero">Surya Pradipta</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#games">Games</a></li>
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
          <div className="projects-list">
            {projects.map((p) => (
              <ProjectRow
                key={p.id}
                {...p}
                isOpen={!!openProjects[p.id]}
                onClick={() => toggleProject(p.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* GAMES */}
      <section id="games">
        <div className="container">
          <div className="section-header">04 — Mini Games</div>
          <p className="games-intro">A few small browser games I built for fun. Click, match, and test your reflexes.</p>
          <div className="games-grid">
            <ClickSpeedGame />
            <ReactionGame />
            <MemoryGame />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="section-header">05 — Contact</div>
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
