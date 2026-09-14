import React, { useState, useEffect, useMemo } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'
import './GitHubProfileViewer.css'

const LANGUAGE_COLORS = {
  JavaScript: '#E5C890',
  TypeScript: '#8CAAEE',
  Python: '#A6D189',
  Java: '#E78284',
  Dart: '#8CAAEE',
  PHP: '#BABBF1',
  Go: '#8CAAEE',
  Rust: '#E78284',
  Ruby: '#E78284',
  'C++': '#8CAAEE',
  C: '#8CAAEE',
  HTML: '#E78284',
  CSS: '#8CAAEE',
  Vue: '#A6D189',
  React: '#8CAAEE',
  Shell: '#A6D189',
  default: '#CA9EE6',
}

function getLanguageColor(lang) {
  return LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.default
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOURS = Array.from({ length: 24 }, (_, i) => i)

function GitHubProfileViewer({ defaultUsername = 'femnixx' }) {
  const [username, setUsername] = useState(defaultUsername)
  const [input, setInput] = useState(defaultUsername)
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rateLimit, setRateLimit] = useState(null)

  const fetchWithTimeout = (url, ms = 12000) => {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), ms)
    )
    return Promise.race([fetch(url), timeout])
  }

  const fetchData = async (name) => {
    if (!name.trim()) return

    setLoading(true)
    setError(null)
    setRateLimit(null)

    try {
      const [profileRes, reposRes, eventsRes] = await Promise.all([
        fetchWithTimeout(`https://api.github.com/users/${name}`),
        fetchWithTimeout(`https://api.github.com/users/${name}/repos?sort=updated&per_page=100`),
        fetchWithTimeout(`https://api.github.com/users/${name}/events/public?per_page=300`),
      ])

      if (profileRes.status === 403 || reposRes.status === 403 || eventsRes.status === 403) {
        const resetTime = profileRes.headers.get('X-RateLimit-Reset')
        const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null
        setRateLimit({
          message: 'GitHub API rate limit exceeded',
          reset: resetDate ? resetDate.toLocaleTimeString() : 'soon',
        })
        setLoading(false)
        return
      }

      if (profileRes.status === 404) {
        setError(`User "${name}" not found`)
        setLoading(false)
        return
      }

      if (!profileRes.ok || !reposRes.ok || !eventsRes.ok) {
        throw new Error('Failed to fetch GitHub data')
      }

      const profileData = await profileRes.json()
      const reposData = await reposRes.json()
      const eventsData = await eventsRes.json()

      setProfile(profileData)
      setRepos(Array.isArray(reposData) ? reposData : [])
      setEvents(Array.isArray(eventsData) ? eventsData : [])
      setUsername(name)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(defaultUsername)
  }, [defaultUsername])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData(input)
  }

  const languageStats = useMemo(() => {
    const counts = {}
    repos.forEach((repo) => {
      const lang = repo.language
      if (lang) counts[lang] = (counts[lang] || 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([lang, count]) => ({ language: lang, count, color: getLanguageColor(lang) }))
  }, [repos])

  const topLanguage = languageStats[0]?.language || 'N/A'

  const radarData = useMemo(() => {
    const total = languageStats.reduce((sum, item) => sum + item.count, 0)
    return languageStats.map((item) => ({
      subject: `${total ? Math.round((item.count / total) * 100) : 0}%\n${item.language}`,
      value: Math.max(total ? Math.round((item.count / total) * 100) : 0, 5),
      color: item.color,
    }))
  }, [languageStats])

  const totalStars = useMemo(() => repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0), [repos])
  const totalForks = useMemo(() => repos.reduce((sum, r) => sum + (r.forks_count || 0), 0), [repos])

  const commitActivity = useMemo(() => {
    const grid = Array.from({ length: 7 }, () => Array(24).fill(0))
    events.forEach((event) => {
      if (event.type === 'PushEvent') {
        const commits = event.payload?.commits || []
        const timestamps = commits.map((c) => c?.timestamp).filter(Boolean)
        const dates = timestamps.length > 0
          ? timestamps.map((ts) => new Date(ts))
          : [new Date(event.created_at)]

        dates.forEach((date) => {
          const day = date.getDay()
          const hour = date.getHours()
          grid[day][hour] += 1
        })
      }
    })
    return grid
  }, [events])

  const punchCardMax = useMemo(() => {
    let max = 0
    commitActivity.forEach((row) => row.forEach((val) => { if (val > max) max = val }))
    return max || 1
  }, [commitActivity])

  const getPunchStrength = (val) => {
    if (val <= 0) return 0
    const minStrength = 20
    const ratio = Math.max(0, Math.min(1, val / punchCardMax))
    return minStrength + Math.round(ratio * (100 - minStrength))
  }

  const totalCommitsLastYear = useMemo(() => {
    const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000
    return events
      .filter((e) => new Date(e.created_at).getTime() > oneYearAgo && e.type === 'PushEvent')
      .reduce((sum, e) => sum + (e.payload?.commits?.length || 1), 0)
  }, [events])

  const prMergeRate = useMemo(() => {
    const prEvents = events.filter((e) => e.type === 'PullRequestEvent')
    if (prEvents.length === 0) return 0
    const merged = prEvents.filter((e) => e.payload?.pull_request?.merged).length
    return Math.round((merged / prEvents.length) * 100)
  }, [events])

  const recentActivity = useMemo(() => {
    return events.slice(0, 20).map((event) => {
      let icon = '📝'
      let text = event.type
      if (event.type === 'PushEvent') {
        icon = '🔨'
        text = `Pushed ${event.payload?.commits?.length || 1} commit(s) to ${event.repo?.name || 'a repo'}`
      } else if (event.type === 'PullRequestEvent') {
        icon = '🔀'
        text = `PR ${event.payload?.action} in ${event.repo?.name || 'a repo'}`
      } else if (event.type === 'IssuesEvent') {
        icon = '🐛'
        text = `Issue ${event.payload?.action} in ${event.repo?.name || 'a repo'}`
      } else if (event.type === 'PullRequestReviewEvent') {
        icon = '👀'
        text = `Reviewed PR in ${event.repo?.name || 'a repo'}`
      } else if (event.type === 'CreateEvent') {
        icon = '✨'
        text = `Created ${event.payload?.ref_type || 'resource'} in ${event.repo?.name || 'a repo'}`
      }
      return { ...event, icon, text }
    })
  }, [events])

  const orgs = [
    { name: 'Raion-Community', url: 'https://github.com/Raion-Community' },
    { name: 'sync-up-org', url: 'https://github.com/sync-up-org' },
    { name: 'Raion-Mobile-Engineer', url: 'https://github.com/Raion-Mobile-Engineer' },
  ]

  return (
    <div className="gh-dashboard">
      <form className="gh-input-row" onSubmit={handleSubmit}>
        <input
          className="gh-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter GitHub username..."
        />
        <button className="gh-btn" type="submit" disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Activity'}
        </button>
      </form>

      {error && <div className="gh-error">{error}</div>}
      {rateLimit && (
        <div className="gh-error">
          {rateLimit.message}. Try again after {rateLimit.reset}.
        </div>
      )}

      {profile && (
        <>
          <div className="gh-top-row">
            <div className="gh-profile-header">
              <img src={profile.avatar_url} alt="avatar" className="gh-avatar-large" />
              <div className="gh-profile-info">
                <div className="gh-name-large">{profile.name || profile.login}</div>
                <div className="gh-login">@{profile.login}</div>
                {profile.bio && <div className="gh-bio">{profile.bio}</div>}
                <div className="gh-profile-stats">
                  <div className="gh-stat">
                    <span className="gh-stat-value">{profile.public_repos}</span>
                    <span className="gh-stat-label">Repos</span>
                  </div>
                  <div className="gh-stat">
                    <span className="gh-stat-value">{totalStars}</span>
                    <span className="gh-stat-label">Stars</span>
                  </div>
                  <div className="gh-stat">
                    <span className="gh-stat-value">{totalForks}</span>
                    <span className="gh-stat-label">Forks</span>
                  </div>
                  <div className="gh-stat">
                    <span className="gh-stat-value">{profile.followers}</span>
                    <span className="gh-stat-label">Followers</span>
                  </div>
                  <div className="gh-stat">
                    <span className="gh-stat-value">{profile.following}</span>
                    <span className="gh-stat-label">Following</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="gh-quick-stats">
              <div className="gh-quick-card">
                <div className="gh-quick-label">Total Commits (Last 365 Days)</div>
                <div className="gh-quick-value">{totalCommitsLastYear}</div>
              </div>
              <div className="gh-quick-card">
                <div className="gh-quick-label">Pull Request Merge Rate</div>
                <div className="gh-quick-value">{prMergeRate}%</div>
              </div>
              <div className="gh-quick-card">
                <div className="gh-quick-label">Top Used Language</div>
                <div className="gh-quick-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="gh-lang-dot" style={{ background: getLanguageColor(topLanguage) }} />
                  {topLanguage}
                </div>
              </div>
            </div>
          </div>

          <div className="gh-middle-row">
            <div className="gh-radar-section">
              <div className="gh-section-title">Language Overview</div>
              <div className="gh-radar-container">
                {radarData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="62%"
                      margin={{ top: 28, right: 36, bottom: 28, left: 36 }}
                      data={radarData}
                    >
                      <PolarGrid stroke="var(--border)" />
                      <PolarAngleAxis
                        dataKey="subject"
                        stroke="var(--text-muted)"
                        tickLine={false}
                        tick={({ x, y, payload }) => {
                          const lines = payload.value.split('\n')
                          const color = radarData[payload.index]?.color || 'var(--accent-mauve)'
                          const labelY = y < 150 ? y - 16 : y + 16
                          return (
                            <text x={x} y={labelY} fill="var(--text-muted)" fontSize={13} textAnchor="middle" dominantBaseline="middle">
                              <tspan x={x} dy="-0.4em" fontWeight="bold" fill={color}>
                                {lines[0]}
                              </tspan>
                              <tspan x={x} dy="1.9em">
                                {lines[1]}
                              </tspan>
                            </text>
                          )
                        }}
                      />
                      <Radar
                        dataKey="value"
                        stroke="var(--accent-green)"
                        fill="var(--accent-green)"
                        fillOpacity={0.35}
                        strokeWidth={2}
                        dot={{ r: 4, fill: 'var(--accent-green)', stroke: '#ffffff', strokeWidth: 1 }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="gh-radar-loading">No language data available</div>
                )}
              </div>
            </div>

            <div className="gh-punch-section">
              <div className="gh-section-title">Activity Punch Card</div>
              <div className="gh-punch-card">
                <div className="gh-punch-header">
                  <div className="gh-punch-day-header" />
                  <div className="gh-punch-hours">
                    {HOURS.map((hour) => (
                      <div
                        key={hour}
                        className={`gh-punch-hour-label ${hour % 6 === 0 ? 'gh-punch-hour-label--major' : ''}`}
                      >
                        {hour}
                      </div>
                    ))}
                  </div>
                </div>
                 <div className="gh-punch-grid">
                  {DAYS.map((day) => (
                    <div key={day} className="gh-punch-row">
                      <div className="gh-punch-day">{day}</div>
                      <div className="gh-punch-cells">
                        {HOURS.map((hour) => {
                          const val = commitActivity[DAYS.indexOf(day)][hour]
                          const nextHour = (hour + 1) % 24
                          const tooltipText = `${day} ${hour.toString().padStart(2, '0')}:00–${nextHour.toString().padStart(2, '0')}:00: ${val} commit${val !== 1 ? 's' : ''}`
                          const delay = (DAYS.indexOf(day) * 24 + hour) * 0.003
                          return (
                            <div
                              key={hour}
                              className="gh-punch-cell"
                              style={{ '--punch-strength': `${getPunchStrength(val)}%`, animationDelay: `${delay}s` }}
                              data-tooltip={tooltipText}
                            />
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="gh-punch-legend">
                  <span>Less</span>
                    {[0, 0.25, 0.5, 0.75, 1].map((level) => (
                      <div
                        key={level}
                        className="gh-punch-legend-cell"
                        style={{ '--punch-strength': `${getPunchStrength(punchCardMax * level)}%` }}
                      />
                    ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>

          <div className="gh-bottom-row">
            <div className="gh-repos-section">
              <div className="gh-section-title">Top Repositories</div>
              <div className="gh-repos-grid">
                {repos.slice(0, 6).map((repo) => (
                  <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener" className="gh-repo-card">
                    <div className="gh-repo-card-header">
                      <div className="gh-repo-card-name">{repo.name}</div>
                      {repo.language && (
                        <span className="gh-lang-dot" style={{ background: getLanguageColor(repo.language) }} />
                      )}
                    </div>
                    <div className="gh-repo-card-desc">
                      {repo.description || 'No description'}
                    </div>
                    <div className="gh-repo-card-meta">
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>⑂ {repo.forks_count}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="gh-activity-section">
              <div className="gh-section-title">Recent Activity</div>
              <div className="gh-activity-list">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="gh-activity-item">
                    <div className="gh-activity-icon">{activity.icon}</div>
                    <div className="gh-activity-content">
                      <div className="gh-activity-text">{activity.text}</div>
                      <div className="gh-activity-time">
                        {new Date(activity.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default GitHubProfileViewer
