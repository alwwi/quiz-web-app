import { useState } from 'react'
import './App.css'
import LoginPage from './page/LoginPage.jsx'
import Register from './page/RegisterPage.jsx'
import Start from './page/StartPage.jsx'
import Questions from './page/QuestionPage.jsx'
import Score from './page/ScorePage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/start" element={<Start />} />
        <Route path="/soal" element={<Questions />} />
        <Route path="/score" element={<Score />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
