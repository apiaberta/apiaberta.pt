import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom'
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
import DadosEV from './pages/DadosEV'
import DadosContratos from './pages/DadosContratos'
import DadosINE from './pages/DadosINE'
import DadosANPC from './pages/DadosANPC'
import DadosBdp from './pages/DadosBdp'
import Changelog from './pages/Changelog'
import SdkDocs from './pages/SdkDocs'

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
              <Route path="/changelog" element={<Changelog />} />
              <Route path="/dados" element={<Dados />} />
              <Route path="/dados/tempo" element={<DadosTempo />} />
              <Route path="/dados/combustivel" element={<DadosCombustivel />} />
              <Route path="/dados/ev" element={<DadosEV />} />
              <Route path="/dados/carregamento-eletrico" element={<Navigate to="/dados/ev" replace />} />
              <Route path="/dados/contratos-publicos" element={<DadosContratos />} />
              <Route path="/dados/estatisticas" element={<DadosINE />} />
              <Route path="/dados/protecao-civil" element={<DadosANPC />} />
              <Route path="/dados/taxas-juro" element={<DadosBdp />} />
              <Route path="/sdk" element={<SdkDocs />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ApiProvider>
    </LanguageProvider>
  )
}
