import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [htmlContent, setHtmlContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const slug = window.location.pathname.slice(1)

    if (!slug) {
      setError('404: NOT FOUND')
      setLoading(false)
      return
    }

    const fetchContent = async () => {
      try {
        const response = await fetch(`https://hvlnzsheqhhqqwdrptph.supabase.co/functions/v1/render-page/${slug}`)
        if (!response.ok) {
          throw new Error('404: NOT FOUND')
        }
        const data = await response.text()
        
        setHtmlContent(data || 'No content available')
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="app">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}

export default App
