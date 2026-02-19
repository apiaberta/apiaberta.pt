import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { ApiProvider } from './contexts/ApiContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contribute from './pages/Contribute'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <LanguageProvider>
      <ApiProvider>
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contribute" element={<Contribute />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ApiProvider>
    </LanguageProvider>
  )
}
