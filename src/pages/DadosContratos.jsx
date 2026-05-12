import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FileText, ArrowLeft, RefreshCw, AlertTriangle, Search, Filter } from 'lucide-react'

const API_SEARCH = 'https://api.apiaberta.pt/v1/base/contracts/search'
const API_LIST  = 'https://api.apiaberta.pt/v1/base/contracts'

const CONTRACT_TYPES = [
  'Ajuste Direto Regime Geral',
  'Consulta Prévia',
  'Concurso público',
  'Ao abrigo de acordo-quadro (art.º 259.º)',
  'Ao abrigo de acordo-quadro (art.º 258.º)',
  'Ajuste direto simplificado',
  'Consulta Prévia Simplificada',
  'Concurso limitado por prévia qualificação',
]

function ContractRow({ contract }) {
  const value = contract.value
    ? `${Number(contract.value).toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€`
    : '—'

  const date = contract.date
    ? new Date(contract.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' })
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
            {contract.contractingEntity || 'Entidade contratante'}
          </div>
          <div style={{ color: '#64748B', fontSize: '0.85rem' }}>
            → {contract.awarded || 'Fornecedor'}
          </div>
          {contract.type && (
            <div style={{ fontSize: '0.75rem', color: '#8B5CF6', marginTop: '0.25rem' }}>
              {contract.type}
            </div>
          )}
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
      {contract.description && (
        <div style={{
          color: '#475569',
          fontSize: '0.85rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid #F1F5F9'
        }}>
          {contract.description}
        </div>
      )}
    </div>
  )
}

