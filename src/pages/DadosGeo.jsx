import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ArrowLeft, RefreshCw, AlertTriangle, Search, X } from 'lucide-react'

const BASE = 'https://api.apiaberta.pt/v1/geo'

export default function DadosGeo() {
  const [meta, setMeta] = useState(null)
  const [districts, setDistricts] = useState([])
  const [municipalities, setMunicipalities] = useState([])
  const [totalMunicipalities, setTotalMunicipalities] = useState(308)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [loadingMeta, setLoadingMeta] = useState(true)
  const [loadingDistricts, setLoadingDistricts] = useState(true)
  const [loadingMunicipalities, setLoadingMunicipalities] = useState(false)
  const [error, setError] = useState(null)

  // Postal code search
  const [postalCode, setPostalCode] = useState('')
  const [postalResult, setPostalResult] = useState(null)
  const [postalError, setPostalError] = useState(null)
  const [postalLoading, setPostalLoading] = useState(false)

  // Load meta + districts
  useEffect(() => {
    Promise.all([
      fetch(`${BASE}/meta`).then(r => r.json()),
      fetch(`${BASE}/districts`).then(r => r.json()),
    ]).then(([metaData, districtData]) => {
      setMeta(metaData)
      setDistricts(districtData.data || [])
    }).catch(err => {
      setError(err.message)
    }).finally(() => {
      setLoadingMeta(false)
      setLoadingDistricts(false)
    })
  }, [])

  // Load municipalities when district or page changes
  useEffect(() => {
    setLoadingMunicipalities(true)
    const params = new URLSearchParams({ page, limit: 20 })
    if (selectedDistrict) params.set('district', selectedDistrict)
    fetch(`${BASE}/municipalities?${params}`)
      .then(r => r.json())
      .then(data => {
        setMunicipalities(data.data || [])
        setPages(data.pages || 1)
        setTotalMunicipalities(data.total || 308)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoadingMunicipalities(false))
  }, [selectedDistrict, page])

  const handleDistrictClick = (name) => {
    if (selectedDistrict === name) {
      setSelectedDistrict(null)
    } else {
      setSelectedDistrict(name)
    }
    setPage(1)
  }

  const searchPostal = async () => {
    const code = postalCode.trim()
    if (!code) return
    setPostalLoading(true)
    setPostalResult(null)
    setPostalError(null)
    try {
      const res = await fetch(`${BASE}/postal/${encodeURIComponent(code)}`)
      if (!res.ok) throw new Error(`Código postal não encontrado (HTTP ${res.status})`)
      const data = await res.json()
      setPostalResult(data)
    } catch (err) {
      setPostalError(err.message)
    } finally {
      setPostalLoading(false)
    }
  }

  const statsData = [
    { label: 'Distritos', value: meta?.districts ?? 29, color: '#6366F1', bg: '#EEF2FF' },
    { label: 'Municípios', value: meta?.municipalities ?? 308, color: '#10B981', bg: '#ECFDF5' },
    { label: 'Freguesias', value: meta?.parishes ? meta.parishes.toLocaleString('pt-PT') : '3.259', color: '#F59E0B', bg: '#FFFBEB' },
  ]

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
            Dados
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ background: '#6366F1', borderRadius: '0.75rem', padding: '0.625rem', display: 'flex' }}>
              <MapPin size={24} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
              🗺️ Dados Geográficos
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
            Distritos, municípios, freguesias e códigos postais de Portugal
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {error && (
          <div style={{
            background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.875rem',
            padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
            color: '#DC2626', marginBottom: '1.5rem'
          }}>
            <AlertTriangle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Stats bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {statsData.map(s => (
            <div key={s.label} style={{
              background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.875rem',
              padding: '1.25rem 1.5rem', textAlign: 'center'
            }}>
              {loadingMeta ? (
                <div style={{ height: '2rem', background: '#F1F5F9', borderRadius: '0.375rem', marginBottom: '0.5rem' }} />
              ) : (
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: s.color, marginBottom: '0.25rem' }}>
                  {s.value}
                </div>
              )}
              <div style={{ color: '#64748B', fontSize: '0.85rem', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Postal code search */}
        <div style={{
          background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.875rem',
          padding: '1.5rem', marginBottom: '2rem'
        }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={18} color="#6366F1" />
            Pesquisa de Código Postal
          </h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && searchPostal()}
              placeholder="Ex: 1000-001"
              style={{
                flex: '1', minWidth: '180px', padding: '0.625rem 1rem',
                border: '2px solid #E2E8F0', borderRadius: '0.625rem',
                fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit',
                transition: 'border-color 0.15s'
              }}
              onFocus={e => (e.target.style.borderColor = '#6366F1')}
              onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
            />
            <button
              onClick={searchPostal}
              disabled={postalLoading || !postalCode.trim()}
              style={{
                padding: '0.625rem 1.5rem', background: '#6366F1', color: 'white',
                border: 'none', borderRadius: '0.625rem', fontWeight: 700,
                fontSize: '0.9rem', cursor: postalLoading ? 'wait' : 'pointer',
                fontFamily: 'inherit', opacity: postalLoading || !postalCode.trim() ? 0.6 : 1,
                display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}
            >
              {postalLoading ? <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Search size={16} />}
              Pesquisar
            </button>
          </div>

          {postalError && (
            <div style={{ marginTop: '1rem', color: '#DC2626', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={16} />
              {postalError}
            </div>
          )}

          {postalResult && (
            <div style={{
              marginTop: '1rem', background: '#EEF2FF', border: '1px solid #C7D2FE',
              borderRadius: '0.625rem', padding: '1rem 1.25rem',
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem'
            }}>
              {[
                { label: 'Distrito', value: postalResult.district || postalResult.distrito },
                { label: 'Concelho', value: postalResult.municipality || postalResult.concelho },
                { label: 'Localidade', value: postalResult.locality || postalResult.localidade || postalResult.place },
              ].filter(f => f.value).map(field => (
                <div key={field.label}>
                  <div style={{ fontSize: '0.75rem', color: '#6366F1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    {field.label}
                  </div>
                  <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.95rem' }}>{field.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Districts grid */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🏛️</span> Distritos
              {selectedDistrict && (
                <span style={{ fontSize: '0.8rem', color: '#6366F1', fontWeight: 500 }}>— a filtrar por {selectedDistrict}</span>
              )}
            </h2>
            {selectedDistrict && (
              <button
                onClick={() => { setSelectedDistrict(null); setPage(1) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  background: '#EEF2FF', color: '#6366F1', border: '1px solid #C7D2FE',
                  borderRadius: '999px', padding: '0.25rem 0.75rem', fontSize: '0.8rem',
                  fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
                }}
              >
                <X size={14} />
                Limpar filtro
              </button>
            )}
          </div>

          {loadingDistricts ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.625rem' }}>
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} style={{ height: '52px', background: '#F1F5F9', borderRadius: '0.625rem', animation: 'pulse 1.5s ease-in-out infinite' }} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.625rem' }}>
              {districts.map(d => (
                <button
                  key={d.codigoine || d.name}
                  onClick={() => handleDistrictClick(d.name)}
                  style={{
                    padding: '0.625rem 0.75rem',
                    background: selectedDistrict === d.name ? '#EEF2FF' : 'white',
                    border: `2px solid ${selectedDistrict === d.name ? '#6366F1' : '#E2E8F0'}`,
                    borderRadius: '0.625rem',
                    fontWeight: selectedDistrict === d.name ? 700 : 500,
                    fontSize: '0.82rem',
                    color: selectedDistrict === d.name ? '#4F46E5' : '#334155',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                    fontFamily: 'inherit'
                  }}
                  onMouseOver={e => {
                    if (selectedDistrict !== d.name) {
                      e.currentTarget.style.borderColor = '#A5B4FC'
                      e.currentTarget.style.background = '#F5F3FF'
                    }
                  }}
                  onMouseOut={e => {
                    if (selectedDistrict !== d.name) {
                      e.currentTarget.style.borderColor = '#E2E8F0'
                      e.currentTarget.style.background = 'white'
                    }
                  }}
                >
                  📍 {d.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Municipalities */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🏙️</span> Municípios
            <span style={{ color: '#64748B', fontWeight: 400, fontSize: '0.85rem' }}>
              {selectedDistrict ? `— ${selectedDistrict}` : `— ${totalMunicipalities} no total`}
            </span>
          </h2>

          {loadingMunicipalities ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748B' }}>
              <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite', marginBottom: '0.5rem' }} />
              <p style={{ fontSize: '0.9rem' }}>A carregar municípios...</p>
            </div>
          ) : (
            <>
              <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.875rem', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        {['Município', 'Distrito', 'Área (ha)', 'Coordenadas', 'Contacto'].map(h => (
                          <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {municipalities.map((m, i) => (
                        <tr
                          key={m.slug || i}
                          style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.1s' }}
                          onMouseOver={e => (e.currentTarget.style.background = '#FAFAFA')}
                          onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap' }}>
                            {m.name}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>
                            <span style={{
                              background: '#EEF2FF', color: '#4F46E5',
                              padding: '0.2rem 0.5rem', borderRadius: '999px',
                              fontSize: '0.78rem', fontWeight: 600
                            }}>
                              {m.district}
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem 1rem', color: '#475569', fontVariantNumeric: 'tabular-nums' }}>
                            {m.area_ha ? m.area_ha.toLocaleString('pt-PT') : '—'}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', color: '#64748B', fontSize: '0.8rem', fontVariantNumeric: 'tabular-nums' }}>
                            {m.coords?.lat != null ? `${m.coords.lat.toFixed(4)}, ${m.coords.lng.toFixed(4)}` : '—'}
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            {m.email ? (
                              <a href={`mailto:${m.email}`} style={{ color: '#6366F1', fontSize: '0.8rem', textDecoration: 'none' }}>
                                {m.email}
                              </a>
                            ) : '—'}
                          </td>
                        </tr>
                      ))}
                      {municipalities.length === 0 && (
                        <tr>
                          <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>
                            Sem resultados
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    style={{
                      padding: '0.5rem 1rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem',
                      background: 'white', color: page === 1 ? '#CBD5E1' : '#475569',
                      cursor: page === 1 ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontSize: '0.875rem'
                    }}
                  >
                    ← Anterior
                  </button>
                  <span style={{ color: '#64748B', fontSize: '0.875rem', padding: '0 0.5rem' }}>
                    Página {page} de {pages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(pages, p + 1))}
                    disabled={page === pages}
                    style={{
                      padding: '0.5rem 1rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem',
                      background: 'white', color: page === pages ? '#CBD5E1' : '#475569',
                      cursor: page === pages ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontSize: '0.875rem'
                    }}
                  >
                    Próxima →
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* API example + Source */}
        <div style={{
          background: '#F8FAFC', border: '1px solid #E2E8F0',
          borderRadius: '0.875rem', padding: '1.25rem 1.5rem', marginBottom: '1.5rem'
        }}>
          <p style={{ color: '#475569', fontSize: '0.85rem', margin: '0 0 0.625rem 0' }}>
            <strong>Endpoint de exemplo:</strong>
          </p>
          <code style={{
            display: 'block', color: '#16A34A', background: '#F0FDF4',
            padding: '0.5rem 0.875rem', borderRadius: '0.375rem',
            fontSize: '0.85rem', wordBreak: 'break-all'
          }}>
            GET https://api.apiaberta.pt/v1/geo/municipalities?district=Lisboa
          </code>
        </div>

        <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: '0.82rem' }}>
          Fonte:{' '}
          <a
            href="https://geoapi.pt"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#6366F1', textDecoration: 'none' }}
          >
            geoapi.pt
          </a>
          {' '}· Dados sincronizados diariamente
          {meta?.last_sync && (
            <span> · Última sincronização: {new Date(meta.last_sync).toLocaleDateString('pt-PT')}</span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
