import { useState, useEffect } from 'react'
import { Header } from './components'
import { HomePage, PlaygroundPage } from './pages'
import { parseRouteHash } from './core/levels/level-registry'
import './styles/index.css'

export default function App() {
  const [currentHash, setCurrentHash] = useState<string>(
    window.location.hash || '#/'
  )

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (hash: string) => {
    window.location.hash = hash
    setCurrentHash(hash)
  }

  const route = parseRouteHash(currentHash)

  return (
    <div className="app-shell">
      {/* Fixed Cyber-Industrial Navbar */}
      <Header
        currentPath={currentHash}
        activeLevelId={route.levelId}
        onNavigate={navigate}
      />

      {/* Main Dynamic View Area */}
      <div className="app-content-area">
        {route.page === 'home' ? (
          <HomePage onNavigate={navigate} />
        ) : (
          <PlaygroundPage
            key={route.levelId ?? 'bubble-sort'}
            levelId={route.levelId ?? 'bubble-sort'}
            onNavigate={navigate}
          />
        )}
      </div>
    </div>
  )
}
