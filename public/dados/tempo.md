# Meteorologia

> Previsões, avisos e sismos. Previsões a cada 6h, avisos a cada 30 min.

- Fonte: IPMA
- Prefixo: `https://api.apiaberta.pt/v1/ipma`
- HTML: https://apiaberta.pt/dados/tempo
- Markdown: https://apiaberta.pt/dados/tempo.md

## Endpoints

### GET `/v1/ipma/locations`

Locais IPMA disponíveis (continente e ilhas).

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `island` | query | boolean | true = só ilhas; false = só continente |

```bash
curl https://api.apiaberta.pt/v1/ipma/locations
```

### GET `/v1/ipma/forecasts`

Previsão para todos os locais.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `days` | query | integer | Dias à frente (1–10, default 5) |

```bash
curl https://api.apiaberta.pt/v1/ipma/forecasts
```

### GET `/v1/ipma/forecasts/:cityId`

Previsão para um local (ex.: 1110600 = Lisboa).

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `cityId` | path | integer (obrigatório) | globalIdLocal do IPMA |

```bash
curl https://api.apiaberta.pt/v1/ipma/forecasts/1110600
```

### GET `/v1/ipma/warnings`

Avisos meteorológicos activos.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `level` | query | string | yellow | orange | red |
| `region` | query | string | Código de região |

```bash
curl https://api.apiaberta.pt/v1/ipma/warnings
```

### GET `/v1/ipma/seismic`

Catálogo sísmico (janela por omissão: 30 dias).

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `region` | query | string | acores | continente-madeira |
| `min_magnitude` | query | number | Magnitude mínima |
| `desde` | query | string | Início (ISO 8601) |
| `ate` | query | string | Fim (ISO 8601) |
| `sensed` | query | boolean | Só eventos sentidos |
| `near` | query | string | lat,lon do centro |
| `radius_km` | query | number | Raio em km (máx. 500) |
| `limit` | query | integer | 1–1000 (default 100) |
| `offset` | query | integer | Offset |

```bash
curl "https://api.apiaberta.pt/v1/ipma/seismic?min_magnitude=3"
```

### GET `/v1/ipma/seismic/latest`

Último evento por região.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `region` | query | string | acores | continente-madeira |

```bash
curl https://api.apiaberta.pt/v1/ipma/seismic/latest
```

### GET `/v1/ipma/seismic/:id`

Um evento sísmico pelo id IPMA.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `id` | path | string (obrigatório) | sismoId ou event_key |

```bash
curl https://api.apiaberta.pt/v1/ipma/seismic/LATEST
```

### GET `/v1/ipma/meta`

Metadados do conector IPMA.

```bash
curl https://api.apiaberta.pt/v1/ipma/meta
```
