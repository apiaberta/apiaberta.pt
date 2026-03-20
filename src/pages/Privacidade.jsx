import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Privacidade() {
  return (
    <div className="pt-16 min-h-screen" style={{ background: '#FAFAFA' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <Link 
          to="/" 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#16A34A', textDecoration: 'none', marginBottom: '2rem' }}
        >
          <ArrowLeft size={16} /> Voltar
        </Link>

        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
          Política de Privacidade
        </h1>
        <p style={{ color: '#64748B', marginBottom: '2rem' }}>
          Última actualização: Março 2026
        </p>

        <div style={{ color: '#334155', lineHeight: 1.8 }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              1. Responsável pelo Tratamento
            </h2>
            <p>
              A API Aberta é um projecto open-source. Para questões de privacidade, 
              contacta-nos em <a href="mailto:hi@apiaberta.pt" style={{ color: '#16A34A' }}>hi@apiaberta.pt</a>.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              2. Dados Recolhidos
            </h2>
            <p>Recolhemos os seguintes dados pessoais:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li><strong>Registo de conta:</strong> Nome, email</li>
              <li><strong>Autenticação:</strong> API Key (gerada automaticamente)</li>
              <li><strong>Logs de utilização:</strong> Endpoints acedidos, timestamps, endereço IP (anonimizado)</li>
              <li><strong>Analytics:</strong> Páginas visitadas, dispositivo, país (via Umami, sem cookies de tracking)</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              3. Finalidade do Tratamento
            </h2>
            <p>Os dados são utilizados para:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Autenticação e gestão de contas</li>
              <li>Aplicação de rate limits e prevenção de abuso</li>
              <li>Melhoria do serviço através de analytics agregados</li>
              <li>Comunicação sobre alterações ao serviço (se autorizado)</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              4. Cookies
            </h2>
            <p>Utilizamos cookies mínimos:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li><strong>Essenciais:</strong> Sessão de autenticação, preferência de idioma</li>
              <li><strong>Analytics:</strong> Umami (privacy-friendly, sem tracking pessoal)</li>
            </ul>
            <p style={{ marginTop: '0.5rem' }}>
              Não utilizamos cookies de publicidade nem partilhamos dados com terceiros para fins comerciais.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              5. Período de Retenção
            </h2>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li><strong>Dados de conta:</strong> Até eliminação da conta + 30 dias de período de graça</li>
              <li><strong>Logs de utilização:</strong> 90 dias</li>
              <li><strong>Analytics:</strong> 12 meses (agregados)</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              6. Os Teus Direitos (RGPD)
            </h2>
            <p>Tens direito a:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li><strong>Acesso:</strong> Solicitar cópia dos teus dados</li>
              <li><strong>Rectificação:</strong> Corrigir dados incorrectos</li>
              <li><strong>Eliminação:</strong> Apagar a tua conta e dados associados</li>
              <li><strong>Portabilidade:</strong> Exportar os teus dados</li>
              <li><strong>Oposição:</strong> Recusar tratamento para fins específicos</li>
            </ul>
            <p style={{ marginTop: '0.5rem' }}>
              Para exercer estes direitos, contacta-nos em{' '}
              <a href="mailto:hi@apiaberta.pt" style={{ color: '#16A34A' }}>hi@apiaberta.pt</a>.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              7. Segurança
            </h2>
            <p>
              Implementamos medidas técnicas e organizativas para proteger os teus dados, incluindo:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Encriptação em trânsito (HTTPS/TLS)</li>
              <li>Passwords armazenadas com hash (bcrypt)</li>
              <li>Acesso restrito a dados pessoais</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              8. Alterações a Esta Política
            </h2>
            <p>
              Podemos actualizar esta política periodicamente. Alterações significativas 
              serão comunicadas através do site ou email.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              9. Contacto
            </h2>
            <p>
              Para questões de privacidade:{' '}
              <a href="mailto:hi@apiaberta.pt" style={{ color: '#16A34A' }}>hi@apiaberta.pt</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
