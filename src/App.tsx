import './styles/index.css'

export default function App() {
  return (
    <div className="foundation-container">
      <header className="foundation-header">
        <span className="badge">Initialization Phase</span>
        <h1 className="foundation-title">Algorithm Game Platform</h1>
        <p className="foundation-subtitle">
          Interactive Data Structures and Algorithms visual learning system.
          Technical foundation and multi-agent protocol established.
        </p>
      </header>

      <section className="grid-cards">
        <div className="card">
          <h2 className="card-title">Core Simulation</h2>
          <p className="card-desc">
            Independent, deterministic DSA simulation layer. Decoupled from rendering engine.
          </p>
          <span className="status-pill">
            <span className="status-dot"></span>
            INITIALIZED
          </span>
        </div>

        <div className="card">
          <h2 className="card-title">Presentation (Phaser 3)</h2>
          <p className="card-desc">
            Phaser 3 graphic adapter and event-driven animation engine for warehouse sorting.
          </p>
          <span className="status-pill">
            <span className="status-dot"></span>
            INITIALIZED
          </span>
        </div>

        <div className="card">
          <h2 className="card-title">Test Runner (Vitest)</h2>
          <p className="card-desc">
            High-speed test suite for algorithms, simulation transitions, and invariants.
          </p>
          <span className="status-pill">
            <span className="status-dot"></span>
            OPERATIONAL
          </span>
        </div>
      </section>

      <footer className="protocol-notice">
        <h3>Master AI Protocol Active</h3>
        <p>
          Task system is currently idle. AI agents must operate according to <code>.ai/AI_RULES.md</code> and check <code>.ai/CONTROL.md</code> before claiming tasks.
        </p>
      </footer>
    </div>
  )
}
