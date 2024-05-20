import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { MainPage } from './pages/MainPage'
import { PageNotFound } from './pages/PageNotFound'

function App() {
  const user = useSelector((state) => state.toolkit.user)

  return (
    <div className={`App ${!user.isOk ? 'appHidden' : ''}`}>
      <div className="box"></div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
