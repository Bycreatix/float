import React from 'react'
import { createRoot } from 'react-dom/client'
import FloatWebsite from './FloatWebsite.jsx'

import './global.css'

const root = document.getElementById('root')
createRoot(root).render(
  <React.StrictMode>
    <FloatWebsite />
  </React.StrictMode>
)