export default function DadosContratos() {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)

  // Filters
  const [q, setQ]         = useState('')
  const [year, setYear]    = useState('')
  const [type, setType]    = useState('')
  const [minVal, setMinVal] = useState('')
  const [maxVal, setMaxVal] = useState('')

  // Debounce search
  const [debouncedQ, setDebouncedQ] = useState('')
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 350)
    return () => clearTimeout(t)
  }, [q])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let url, data

      if (debouncedQ.trim()) {
        // Server-side search
        const params = new URLSearchParams({ q: debouncedQ.trim(), limit: '50' })
        const res = await fetch(`${API_SEARCH}?${params}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        data = await res.json()
        setTotal(data.total || 0)
      } else {
        // List with year + type filters (value filter client-side)
        const params = new URLSearchParams({ limit: '50' })
        if (year) params.set('year', year)
        if (type) params.set('type', type)
        const res = await fetch(`${API_LIST}?${params}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        data = await res.json()
        setTotal(data.total || 0)
      }

      let list = data.data || []

      // Value filter (client-side — simple to add)
      if (minVal) list = list.filter(c => c.value >= Number(minVal))
      if (maxVal) list = list.filter(c => c.value <= Number(maxVal))

      setContracts(list)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [debouncedQ, year, type, minVal, maxVal])

  useEffect(() => { load() }, [load])

  const totalValue = contracts.reduce((sum, c) => sum + (c.value || 0), 0)

  function clearFilters() {
    setQ('')
    setYear('')
    setType('')
    setMinVal('')
    setMaxVal('')
  }

  const hasFilters = q || year || type || minVal || maxVal

  return (
    <div className="pt-16 min-h-screen" style={{ background: '#FAFAFA' }}>
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
            Contratos do Portal BASE · 2.1M contratos de 2008 a 2026 · Actualizado diariamente
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Search bar */}
        <div style={{
          background: 'white',
          border: '1px solid #E2E8F0',
          borderRadius: '0.875rem',
          padding: '0.875rem 1rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Search size={20} color="#64748B" />
          <input
            type="text"
            placeholder="Pesquisar por entidade, fornecedor, NIF, descrição..."
            value={q}
            onChange={e => setQ(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '0.95rem',
              color: '#0F172A'
            }}
          />
          {(loading) && <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite', color: '#64748B' }} />}
        </div>

        {/* Filters row */}
        <div style={{
          background: 'white',
          border: '1px solid #E2E8F0',
          borderRadius: '0.875rem',
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Filter size={14} color="#64748B" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Filtros
            </span>
            {hasFilters && (
              <button
                onClick={clearFilters}
                style={{
                  marginLeft: 'auto',
                  fontSize: '0.78rem',
                  color: '#DC2626',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Limpar
              </button>
            )}
          </div>

          {/* Year + Type row */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              style={{
                flex: '1 1 120px',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #E2E8F0',
                fontSize: '0.85rem',
                color: year ? '#0F172A' : '#94A3B8',
                backgroundColor: 'white',
                outline: 'none'
              }}
            >
              <option value="">Todos os anos</option>
              {[2026,2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2009,2008].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <select
              value={type}
              onChange={e => setType(e.target.value)}
              style={{
                flex: '2 1 200px',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #E2E8F0',
                fontSize: '0.85rem',
                color: type ? '#0F172A' : '#94A3B8',
                backgroundColor: 'white',
                outline: 'none'
              }}
            >
              <option value="">Todos os tipos</option>
              {CONTRACT_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Value range */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="number"
              placeholder="Valor mínimo (€)"
              value={minVal}
              onChange={e => setMinVal(e.target.value)}
              style={{
                flex: 1,
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #E2E8F0',
                fontSize: '0.85rem',
                color: '#0F172A',
                outline: 'none'
              }}
            />
            <input
              type="number"
              placeholder="Valor máximo (€)"
              value={maxVal}
              onChange={e => setMaxVal(e.target.value)}
              style={{
                flex: 1,
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #E2E8F0',
                fontSize: '0.85rem',
                color: '#0F172A',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {error && (
          <div style={{
            background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.875rem',
            padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#DC2626', marginBottom: '1.5rem'
          }}>
            <AlertTriangle size={20} />
            <div>
              <strong>Não foi possível carregar os dados</strong>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{error}</p>
            </div>
          </div>
        )}

        {/* Stats */}
        {contracts.length > 0 && (
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
              <div style={{ color: '#6D28D9', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                RESULTADOS
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>
                {total.toLocaleString('pt-PT')}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#6D28D9', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                A MOSTRAR
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>
                {contracts.length}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#6D28D9', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                VALOR TOTAL
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#16A34A' }}>
                {totalValue >= 1_000_000
                  ? `${(totalValue / 1_000_000).toFixed(1)}M€`
                  : `${totalValue.toLocaleString('pt-PT', { minimumFractionDigits: 0 })}€`}
              </div>
            </div>
          </div>
        )}

        {/* Contract list */}
        {contracts.length > 0 && (
          <>
            <h2 style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem', marginBottom: '1rem' }}>
              📄 {debouncedQ ? `${total.toLocaleString('pt-PT')} resultados para "${debouncedQ}"` : 'Contratos'}
              {hasFilters && ' (filtrados)'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {contracts.map((contract, idx) => (
                <ContractRow key={contract.id || idx} contract={contract} />
              ))}
            </div>
          </>
        )}

        {contracts.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#64748B' }}>
            <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Nenhum contrato encontrado.</p>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Experimenta outros termos de pesquisa ou ajusta os filtros.</p>
          </div>
        )}

        {/* API note */}
        <div style={{
          marginTop: '2.5rem', background: '#F8FAFC', border: '1px solid #E2E8F0',
          borderRadius: '0.875rem', padding: '1.25rem 1.5rem'
        }}>
          <p style={{ color: '#475569', fontSize: '0.8rem', margin: 0 }}>
            <strong>API:</strong>{' '}
            <code style={{ color: '#16A34A', background: '#F0FDF4', padding: '0.1rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.78rem' }}>
              GET /v1/base/contracts/search?q=...
            </code>
            {'  '}
            <code style={{ color: '#16A34A', background: '#F0FDF4', padding: '0.1rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.78rem' }}>
              GET /v1/base/contracts?year=2025
            </code>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}