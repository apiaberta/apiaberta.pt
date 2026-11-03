# Proteção Civil

> Ocorrências, risco de incêndio, avisos e hotspots. Actualizado a cada 5 minutos.

- Fonte: ANEPC / fogos.pt
- Prefixo: `https://api.apiaberta.pt/v1/anpc`
- HTML: https://apiaberta.pt/dados/protecao-civil
- Markdown: https://apiaberta.pt/dados/protecao-civil.md

## Endpoints

### GET `/v1/anpc/incidents/active`

Ocorrências activas agora.

```bash
curl https://api.apiaberta.pt/v1/anpc/incidents/active
```

### GET `/v1/anpc/incidents`

Lista de ocorrências com filtros.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `active` | query | boolean | Default true |
| `district` | query | string | Distrito |
| `natureza` | query | string | Tipo (Mato, Florestal, …) |
| `from` | query | string | Data ISO inicial |
| `to` | query | string | Data ISO final |
| `page` | query | integer | Página |
| `limit` | query | integer | 1–100 |

```bash
curl "https://api.apiaberta.pt/v1/anpc/incidents?district=Faro"
```

### GET `/v1/anpc/summary`

Contagens de ocorrências activas por distrito.

```bash
curl https://api.apiaberta.pt/v1/anpc/summary
```

### GET `/v1/anpc/risk`

Risco de incêndio por distrito.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `date` | query | string | YYYY-MM-DD |

```bash
curl https://api.apiaberta.pt/v1/anpc/risk
```

### GET `/v1/anpc/risk/:district`

Risco de incêndio de um distrito.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `district` | path | string (obrigatório) | Nome do distrito |

```bash
curl https://api.apiaberta.pt/v1/anpc/risk/Lisboa
```

### GET `/v1/anpc/warnings`

Avisos rodoviários / ANEPC.

```bash
curl https://api.apiaberta.pt/v1/anpc/warnings
```

### GET `/v1/anpc/hotspots`

Hotspots de fogo detectados por satélite (via fogos.pt).

```bash
curl https://api.apiaberta.pt/v1/anpc/hotspots
```

### GET `/v1/anpc/meta`

Metadados do conector ANPC.

```bash
curl https://api.apiaberta.pt/v1/anpc/meta
```
