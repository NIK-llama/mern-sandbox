import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './selectors'

createRoot(document.getElementById('root')).render(
    <App />,
)
