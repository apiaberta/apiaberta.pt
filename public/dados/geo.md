# Dados Geográficos

> Distritos, municípios, freguesias e códigos postais.

- Fonte: geoapi.pt
- Prefixo: `https://api.apiaberta.pt/v1/geo`
- HTML: https://apiaberta.pt/dados/geo
- Markdown: https://apiaberta.pt/dados/geo.md

## Endpoints

### GET `/v1/geo/districts`

Lista de distritos.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `geojson` | query | string | true para incluir geometria |

```bash
curl https://api.apiaberta.pt/v1/geo/districts
```

### GET `/v1/geo/districts/:id`

Distrito pelo código INE.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `id` | path | string (obrigatório) | codigoine |

```bash
curl https://api.apiaberta.pt/v1/geo/districts/11
```

### GET `/v1/geo/municipalities`

Municípios, com filtro por distrito.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `district` | query | string | Nome do distrito |
| `page` | query | integer | Página |
| `limit` | query | integer | Por página (default 50) |

```bash
curl "https://api.apiaberta.pt/v1/geo/municipalities?district=Lisboa"
```

### GET `/v1/geo/municipalities/:slug`

Município pelo slug.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `slug` | path | string (obrigatório) | Slug (ex.: lisboa) |

```bash
curl https://api.apiaberta.pt/v1/geo/municipalities/lisboa
```

### GET `/v1/geo/municipalities/:slug/parishes`

Freguesias de um município.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `slug` | path | string (obrigatório) | Slug do município |

```bash
curl https://api.apiaberta.pt/v1/geo/municipalities/lisboa/parishes
```

### GET `/v1/geo/parishes`

Lista de freguesias.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `municipality` | query | string | Nome do município |

```bash
curl "https://api.apiaberta.pt/v1/geo/parishes?municipality=Lisboa"
```

### GET `/v1/geo/postal/:code`

Lookup de código postal (formato XXXX-XXX).

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `code` | path | string (obrigatório) | XXXX-XXX |

```bash
curl https://api.apiaberta.pt/v1/geo/postal/1000-001
```

### GET `/v1/geo/meta`

Contagens e last_sync.

```bash
curl https://api.apiaberta.pt/v1/geo/meta
```
