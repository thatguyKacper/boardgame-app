import { useEffect} from 'react'

function App() {
  useEffect(()=> {
    fetch('/api')
  }, [])

  return (
    <>
      <p>
        Hello from Vite + React
      </p>
    </>
  )
}

export default App
