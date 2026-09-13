import React from 'react'
import './index.css'

const colorMap = {
  green: '#A6D189',
  blue: '#8CAAEE',
  purple: '#CA9EE6',
  orange: '#E5C890',
  pink: '#F4B8E4',
  teal: '#81C8BE',
  red: '#E78284',
  indigo: '#BABBF1',
}

const projects = [
  {
    id: 1,
    title: 'Jaganalar',
    desc: 'Educational app for detecting fake vs. real news. Interactive modules, level progression, AI-powered question generation and user feedback.',
    tags: [
      { label: 'Flutter', color: 'blue' },
      { label: 'Mobile', color: 'green' },
      { label: 'Education', color: 'orange' },
    ],
    link: 'https://github.com/femnixx/jaganalar',
    accent: 'purple',
  },
  {
    id: 2,
    title: 'ZELOW — Siaga Malang',
    desc: 'Public safety mobile app for real-time emergency reporting, AI analytics, emergency call integration, and news module. Built with Jetpack Compose.',
    tags: [
      { label: 'Flutter', color: 'blue' },
      { label: 'Mobile', color: 'green' },
      { label: 'Jetpack Compose', color: 'purple' },
      { label: 'Safety', color: 'red' },
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
    title: 'Foodmind',
    desc: 'Web-based application for food tracking, meal planning, and nutrition management. Built with React JSX.',
    tags: [
      { label: 'React', color: 'blue' },
      { label: 'Web', color: 'green' },
      { label: 'JSX', color: 'purple' },
    ],
    link: 'https://github.com/femnixx/foodmind',
    accent: 'green',
  },
  {
    id: 5,
    title: 'Laravel Dashboard',
    desc: 'Custom admin dashboard built with Laravel and PHP for analytics and management use cases.',
    tags: [
      { label: 'Laravel', color: 'pink' },
      { label: 'PHP', color: 'indigo' },
    ],
    link: 'https://github.com/femnixx/laravel-dashboard',
    accent: 'blue',
  },
  {
    id: 6,
    title: 'Mining Technical Test',
    desc: 'Technical project involving data processing and algorithmic challenges. Built with Laravel, Docker, and GitHub Workflows.',
    tags: [
      { label: 'Laravel', color: 'pink' },
      { label: 'Docker', color: 'blue' },
      { label: 'GitHub Workflow', color: 'purple' },
    ],
    link: 'https://github.com/femnixx/mining-technical-test',
    accent: 'orange',
  },
  {
    id: 7,
    title: 'Auto File Sorter',
    desc: 'Automation tool that sorts files into organized directories based on file type or custom rules. Built with Python and Docker.',
    tags: [
      { label: 'Python', color: 'green' },
      { label: 'Docker', color: 'blue' },
    ],
    link: 'https://github.com/femnixx/auto-file-sorter',
    accent: 'teal',
  },
  {
    id: 8,
    title: 'Dockerized Todo App',
    desc: 'Full-stack todo application containerized with Docker and built with React. Complete development and deployment setup.',
    tags: [
      { label: 'Docker', color: 'blue' },
      { label: 'React', color: 'purple' },
    ],
    link: 'https://github.com/femnixx/dockerized-todo-app',
    accent: 'blue',
  },
]

function ProjectRow({ title, desc, tags, link, accent, isOpen, onClick }) {
  const accentColor = colorMap[accent] || '#8CAAEE'
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

function LinuxDecorations() {
  return (
    <div className="linux-decorations">
      <div className="linux-tux">🐧</div>
      <div className="linux-ascii">
{`  ██████╗ ██╗    ██╗███╗   ██╗
  ██╔══██╗██║    ██║████╗  ██║
  ██████╔╝██║ █╗ ██║██╔██╗ ██║
  ██╔═══╝ ██║███╗██║██║╚██╗██║
  ██║     ╚███╔███╔╝██║ ╚████║
  ╚═╝      ╚══╝╚══╝ ╚═╝  ╚═══╝`}
      </div>
      <div className="linux-command">
        <div className="linux-command-line">$ neofetch</div>
        <div className="linux-command-line">$ uptime</div>
        <div className="linux-command-line">$ htop</div>
      </div>
    </div>
  )
}

function Terminal({ theme }) {
  const [history, setHistory] = React.useState([
    { type: 'output', text: `Welcome to Surya's portfolio terminal! (${theme} theme)` },
    { type: 'output', text: 'Type "help" to see available commands.' },
  ])
  const [input, setInput] = React.useState('')
  const [focused, setFocused] = React.useState(false)
  const endRef = React.useRef(null)
  const hiddenRef = React.useRef(null)

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  React.useEffect(() => {
    if (focused) {
      hiddenRef.current?.focus()
    }
  }, [focused])

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    setHistory((prev) => [...prev, { type: 'command', text: cmd }])

    let response = null

    if (trimmed === 'help') {
      response = {
        type: 'help',
        commands: [
          { cmd: 'help', desc: 'Show available commands' },
          { cmd: 'about', desc: 'About me' },
          { cmd: 'projects', desc: 'List my projects' },
          { cmd: 'skills', desc: 'My tech stack' },
          { cmd: 'contact', desc: 'Contact info' },
          { cmd: 'github', desc: 'GitHub profile' },
          { cmd: 'neofetch', desc: 'System info' },
          { cmd: 'whoami', desc: 'Who am I' },
          { cmd: 'ls', desc: 'List sections' },
          { cmd: 'clear', desc: 'Clear terminal' },
          { cmd: 'theme', desc: 'Toggle theme: frappe/latte' },
        ],
      }
    } else if (trimmed === 'about') {
      response = {
        type: 'output',
        text: "I'm a 19-year-old Computer Science student from Malang, Indonesia. I build mobile and web apps end-to-end — from idea to deployment. Always learning, always shipping.",
      }
    } else if (trimmed === 'projects') {
      response = {
        type: 'output',
        text: 'Jaganalar, ZELOW, Phishing Email Detector, Foodmind, Laravel Dashboard, Mining Technical Test, Auto File Sorter, Dockerized Todo App',
      }
    } else if (trimmed === 'skills') {
      response = {
        type: 'output',
        text: 'Flutter · React · Next.js · Node.js · Laravel · Firebase · MongoDB · Python · Docker · Linux · DevOps',
      }
    } else if (trimmed === 'contact') {
      response = {
        type: 'output',
        text: 'WhatsApp: +62 822-4896-9863 | Email: suryarpadipta06@gmail.com | GitHub: @femnixx',
      }
    } else if (trimmed === 'github') {
      response = {
        type: 'output',
        text: 'Opening GitHub profile... https://github.com/femnixx',
      }
    } else if (trimmed === 'neofetch') {
      response = {
        type: 'output',
        text: `OS: Arch Linux x86_64
Shell: zsh 5.9
Theme: Catppuccin ${theme === 'frappe' ? 'Frappe' : 'Latte'}
Terminal: kitty
CPU: AMD Ryzen 9 5900X
Memory: 32GB DDR4
Uptime: ${Math.floor(Math.random() * 100)} days`,
      }
    } else if (trimmed === 'whoami') {
      response = {
        type: 'output',
        text: 'Surya Pradipta — Software Engineer, DevOps Enthusiast, Linux User',
      }
    } else if (trimmed === 'ls') {
      response = {
        type: 'output',
        text: 'about/  projects/  games/  contact/  skills.txt  experience.log',
      }
    } else if (trimmed === 'clear') {
      setHistory([])
      return
    } else if (trimmed === 'theme') {
      const newTheme = theme === 'frappe' ? 'latte' : 'frappe'
      response = {
        type: 'output',
        text: `Theme switched to ${newTheme}. (Refresh to fully apply)`,
      }
      setTimeout(() => {
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
      }, 500)
    } else if (trimmed === '') {
      return
    } else {
      response = {
        type: 'error',
        text: `Command not found: ${trimmed}. Type "help" for available commands.`,
      }
    }

    setHistory((prev) => [...prev, response])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    processCommand(input)
    setInput('')
  }

  return (
    <div className="interactive-terminal" onClick={() => setFocused(true)}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <div className="terminal-title">femnixx@portfolio:~</div>
      </div>
      <div className="terminal-body">
        {history.map((line, i) => (
          <div key={i}>
            {line.type === 'command' && (
              <div className="terminal-line">
                <span className="terminal-prompt">➜</span>
                <span className="terminal-cmd">{line.text}</span>
              </div>
            )}
            {line.type === 'output' && (
              <div className="terminal-output">{line.text}</div>
            )}
            {line.type === 'error' && (
              <div className="terminal-output" style={{ color: 'var(--accent-red)' }}>{line.text}</div>
            )}
            {line.type === 'help' && (
              <div className="terminal-help-grid">
                {line.commands.map((c) => (
                  <div key={c.cmd}>
                    <span className="terminal-help-cmd">{c.cmd}</span>
                    <span className="terminal-help-desc"> — {c.desc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-row">
          <span className="terminal-prompt">➜</span>
          <span className="terminal-text-display">{input}</span>
          <span className="terminal-cursor-block" />
          <input
            ref={hiddenRef}
            className="terminal-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus={focused}
          />
        </form>
        <div ref={endRef} />
      </div>
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
  const [state, setState] = React.useState('waiting')
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
  const [githubProfile, setGithubProfile] = React.useState(null)
  const [githubRepos, setGithubRepos] = React.useState([])
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'frappe')

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  React.useEffect(() => {
    fetch('https://api.github.com/users/femnixx')
      .then((r) => r.json())
      .then(setGithubProfile)
      .catch(() => {})

    fetch('https://api.github.com/users/femnixx/repos?sort=updated&per_page=8')
      .then((r) => r.json())
      .then(setGithubRepos)
      .catch(() => {})
  }, [])

  const toggleProject = (id) => {
    setOpenProjects((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleTheme = () => {
    setTheme((t) => (t === 'frappe' ? 'latte' : 'frappe'))
  }

  return (
    <>
      <LinuxDecorations />
      <nav>
        <a className="nav-name" href="#hero">Surya Pradipta</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#github">GitHub</a></li>
          <li><a href="#games">Games</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><button className="theme-toggle" onClick={toggleTheme}>{theme === 'frappe' ? '☀️' : '🌙'}</button></li>
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
            <strong>Software Engineer.</strong> Full-stack developer. DevOps enthusiast.
            Linux enthusiast. I work end-to-end — from idea to deployment.
          </p>
          <a className="hero-cta" href="#projects">View projects →</a>
        </div>
        <div className="hero-decoration">
          <Terminal theme={theme} />
        </div>
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

      {/* GITHUB */}
      <section id="github">
        <div className="container">
          <div className="github-header">03 — GitHub</div>
          <div className="github-intro">My open source work and recent repositories.</div>
          {githubProfile && (
            <div className="github-profile">
              <img src={githubProfile.avatar_url} alt="avatar" className="github-avatar" />
              <div className="github-profile-info">
                <div className="github-profile-name">{githubProfile.name || githubProfile.login}</div>
                <div className="github-profile-login">@{githubProfile.login}</div>
                {githubProfile.bio && <div className="github-profile-bio">{githubProfile.bio}</div>}
                <div className="github-profile-stats">
                  <span className="github-profile-stat">📦 {githubProfile.public_repos}</span>
                  <span className="github-profile-stat">👥 {githubProfile.followers}</span>
                  <span className="github-profile-stat">📍 {githubProfile.location || 'Indonesia'}</span>
                </div>
              </div>
            </div>
          )}
          <div className="github-repos-grid">
            {githubRepos.map((repo) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener" className="github-repo-card">
                <div className="github-repo-name">{repo.name}</div>
                {repo.description && <div className="github-repo-desc">{repo.description}</div>}
                <div className="github-repo-meta">
                  <span className="github-repo-lang">
                    <span className="github-lang-dot" style={{ background: repo.language ? (repo.language === 'JavaScript' ? '#E5C890' : repo.language === 'PHP' ? '#BABBF1' : repo.language === 'Python' ? '#A6D189' : repo.language === 'Dart' ? '#8CAAEE' : repo.language === 'Java' ? '#E78284' : '#CA9EE6') : 'var(--text-muted)' }} />
                    {repo.language || 'Unknown'}
                  </span>
                  <span>⭐ {repo.stargazers_count}</span>
                </div>
              </a>
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
              <div className="contact-label">Roles</div>
              <div className="contact-roles">
                <div className="role-item">
                  <span className="role-icon">💻</span>
                  <span><strong>Software Engineer</strong></span>
                </div>
                <div className="role-item">
                  <span className="role-icon">🔧</span>
                  <span><strong>DevOps Engineer</strong></span>
                </div>
                <div className="role-item">
                  <span className="role-icon">🐧</span>
                  <span><strong>Linux Enthusiast</strong></span>
                </div>
                <div className="role-item">
                  <span className="role-icon">📱</span>
                  <span><strong>Mobile Developer</strong></span>
                </div>
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
