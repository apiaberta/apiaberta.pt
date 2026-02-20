import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText, ArrowLeft, RefreshCw, AlertTriangle, Search } from 'lucide-react'

const API_URL = 'https://api.apiaberta.pt/v1/contracts/recent'

function ContractRow({ contract }) {
  const value = contract.contract_value_eur
    ? `${contract.contract_value_eur.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€`
    : '—'
  
  const date = contract.signing_date
    ? new Date(contract.signing_date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '0.875rem',
      padding: '1rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.625rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
            {contract.contracting_entity || 'Entidade contratante'}
          </div>
          <div style={{ color: '#64748B', fontSize: '0.85rem' }}>
            → {contract.contractor || 'Fornecedor'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#16A34A' }}>
            {value}
          </div>
          <div style={{ color: '#64748B', fontSize: '0.78rem' }}>
            {date}
          </div>
        </div>
      </div>
      {contract.object && (
        <div style={{
          color: '#475569',
          fontSize: '0.85rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid #F1F5F9'
        }}>
          {contract.object}
        </div>
      )}
    </div>
  )
}

export default function DadosContratos() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}?limit=50`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const contracts = data?.data || []
  const filtered = searchTerm
    ? contracts.filter(c =>
        [c.contracting_entity, c.contractor, c.object]
          .filter(Boolean)
          .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : contracts

  const totalValue = filtered.reduce((sum, c) => sum + (c.contract_value_eur || 0), 0)

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Header */}
      <div style={{ background: '#0F172A', padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Link
            to="/dados"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: '#64748B', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1.5rem'
            }}
          >
            <ArrowLeft size={16} />
            Dados abertos
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ background: '#8B5CF6', borderRadius: '0.75rem', padding: '0.625rem', display: 'flex' }}>
              <FileText size={24} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
              Contratos Públicos
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
            Contratos recentes do Portal BASE · Actualizado diariamente
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
            <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
            <p>A carregar dados...</p>
          </div>
        )}

        {error && (
          <div style={{
            background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.875rem',
            padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#DC2626'
          }}>
            <AlertTriangle size={20} />
            <div>
              <strong>Não foi possível carregar os dados</strong>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                Este conjunto de dados estará disponível em breve.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Search bar */}
            <div style={{
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '0.875rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Search size={20} color="#64748B" />
              <input
                type="text"
                placeholder="Pesquisar por entidade, fornecedor ou objecto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.95rem',
                  color: '#0F172A'
                }}
              />
            </div>

            {/* Stats */}
            {filtered.length > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, #F5F3FF 0%, #FAF5FF 100%)',
                border: '2px solid #8B5CF6',
                borderRadius: '1rem',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.5rem',
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#6D28D9', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    CONTRATOS
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>
                    {filtered.length}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#6D28D9', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    VALOR TOTAL
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#16A34A' }}>
                    {totalValue.toLocaleString('pt-PT', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}€
                  </div>
                </div>
              </div>
            )}

            {/* Contract list */}
            {filtered.length > 0 && (
              <>
                <h2 style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem', marginBottom: '1rem' }}>
                  📄 {searchTerm ? `${filtered.length} contratos encontrados` : 'Contratos recentes'}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {filtered.map((contract, idx) => (
                    <ContractRow key={contract.id || idx} contract={contract} />
                  ))}
                </div>
              </>
            )}

            {filtered.length === 0 && !searchTerm && (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                <p>Sem dados disponíveis. Este serviço estará activo em breve.</p>
              </div>
            )}

            {filtered.length === 0 && searchTerm && (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                <p>Nenhum contrato encontrado com "{searchTerm}"</p>
              </div>
            )}

            {/* API note */}
            <div style={{
              marginTop: '2.5rem', background: '#F8FAFC', border: '1px solid #E2E8F0',
              borderRadius: '0.875rem', padding: '1.25rem 1.5rem'
            }}>
              <p style={{ color: '#475569', fontSize: '0.85rem', margin: 0 }}>
                <strong>API:</strong>{' '}
                <code style={{ color: '#16A34A', background: '#F0FDF4', padding: '0.15rem 0.375rem', borderRadius: '0.25rem' }}>
                  GET https://api.apiaberta.pt/v1/contracts/recent
                </code>
              </p>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
