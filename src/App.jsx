import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { ApiProvider } from './contexts/ApiContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contribute from './pages/Contribute'
import ContactPage from './pages/ContactPage'
import Dados from './pages/Dados'
import DadosTempo from './pages/DadosTempo'
import DadosCombustivel from './pages/DadosCombustivel'

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
              <Route path="/dados" element={<Dados />} />
              <Route path="/dados/tempo" element={<DadosTempo />} />
              <Route path="/dados/combustivel" element={<DadosCombustivel />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ApiProvider>
    </LanguageProvider>
  )
}
