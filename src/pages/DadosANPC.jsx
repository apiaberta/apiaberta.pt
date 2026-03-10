import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert, ArrowLeft, RefreshCw, AlertTriangle, MapPin } from 'lucide-react'

const API_BASE = 'https://api.apiaberta.pt/v1/anpc'

const STATUS_COLORS = {
  'Conclusão':    { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
  'Em curso':     { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
  'Despacho':     { bg: '#EFF6FF', text: '#1E40AF', border: '#BFDBFE' },
  'Resolução':    { bg: '#F5F3FF', text: '#5B21B6', border: '#DDD6FE' },
}

const TYPE_EMOJIS = {
  'Mato':         '🌿',
  'Florestal':    '🌲',
  'Habitação':    '🏠',
  'Industrial':   '🏭',
  'Veículo':      '🚗',
  'Outros bens':  '📦',
  'Linhagem':     '⚡',
}

function IncidentCard({ inc }) {
  const colors = STATUS_COLORS[inc.status] || { bg: '#F8FAFC', text: '#475569', border: '#E2E8F0' }
  const emoji = TYPE_EMOJIS[inc.type] || '🔥'
  const dt = inc.datetime ? new Date(inc.datetime) : null

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '0.875rem',
      padding: '1.25rem 1.5rem',
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start'
    }}>
      <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
          <strong style={{ color: '#0F172A', fontSize: '0.95rem' }}>{inc.type}</strong>
          <span style={{
            background: colors.bg, color: colors.text, border: `1px solid ${colors.border}`,
            borderRadius: '2rem', padding: '0.1rem 0.6rem', fontSize: '0.72rem', fontWeight: 600
          }}>
            {inc.status}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748B', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
          <MapPin size={12} />
          {[inc.location?.district, inc.location?.concelho, inc.location?.freguesia].filter(Boolean).join(' › ')}
        </div>
        {dt && (
          <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
            {dt.toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' })}
          </div>
        )}
        {(inc.resources?.ground > 0 || inc.resources?.aerial > 0) && (
          <div style={{ marginTop: '0.5rem', color: '#64748B', fontSize: '0.75rem' }}>
            {inc.resources.ground > 0 && `🚒 ${inc.resources.ground} meios terrestres`}
            {inc.resources.aerial > 0 && ` ✈️ ${inc.resources.aerial} meios aéreos`}
          </div>
        )}
      </div>
    </div>
  )
}

export default function DadosANPC() {
  const [data, setData]       = useState(null)
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const [incRes, sumRes] = await Promise.all([
        fetch(`${API_BASE}/incidents/active`, { headers: { 'X-API-Key': 'public' } }),
        fetch(`${API_BASE}/summary`,           { headers: { 'X-API-Key': 'public' } })
      ])
      if (!incRes.ok) throw new Error(`HTTP ${incRes.status}`)
      const [incJson, sumJson] = await Promise.all([incRes.json(), sumRes.json()])
      setData(incJson.data || [])
      setSummary(sumJson)
      setLastUpdate(new Date().toLocaleTimeString('pt-PT'))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(); const t = setInterval(load, 5 * 60 * 1000); return () => clearInterval(t) }, [])

  return (
    <div className="pt-16 min-h-screen" style={{ background: '#FAFAFA' }}>
      {/* Header */}
      <div style={{ background: '#0F172A', padding: '3rem 1.5rem 2.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Link to="/dados" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            <ArrowLeft size={16} /> Dados Abertos
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#DC2626', borderRadius: '0.75rem', padding: '0.625rem', display: 'flex' }}>
              <ShieldAlert size={24} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
              Proteção Civil
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.6 }}>
            Ocorrências activas em Portugal, em tempo real. Dados da ANEPC via fogos.pt, actualizados a cada 5 minutos.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <span style={{ background: '#DC262622', color: '#DC2626', border: '1px solid #DC262644', borderRadius: '2rem', padding: '0.25rem 0.75rem', fontSize: '0.78rem', fontWeight: 600 }}>
              🔴 LIVE — 5 min
            </span>
            {lastUpdate && <span style={{ color: '#475569', fontSize: '0.8rem' }}>Actualizado às {lastUpdate}</span>}
            <button onClick={load} disabled={loading} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
              <RefreshCw size={13} /> Actualizar
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {loading && !data && (
          <div style={{ textAlign: 'center', color: '#64748B', padding: '3rem' }}>
            <RefreshCw size={24} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.5 }} />
            A carregar ocorrências...
          </div>
        )}
        {error && !data && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', gap: '0.75rem', color: '#991B1B' }}>
            <AlertTriangle size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Erro ao carregar ocorrências</strong>
              <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{error}</div>
            </div>
          </div>
        )}
        {data && (
          <>
            {/* Summary */}
            {summary && (
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <div style={{ background: summary.total_active > 0 ? '#FEF2F2' : '#F0FDF4', border: `1px solid ${summary.total_active > 0 ? '#FECACA' : '#BBF7D0'}`, borderRadius: '0.875rem', padding: '1.25rem 1.75rem', flex: '1', minWidth: '160px' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: summary.total_active > 0 ? '#DC2626' : '#16A34A', lineHeight: 1 }}>
                    {summary.total_active}
                  </div>
                  <div style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.25rem' }}>ocorrências activas</div>
                </div>
                {summary.by_district?.slice(0, 3).map(d => (
                  <div key={d.district} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.875rem', padding: '1.25rem 1.75rem', flex: '1', minWidth: '120px' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{d.count}</div>
                    <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '0.25rem' }}>{d.district}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Incidents list */}
            {data.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748B' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#0F172A', marginBottom: '0.5rem' }}>Sem ocorrências activas</div>
                <div style={{ fontSize: '0.9rem' }}>Portugal está calmo neste momento.</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {data.map(inc => <IncidentCard key={inc.id} inc={inc} />)}
              </div>
            )}

            {/* API box */}
            <div style={{ background: '#0F172A', borderRadius: '1rem', padding: '2rem', color: 'white', marginTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <ShieldAlert size={18} color="#F87171" />
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>Acesso via API</span>
              </div>
              <div style={{ background: '#1E293B', borderRadius: '0.5rem', padding: '1rem', fontFamily: 'monospace', fontSize: '0.82rem', color: '#94A3B8', overflowX: 'auto' }}>
                <div style={{ color: '#64748B', marginBottom: '0.5rem' }}># Ocorrências activas agora</div>
                <div>GET <span style={{ color: '#F87171' }}>https://api.apiaberta.pt/v1/anpc/incidents/active</span></div>
                <div style={{ marginTop: '0.75rem', color: '#64748B' }}># Sumário por distrito</div>
                <div>GET <span style={{ color: '#F87171' }}>https://api.apiaberta.pt/v1/anpc/summary</span></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
