import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SignaturePad from './components/signaturepad.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <h1>Quick Sign</h1>
      <SignaturePad />
    </>
  </React.StrictMode>,
)
