import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // 確保這裡寫的是 './App' 而不是 '/App' 或 './src/App'

// 如果你沒有 index.css 檔案，一定要把這行刪掉
// import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
