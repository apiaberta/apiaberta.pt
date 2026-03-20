import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Termos() {
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
          Termos de Uso
        </h1>
        <p style={{ color: '#64748B', marginBottom: '2rem' }}>
          Última actualização: Março 2026
        </p>

        <div style={{ color: '#334155', lineHeight: 1.8 }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              1. Definições
            </h2>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li><strong>API Aberta</strong> — plataforma open-source que disponibiliza dados públicos portugueses através de uma API REST.</li>
              <li><strong>Utilizador</strong> — qualquer pessoa ou entidade que acede à API.</li>
              <li><strong>API Key</strong> — chave de autenticação única atribuída a cada conta registada.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              2. Uso Permitido
            </h2>
            <p>A API Aberta pode ser utilizada para:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Projectos pessoais, académicos e de investigação</li>
              <li>Aplicações comerciais e não-comerciais</li>
              <li>Visualização e análise de dados públicos</li>
              <li>Integração em sistemas de informação</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              3. Uso Proibido
            </h2>
            <p>É expressamente proibido:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Realizar ataques de negação de serviço (DoS/DDoS)</li>
              <li>Tentar contornar os limites de taxa (rate limits)</li>
              <li>Usar múltiplas contas para aumentar quota</li>
              <li>Redistribuir dados em massa sem atribuição</li>
              <li>Utilizar a API para actividades ilegais</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              4. Limites de Utilização (Rate Limits)
            </h2>
            <p>
              Aplicam-se limites de pedidos para garantir a disponibilidade do serviço:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li><strong>Sem API Key:</strong> 30 pedidos por minuto</li>
              <li><strong>Com API Key (gratuita):</strong> 300 pedidos por minuto</li>
            </ul>
            <p style={{ marginTop: '0.5rem' }}>
              Contas que excedam consistentemente os limites podem ser temporariamente suspensas.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              5. Isenção de Responsabilidade
            </h2>
            <p>
              A API Aberta é fornecida "tal como está" (as-is), sem garantias de qualquer tipo. 
              Os dados provêm de fontes públicas oficiais (IPMA, DGEG, INE, etc.) e a API Aberta 
              não é responsável por:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Erros ou omissões nos dados originais</li>
              <li>Interrupções temporárias do serviço</li>
              <li>Perdas ou danos resultantes do uso da API</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              6. Alterações aos Termos
            </h2>
            <p>
              Reservamo-nos o direito de alterar estes termos a qualquer momento. 
              Alterações significativas serão comunicadas através do changelog ou email 
              (para utilizadores registados).
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>
              7. Contacto
            </h2>
            <p>
              Para questões sobre estes termos, contacta-nos em{' '}
              <a href="mailto:hi@apiaberta.pt" style={{ color: '#16A34A' }}>hi@apiaberta.pt</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
