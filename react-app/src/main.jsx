import React from 'react'
import ReactDOM from 'react-dom/client'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './styles/index.css'
import App from './App'

AOS.init({
  duration: 750,
  easing: 'ease-out-cubic',
  once: true,
  offset: 70,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
