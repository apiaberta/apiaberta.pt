import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText, ArrowLeft, Search, X, ChevronRight,
  MapPin, Calendar, Tag, Building2, User, Gavel,
  TrendingUp, Clock, Award, Globe
} from 'lucide-react'

const API_SEARCH  = 'https://api.apiaberta.pt/v1/base/contracts/search'
const API_LIST   = 'https://api.apiaberta.pt/v1/base/contracts'
const API_LOOKUP  = 'https://api.apiaberta.pt/v1/base/contracts/lookup'

const TYPE_LABELS = {
  'Concurso público':                          { short: 'Concurso',       color: '#7C3AED', bg: '#F5F3FF' },
  'Ajuste Direto Regime Geral':                { short: 'AD Reg. Geral',  color: '#059669', bg: '#ECFDF5' },
  'Consulta Prévia':                           { short: 'Consulta Prévia', color: '#D97706', bg: '#FFFBEB' },
  'Ao abrigo de acordo-quadro (art.º 259.º)': { short: 'AQ art.259º',    color: '#2563EB', bg: '#EFF6FF' },
  'Ao abrigo de acordo-quadro (art.º 258.º)': { short: 'AQ art.258º',    color: '#0284C7', bg: '#F0F9FF' },
  'Ajuste direto simplificado':                { short: 'AD Simplif.',    color: '#10B981', bg: '#D1FAE5' },
}

function fmt(value) {
  if (!value && value !== 0) return '—'
  return Number(value).toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€'
}
function fmtDate(d) {
  if (!d) return '—'
  const [y, m, day] = d.split('-')
  return `${day}/${m}/${y}`
}
function fmtNum(n) {
  if (!n && n !== 0) return '—'
  return Number(n).toLocaleString('pt-PT')
}

function TypeBadge({ type }) {
  const t = TYPE_LABELS[type] || { short: type, color: '#64748B', bg: '#F8FAFC' }
  return (
    <span style={{
      fontSize: '0.7rem',
      fontWeight: 700,
      color: t.color,
      background: t.bg,
      padding: '0.2rem 0.5rem',
      borderRadius: '0.375rem',
      whiteSpace: 'nowrap',
    }}>
      {t.short}
    </span>
  )
}

// ── Detail Slide-over ────────────────────────────────────────────────────────

