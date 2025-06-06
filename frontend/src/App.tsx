import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landing-page'
import LoginPage from './pages/login-page'
import SignupPage from './pages/register-page'
import VerificationPage from './pages/verification-page'
import DashboardPage from './pages/dashboard-page'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
