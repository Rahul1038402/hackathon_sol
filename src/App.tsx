import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import HyperlocalMarketplace from './pages/Sample_page'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HyperlocalMarketplace/>
    </>
  )
}

export default App
