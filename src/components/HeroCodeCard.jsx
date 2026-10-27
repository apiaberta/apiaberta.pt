import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const ENDPOINT = 'https://api.apiaberta.pt/v1/fuel/prices'

// Static fallback so the card renders instantly (and offline); replaced by live data when the API answers.
const SAMPLE = [
  { fuel_name: 'Gasolina simples 95', avg_price_eur: 2.091, station_count: 2961, date: '2026-10-27' },
  { fuel_name: 'Gasóleo simples', avg_price_eur: 2.256, station_count: 2949, date: '2026-10-27' },
]

function pick(rows) {
  const wanted = ['gasoline_95', 'diesel']
  const out = wanted
    .map((slug) => rows.find((r) => r.fuel_slug === slug))
    .filter(Boolean)
    .map(({ fuel_name, avg_price_eur, station_count, date }) => ({ fuel_name, avg_price_eur, station_count, date }))
  return out.length ? out : null
}

function Value({ v }) {
  if (typeof v === 'number') return <span className="tok-num">{v}</span>
  return <span className="tok-str">"{v}"</span>
}

export default function HeroCodeCard() {
  const { t } = useLanguage()
  const [rows, setRows] = useState(SAMPLE)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 4000)
    fetch(ENDPOINT, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        const picked = pick(json?.data || [])
        if (picked) {
          setRows(picked)
          setLive(true)
        }
      })
      .catch(() => {})
      .finally(() => clearTimeout(timer))
    return () => {
      clearTimeout(timer)
      ctrl.abort()
    }
  }, [])

  return (
    <figure className="code-card" aria-label={t('hero.code.label')}>
      <div className="code-card__bar">
        <span className="code-card__dots" aria-hidden="true">
          <i /> <i /> <i />
        </span>
        <span className="code-card__title">GET /v1/fuel/prices</span>
        <span className="code-card__status">200 OK</span>
      </div>

      <pre className="code-card__body">
        <code>
          <span className="tok-dim">$ </span>
          <span className="tok-cmd">curl</span> <span className="tok-url">api.apiaberta.pt/v1/fuel/prices</span>
          {'\n\n'}
          <span className="tok-punc">{'{'}</span>
          {'\n  '}
          <span className="tok-key">"data"</span>
          <span className="tok-punc">: [</span>
          {rows.map((row, i) => (
            <span key={row.fuel_name}>
              {'\n    '}
              <span className="tok-punc">{'{'}</span>
              {Object.entries(row).map(([k, v], j, arr) => (
                <span key={k}>
                  {'\n      '}
                  <span className="tok-key">"{k}"</span>
                  <span className="tok-punc">: </span>
                  <Value v={v} />
                  {j < arr.length - 1 && <span className="tok-punc">,</span>}
                </span>
              ))}
              {'\n    '}
              <span className="tok-punc">{'}'}</span>
              {i < rows.length - 1 && <span className="tok-punc">,</span>}
            </span>
          ))}
          {'\n  '}
          <span className="tok-punc">]</span>
          {'\n'}
          <span className="tok-punc">{'}'}</span>
        </code>
      </pre>

      <figcaption className="code-card__foot">
        <span className={live ? 'live-dot' : 'live-dot live-dot--idle'} aria-hidden="true" />
        {live ? t('hero.code.live') : t('hero.code.sample')}
        <span className="code-card__source">DGEG</span>
      </figcaption>
    </figure>
  )
}