function DetailPanel({ contract, onClose }) {
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!contract?.id) return
    const id = contract.id || contract._id
    setLoading(true)
    setError(null)
    setDetail(null)

    fetch(`${API_LOOKUP}/${id}`)
      .then(r => r.json())
      .then(d => { setDetail(d.error ? null : d) })
      .catch(() => setError('Não foi possível carregar os detalhes.'))
      .finally(() => setLoading(false))
  }, [contract])

  const d = detail || contract
  const basePrice    = d?.basePrice
  const contractVal  = d?.value
  const priceDiff    = basePrice && contractVal ? contractVal - basePrice : null
  const diffPct      = priceDiff != null && basePrice ? ((priceDiff / basePrice) * 100).toFixed(1) : null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          zIndex: 40, backdropFilter: 'blur(2px)'
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(520px, 100vw)',
        background: 'white',
        boxShadow: '-4px 0 32px rgba(0,0,0,0.15)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: '#F8FAFC',
          flexShrink: 0,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600, marginBottom: '0.2rem' }}>
              CONTRATO
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>
              {d?.id || contract?.id}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9', border: 'none', borderRadius: '50%',
              width: 36, height: 36, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={18} color="#475569" />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
              <div style={{ fontSize: '0.9rem' }}>A carregar detalhes...</div>
            </div>
          )}
          {error && (
            <div style={{ color: '#DC2626', fontSize: '0.85rem', padding: '1rem', background: '#FEF2F2', borderRadius: '0.5rem' }}>
              {error}
            </div>
          )}
          {!loading && d && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Description */}
              {d.description && (
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Objeto</div>
                  <p style={{ color: '#0F172A', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{d.description}</p>
                </div>
              )}

              {/* Key numbers */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ background: '#F8FAFC', borderRadius: '0.75rem', padding: '0.875rem' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', marginBottom: '0.25rem', textTransform: 'uppercase' }}>VALOR CONTRATUAL</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#16A34A' }}>{fmt(d.value)}</div>
                </div>
                {basePrice && (
                  <div style={{ background: '#F8FAFC', borderRadius: '0.75rem', padding: '0.875rem' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', marginBottom: '0.25rem', textTransform: 'uppercase' }}>PREÇO BASE</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>{fmt(basePrice)}</div>
                  {diffPct !== null && (
                    <div style={{
                      fontSize: '0.72rem', fontWeight: 700, marginTop: '0.25rem',
                      color: priceDiff <= 0 ? '#059669' : '#DC2626'
                    }}>
                      {priceDiff > 0 ? '+' : ''}{fmt(priceDiff)} ({diffPct}%)
                    </div>
                  )}
                  </div>
                )}
              </div>

              {/* Parties */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                  <Building2 size={14} color="#64748B" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Entidade Adjudicante</div>
                    <div style={{ fontSize: '0.85rem', color: '#0F172A' }}>{d.contractingEntity || '—'}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                  <User size={14} color="#64748B" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Adjudicatário</div>
                    <div style={{ fontSize: '0.85rem', color: '#0F172A' }}>{d.awarded || '—'}</div>
                  </div>
                </div>
              </div>

              {/* Dates & type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <Calendar size={13} color="#64748B" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Data Contrato</div>
                    <div style={{ fontSize: '0.82rem', color: '#0F172A' }}>{fmtDate(d.date)}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <Gavel size={13} color="#64748B" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Procedimento</div>
                    <div style={{ fontSize: '0.82rem', color: '#0F172A' }}>{d.type || '—'}</div>
                  </div>
                </div>
              </div>

              {d.awardDate && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <Clock size={13} color="#64748B" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Data Adjudicação</div>
                    <div style={{ fontSize: '0.82rem', color: '#0F172A' }}>{fmtDate(d.awardDate)}</div>
                  </div>
                </div>
              )}

              {d.executionDays && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <TrendingUp size={13} color="#64748B" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Prazo Execução</div>
                    <div style={{ fontSize: '0.82rem', color: '#0F172A' }}>{d.executionDays} dias</div>
                  </div>
                </div>
              )}

              {d.executionPlace && d.executionPlace.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <MapPin size={13} color="#64748B" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Local Execução</div>
                    {d.executionPlace.map((loc, i) => (
                      <div key={i} style={{ fontSize: '0.82rem', color: '#0F172A' }}>{loc}</div>
                    ))}
                  </div>
                </div>
              )}

              {d.cpv && d.cpv.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <Tag size={13} color="#64748B" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.15rem' }}>CPV</div>
                    {d.cpv.map((c, i) => (
                      <div key={i} style={{ fontSize: '0.82rem', color: '#0F172A' }}>{c}</div>
                    ))}
                  </div>
                </div>
              )}

              {d.competitors && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <Award size={13} color="#64748B" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Concorrentes</div>
                    <div style={{ fontSize: '0.82rem', color: '#0F172A' }}>{d.competitors}</div>
                  </div>
                </div>
              )}

              {d.announcementNumber && (
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Nº Anúncio</div>
                  <div style={{ fontSize: '0.82rem', color: '#0F172A' }}>{d.announcementNumber}</div>
                </div>
              )}

              {d.regime && (
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Regime</div>
                  <div style={{ fontSize: '0.82rem', color: '#0F172A' }}>{d.regime}</div>
                </div>
              )}

              {d.legalBasis && (
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Fundamentação Legal</div>
                  <div style={{ fontSize: '0.82rem', color: '#0F172A' }}>{d.legalBasis}</div>
                </div>
              )}

              {d.awardCriterion && (
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Critério Adjudicação</div>
                  <div style={{ fontSize: '0.82rem', color: '#0F172A' }}>{d.awardCriterion}</div>
                </div>
              )}

              {d.isEcological && d.isEcological !== 'Não' && (
                <div style={{ background: '#D1FAE5', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', fontSize: '0.8rem', color: '#065F46', fontWeight: 600 }}>
                  🌱 Contrato Ecológico
                </div>
              )}

              <div style={{ fontSize: '0.72rem', color: '#94A3B8', textAlign: 'center', paddingTop: '0.5rem', borderTop: '1px solid #F1F5F9' }}>
                {detail?.source === 'official' ? 'Dados: BASE.gov.pt (oficial)' : 'Dados: BASE.gov.pt (MongoDB)'}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ── Contract Card ────────────────────────────────────────────────────────────

function ContractCard({ contract, onClick }) {
  const value   = contract.value ? fmt(contract.value) : '—'
  const date    = fmtDate(contract.date)
  const baseP   = contract.basePrice

  return (
    <button
      onClick={() => onClick(contract)}
      style={{
        width: '100%',
        background: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: '0.875rem',
        padding: '1rem 1.25rem',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 0.15s',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#8B5CF6'
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(139,92,246,0.12)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#E2E8F0'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'none'
      }}
    >
      {/* Left: type badge + ID */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flexShrink: 0, minWidth: 90 }}>
        <TypeBadge type={contract.type} />
        <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'monospace' }}>#{contract.id}</div>
      </div>

      {/* Middle: description + parties */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600, marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {contract.description || '—'}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {contract.contractingEntity?.split(' - ')[1] || contract.contractingEntity || ''} → {contract.awarded?.split(' - ')[1] || contract.awarded || ''}
        </div>
        {baseP && contract.value && (
          <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '0.15rem' }}>
            Base: {fmt(baseP)} → Contratual: <span style={{ color: Number(contract.value) > Number(baseP) ? '#DC2626' : '#059669', fontWeight: 600 }}>{fmt(contract.value)}</span>
          </div>
        )}
      </div>

      {/* Right: value + date */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: Number(contract.value) > 50000 ? '#16A34A' : '#0F172A' }}>
          {value}
        </div>
        <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '0.15rem' }}>{date}</div>
      </div>

      <ChevronRight size={16} color="#CBD5E1" style={{ flexShrink: 0 }} />
    </button>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function DadosContratos() {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const [total, setTotal]         = useState(0)
  const [page, setPage]           = useState(1)
  const [selected, setSelected]   = useState(null)

  // Filters
  const [q, setQ]         = useState('')
  const [year, setYear]   = useState('')
  const [type, setType]   = useState('')

  // Debounce search
  const [debouncedQ, setDebouncedQ] = useState('')
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 400)
    return () => clearTimeout(t)
  }, [q])

  const LIMIT = 40

  const load = useCallback(async ({ q: searchQ = debouncedQ, p = 1 } = {}) => {
    setLoading(true)
    setError(null)
    try {
      let url
      if (searchQ.trim()) {
        const params = new URLSearchParams({ q: searchQ.trim(), limit: String(LIMIT) })
        if (p > 1) params.set('page', String(p))
        url = `${API_SEARCH}?${params}`
      } else {
        const params = new URLSearchParams({ limit: String(LIMIT) })
        if (year) params.set('year', year)
        if (type) params.set('type', type)
        if (p > 1) params.set('page', String(p))
        url = `${API_LIST}?${params}`
      }

      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      if (p === 1) {
        setContracts(data.data || [])
      } else {
        setContracts(prev => [...prev, ...(data.data || [])])
      }
      setTotal(data.total || 0)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [debouncedQ, year, type])

  useEffect(() => { setPage(1); load({ p: 1 }) }, [debouncedQ, year, type])

  const loadMore = () => {
    const next = page + 1
    setPage(next)
    load({ p: next })
  }

  const totalValue = contracts.reduce((s, c) => s + (c.value || 0), 0)
  const hasMore = contracts.length < total

  function clearFilters() {
    setQ('')
    setYear('')
    setType('')
  }

  const hasFilters = year || type

  return (
    <div className="pt-16 min-h-screen" style={{ background: '#FAFAFA' }}>
      {/* Header */}
      <div style={{ background: '#0F172A', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <Link
            to="/dados"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              color: '#64748B', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '1.25rem'
            }}
          >
            <ArrowLeft size={15} />
            Dados abertos
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
            <div style={{ background: '#8B5CF6', borderRadius: '0.625rem', padding: '0.5rem', display: 'flex' }}>
              <FileText size={20} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', margin: 0 }}>
              Contratos Públicos
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.88rem' }}>
            BASE.gov.pt · 2.1M+ contratos · Clique num contrato para ver todos os detalhes
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '1.5rem 1rem' }}>

        {/* Search */}
        <div style={{
          background: 'white',
          border: '2px solid #E2E8F0',
          borderRadius: '0.875rem',
          padding: '0.75rem 1rem',
          marginBottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          transition: 'border-color 0.15s',
        }}>
          <Search size={18} color="#64748B" />
          <input
            type="text"
            placeholder="Pesquisar por entidade, fornecedor, NIF, descrição..."
            value={q}
            onChange={e => setQ(e.target.value)}
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontSize: '0.95rem', color: '#0F172A', background: 'transparent'
            }}
          />
          {loading && <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite', color: '#8B5CF6' }} />}
          {q && !loading && (
            <button onClick={() => setQ('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <X size={15} color="#94A3B8" />
            </button>
          )}
        </div>

        {/* Quick examples */}
        {!q && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {[
              { label: 'Câmara Municipal do Fundão', q: '506215695' },
              { label: 'Câmara Municipal de Lisboa', q: '500826687' },
              { label: 'Desporto', q: 'desporto' },
              { label: 'Saúde', q: 'saúde hospital' },
              { label: 'Construção', q: 'construção' },
            ].map(ex => (
              <button
                key={ex.q}
                onClick={() => setQ(ex.q)}
                style={{
                  fontSize: '0.75rem', fontWeight: 600,
                  background: '#F1F5F9', border: '1px solid #E2E8F0',
                  borderRadius: '2rem', padding: '0.3rem 0.75rem',
                  cursor: 'pointer', color: '#475569',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#EDE9FE'; e.currentTarget.style.borderColor = '#8B5CF6'; e.currentTarget.style.color = '#7C3AED' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#475569' }}
              >
                {ex.label}
              </button>
            ))}
          </div>
        )}

        {/* Filters */}
        <div style={{
          background: 'white',
          border: '1px solid #E2E8F0',
          borderRadius: '0.875rem',
          padding: '0.875rem 1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          gap: '0.625rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <select
            value={year}
            onChange={e => setYear(e.target.value)}
            style={{
              padding: '0.45rem 0.75rem', borderRadius: '0.5rem',
              border: '1px solid #E2E8F0', fontSize: '0.82rem',
              color: year ? '#0F172A' : '#94A3B8', background: 'white', outline: 'none',
            }}
          >
            <option value="">Todos os anos</option>
            {[2026,2025,2024,2023,2022,2021,2020,2018,2017,2016,2015,2014,2013,2012,2011,2009,2008].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            value={type}
            onChange={e => setType(e.target.value)}
            style={{
              flex: 1, minWidth: 160, padding: '0.45rem 0.75rem', borderRadius: '0.5rem',
              border: '1px solid #E2E8F0', fontSize: '0.82rem',
              color: type ? '#0F172A' : '#94A3B8', background: 'white', outline: 'none',
            }}
          >
            <option value="">Todos os tipos</option>
            {Object.keys(TYPE_LABELS).map(t => (
              <option key={t} value={t}>{TYPE_LABELS[t].short}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              style={{
                fontSize: '0.75rem', color: '#DC2626', background: 'none',
                border: 'none', cursor: 'pointer', fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              Limpar
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.75rem',
            padding: '1rem 1.25rem', color: '#DC2626', fontSize: '0.85rem', marginBottom: '1rem'
          }}>
            Não foi possível carregar: {error}
          </div>
        )}

        {/* Stats */}
        {contracts.length > 0 && (
          <div style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '0.75rem',
            padding: '0.875rem 1.25rem',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '0.82rem', color: '#475569' }}>
              {debouncedQ
                ? <><strong>{fmtNum(total)}</strong> resultados{hasFilters ? ' (filtrados)' : ''} para <em>"{debouncedQ}"</em></>
                : <><strong>{fmtNum(total)}</strong> contratos{hasFilters ? ' (filtrados)' : ''}</>
              }
            </span>
            <span style={{ fontSize: '0.82rem', color: '#16A34A', fontWeight: 700 }}>
              Total: {totalValue >= 1_000_000 ? `${(totalValue / 1_000_000).toFixed(1)}M€` : `${fmtNum(totalValue)}€`}
            </span>
          </div>
        )}

        {/* List */}
        {contracts.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {contracts.map((c, i) => (
              <ContractCard key={(c.id || i)} contract={c} onClick={setSelected} />
            ))}
          </div>
        ) : !loading ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 2rem', color: '#64748B' }}>
            <div style={{ fontSize: '1rem', marginBottom: '0.4rem', color: '#475569' }}>Nenhum contrato encontrado</div>
            <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Experimenta outros termos ou remove filtros.</div>
          </div>
        ) : null}

        {/* Load more */}
        {hasMore && !loading && (
          <button
            onClick={loadMore}
            style={{
              width: '100%', marginTop: '1rem', padding: '0.875rem',
              background: '#F8FAFC', border: '1px solid #E2E8F0',
              borderRadius: '0.75rem', fontSize: '0.85rem', fontWeight: 600,
              color: '#475569', cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#EDE9FE'; e.currentTarget.style.borderColor = '#8B5CF6'; e.currentTarget.style.color = '#7C3AED' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#475569' }}
          >
            Carregar mais ({Math.min(LIMIT, total - contracts.length)} restantes)
          </button>
        )}

        {/* Loading more indicator */}
        {loading && contracts.length > 0 && (
          <div style={{ textAlign: 'center', padding: '1rem', color: '#94A3B8', fontSize: '0.82rem' }}>
            A carregar...
          </div>
        )}

        {/* API links */}
        <div style={{
          marginTop: '2.5rem', background: '#F8FAFC', border: '1px solid #E2E8F0',
          borderRadius: '0.875rem', padding: '1rem 1.25rem', fontSize: '0.78rem', color: '#475569'
        }}>
          <strong>API:</strong>{' '}
          <code style={{ color: '#16A34A', background: '#F0FDF4', padding: '0.1rem 0.35rem', borderRadius: '0.25rem' }}>GET /v1/base/contracts/search?q=...</code>
          {'  '}
          <code style={{ color: '#16A34A', background: '#F0FDF4', padding: '0.1rem 0.35rem', borderRadius: '0.25rem' }}>GET /v1/base/contracts/lookup/:id</code>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <DetailPanel
          contract={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  )
}
