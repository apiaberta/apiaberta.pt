# Endpoints públicos

> 101 endpoints GET em `https://api.apiaberta.pt`, listados a partir de `GET /v1/status` e do código dos conectores.

Sem autenticação para dados. Alias: `/v1/contracts` → `/v1/base`. `/v1/pt2030` partilha o conector `/v1/prr`.

[HTML](https://apiaberta.pt/docs/endpoints) · [Skill SKILL.md](https://apiaberta.pt/docs/endpoints.md)

# Plataforma

> Estado da plataforma e estatísticas agregadas.

- Fonte: API Aberta gateway
- Prefixo: `https://api.apiaberta.pt/v1`
- HTML: https://apiaberta.pt/docs/endpoints
- Markdown: https://apiaberta.pt/docs/endpoints.md

## Endpoints

### GET `/v1/status`

Estado de todos os conectores públicos (uptime, latência, versão).

```bash
curl https://api.apiaberta.pt/v1/status
```

### GET `/v1/stats`

Estatísticas agregadas da plataforma.

```bash
curl https://api.apiaberta.pt/v1/stats
```

# Preços de Combustíveis

> Médias nacionais e preços por posto, actualizados diariamente às 07:30.

- Fonte: DGEG
- Prefixo: `https://api.apiaberta.pt/v1/fuel`
- HTML: https://apiaberta.pt/dados/combustivel
- Markdown: https://apiaberta.pt/dados/combustivel.md

## Endpoints

### GET `/v1/fuel/prices`

Médias nacionais por tipo de combustível.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `date` | query | string | YYYY-MM-DD (omissão: hoje ou último dia disponível) |

```bash
curl https://api.apiaberta.pt/v1/fuel/prices
```

### GET `/v1/fuel/stations`

Postos individuais com filtros.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `fuel` | query | string | Slug (ex.: gasoline_95) |
| `district` | query | string | Distrito |
| `brand` | query | string | Marca (GALP, BP, …) |
| `sort` | query | string | price_asc | price_desc |
| `page` | query | integer | Página (default 1) |
| `limit` | query | integer | 1–100 (default 20) |

```bash
curl "https://api.apiaberta.pt/v1/fuel/stations?district=Lisboa&fuel=gasoline_95"
```

### GET `/v1/fuel/cheapest`

Postos mais baratos para um combustível.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `fuel` | query | string | Slug (default gasoline_95) |
| `limit` | query | integer | 1–50 (default 10) |

```bash
curl "https://api.apiaberta.pt/v1/fuel/cheapest?fuel=diesel&limit=5"
```

### GET `/v1/fuel/meta`

Metadados e estatísticas do conector.

```bash
curl https://api.apiaberta.pt/v1/fuel/meta
```

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

# Contratos Públicos

> Contratos públicos. Alias: /v1/contracts aponta para o mesmo conector.

- Fonte: BASE.gov.pt
- Prefixo: `https://api.apiaberta.pt/v1/base`
- HTML: https://apiaberta.pt/dados/contratos-publicos
- Markdown: https://apiaberta.pt/dados/contratos-publicos.md

## Endpoints

### GET `/v1/base/contracts`

Contratos recentes, paginados.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `page` | query | integer | Página (default 1) |
| `limit` | query | integer | 1–100 (default 25) |
| `type` | query | string | ajuste | concurso |
| `year` | query | integer | Ano (ex.: 2026) |

```bash
curl "https://api.apiaberta.pt/v1/base/contracts?limit=5"
```

### GET `/v1/base/contracts/search`

Pesquisa full-text.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `q` | query | string (obrigatório) | Termo de pesquisa |
| `page` | query | integer | Página |
| `limit` | query | integer | 1–100 |

```bash
curl "https://api.apiaberta.pt/v1/base/contracts/search?q=hospital"
```

### GET `/v1/base/contracts/lookup/:id`

Um contrato pelo id BASE.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `id` | path | string (obrigatório) | Id do contrato |

```bash
curl https://api.apiaberta.pt/v1/base/contracts/lookup/15088663
```

### GET `/v1/base/meta`

Metadados do conector BASE.

```bash
curl https://api.apiaberta.pt/v1/base/meta
```

# Carregamento Eléctrico

> Tarifas CEME e preços spot OMIE.

- Fonte: ERSE / OMIE
- Prefixo: `https://api.apiaberta.pt/v1/ev`
- HTML: https://apiaberta.pt/dados/ev
- Markdown: https://apiaberta.pt/dados/ev.md

## Endpoints

### GET `/v1/ev/tariffs`

Tarifas CEME com preço actual.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `type` | query | string | fixed | indexed |

```bash
curl https://api.apiaberta.pt/v1/ev/tariffs
```

### GET `/v1/ev/tariffs/cheapest`

Ranking das tarifas mais baratas para um carregamento.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `kwh` | query | number | kWh a carregar (default 40) |

```bash
curl "https://api.apiaberta.pt/v1/ev/tariffs/cheapest?kwh=40"
```

### GET `/v1/ev/omie/current`

Preço spot OMIE actual em Portugal.

```bash
curl https://api.apiaberta.pt/v1/ev/omie/current
```

### GET `/v1/ev/omie/today`

Preços OMIE de hoje (intervalos de 15 min).

```bash
curl https://api.apiaberta.pt/v1/ev/omie/today
```

### GET `/v1/ev/meta`

Metadados do conector EV.

```bash
curl https://api.apiaberta.pt/v1/ev/meta
```

# Estatísticas de Portugal

> PIB, população, desemprego, inflação. Série histórica desde 1960.

- Fonte: INE / Eurostat
- Prefixo: `https://api.apiaberta.pt/v1/ine`
- HTML: https://apiaberta.pt/dados/estatisticas
- Markdown: https://apiaberta.pt/dados/estatisticas.md

## Endpoints

### GET `/v1/ine/latest`

Último valor de cada indicador.

```bash
curl https://api.apiaberta.pt/v1/ine/latest
```

### GET `/v1/ine/stats`

Série temporal de um ou mais indicadores.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `indicator` | query | string | Slugs separados por vírgula (population,gdp,…) |
| `from` | query | integer | Ano inicial (default 2000) |
| `to` | query | integer | Ano final |

```bash
curl "https://api.apiaberta.pt/v1/ine/stats?indicator=population,gdp&from=2000"
```

### GET `/v1/ine/indicators`

Lista de indicadores disponíveis.

```bash
curl https://api.apiaberta.pt/v1/ine/indicators
```

### GET `/v1/ine/meta`

Metadados do conector INE.

```bash
curl https://api.apiaberta.pt/v1/ine/meta
```

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

# Taxas de Juro

> Taxas BCE, €STR e crédito em Portugal.

- Fonte: Banco de Portugal
- Prefixo: `https://api.apiaberta.pt/v1/bdp`
- HTML: https://apiaberta.pt/dados/taxas-juro
- Markdown: https://apiaberta.pt/dados/taxas-juro.md

## Endpoints

### GET `/v1/bdp/rates`

Taxas-chave do BCE e €STR.

```bash
curl https://api.apiaberta.pt/v1/bdp/rates
```

### GET `/v1/bdp/lending-rates`

Crédito à habitação, consumo e depósitos a prazo.

```bash
curl https://api.apiaberta.pt/v1/bdp/lending-rates
```

### GET `/v1/bdp/meta`

Metadados e catálogo de séries.

```bash
curl https://api.apiaberta.pt/v1/bdp/meta
```

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

# Validador de NIF

> Validação de NIF português e lookup de empresa (VIES).

- Fonte: MOD 11 / VIES
- Prefixo: `https://api.apiaberta.pt/v1/nif`
- HTML: https://apiaberta.pt/docs/endpoints
- Markdown: https://apiaberta.pt/docs/endpoints.md

## Endpoints

### GET `/v1/nif/validate/:nif`

Valida um NIF (algoritmo MOD 11).

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `nif` | path | string (obrigatório) | 9 dígitos |

```bash
curl https://api.apiaberta.pt/v1/nif/validate/509442013
```

### GET `/v1/nif/:nif`

Nome e morada da empresa (cache 30 dias).

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `nif` | path | string (obrigatório) | 9 dígitos (aceita prefixo PT) |
| `refresh` | query | boolean | true para ignorar cache |

```bash
curl https://api.apiaberta.pt/v1/nif/509442013
```

### GET `/v1/nif/meta`

Metadados do conector NIF.

```bash
curl https://api.apiaberta.pt/v1/nif/meta
```

# PRR / PT2030

> Componentes, investimentos e resumo do PRR. /v1/pt2030 é o mesmo conector.

- Fonte: transparencia.gov.pt
- Prefixo: `https://api.apiaberta.pt/v1/prr`
- HTML: https://apiaberta.pt/docs/endpoints
- Markdown: https://apiaberta.pt/docs/endpoints.md

## Endpoints

### GET `/v1/prr/components`

Componentes e investimentos do PRR.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `section` | query | string | component | investment |

```bash
curl https://api.apiaberta.pt/v1/prr/components
```

### GET `/v1/prr/summary`

Resumo estatístico do PRR.

```bash
curl https://api.apiaberta.pt/v1/prr/summary
```

### GET `/v1/prr/projects`

Pesquisa de investimentos PRR.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `q` | query | string | Termo |
| `component` | query | string | Id do componente (C01, …) |
| `page` | query | integer | Página |
| `limit` | query | integer | 1–100 |

```bash
curl "https://api.apiaberta.pt/v1/prr/projects?component=C01"
```

### GET `/v1/pt2030/summary`

Resumo do Portugal 2030.

```bash
curl https://api.apiaberta.pt/v1/pt2030/summary
```

### GET `/v1/prr/meta`

Metadados do conector PRR.

```bash
curl https://api.apiaberta.pt/v1/prr/meta
```

# Legislação (DRE)

> Séries, tipos e pesquisa no Diário da República.

- Fonte: dre.pt
- Prefixo: `https://api.apiaberta.pt/v1/dre`
- HTML: https://apiaberta.pt/docs/endpoints
- Markdown: https://apiaberta.pt/docs/endpoints.md

## Endpoints

### GET `/v1/dre/series`

Séries do DRE (I, II, III, I-A).

```bash
curl https://api.apiaberta.pt/v1/dre/series
```

### GET `/v1/dre/types`

Tipos de diploma (lei, decreto-lei, portaria, …).

```bash
curl https://api.apiaberta.pt/v1/dre/types
```

### GET `/v1/dre/search`

Pesquisa no DRE (proxy).

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `q` | query | string (obrigatório) | Termo |
| `series` | query | string | 1 | 2 | 3 | 1-A |
| `year` | query | string | Ano |
| `page` | query | integer | Página |

```bash
curl "https://api.apiaberta.pt/v1/dre/search?q=RGPD"
```

### GET `/v1/dre/latest`

Publicações mais recentes (I Série).

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `series` | query | string | Série (default 1) |

```bash
curl https://api.apiaberta.pt/v1/dre/latest
```

### GET `/v1/dre/legislation`

Lista recente de legislação.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `series` | query | string | Série |
| `year` | query | string | Ano |
| `page` | query | integer | Página |
| `limit` | query | integer | 1–100 |

```bash
curl https://api.apiaberta.pt/v1/dre/legislation
```

### GET `/v1/dre/meta`

Metadados do conector DRE.

```bash
curl https://api.apiaberta.pt/v1/dre/meta
```

# Fogos (NASA FIRMS)

> Hotspots VIIRS/MODIS em Portugal.

- Fonte: NASA FIRMS
- Prefixo: `https://api.apiaberta.pt/v1/nasafirms`
- HTML: https://apiaberta.pt/docs/endpoints
- Markdown: https://apiaberta.pt/docs/endpoints.md

## Endpoints

### GET `/v1/nasafirms/hotspots`

Hotspots de fogo (últimos N dias).

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `days` | query | integer | 1–7 (default 7) |
| `source` | query | string | VIIRS_SNPP | MODIS |
| `daynight` | query | string | D | N |
| `limit` | query | integer | 1–1000 |
| `page` | query | integer | Página |

```bash
curl "https://api.apiaberta.pt/v1/nasafirms/hotspots?days=2"
```

### GET `/v1/nasafirms/hotspots/count`

Contagem de hotspots.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `days` | query | integer | 1–7 |
| `source` | query | string | VIIRS_SNPP | MODIS |

```bash
curl https://api.apiaberta.pt/v1/nasafirms/hotspots/count
```

### GET `/v1/nasafirms/sources`

Fontes de satélite disponíveis.

```bash
curl https://api.apiaberta.pt/v1/nasafirms/sources
```

### GET `/v1/nasafirms/meta`

Metadados do conector NASA FIRMS.

```bash
curl https://api.apiaberta.pt/v1/nasafirms/meta
```

# Carris Metropolitana

> Veículos em tempo real, paragens, linhas e alertas.

- Fonte: Carris Metropolitana / TML
- Prefixo: `https://api.apiaberta.pt/v1/carris`
- HTML: https://apiaberta.pt/docs/endpoints
- Markdown: https://apiaberta.pt/docs/endpoints.md

## Endpoints

### GET `/v1/carris/vehicles`

Veículos em tempo real.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `line_id` | query | string | Id da linha |
| `route_id` | query | string | Id da rota |
| `bbox` | query | string | minLon,minLat,maxLon,maxLat |
| `limit` | query | integer | Limite |
| `offset` | query | integer | Offset |

```bash
curl "https://api.apiaberta.pt/v1/carris/vehicles?line_id=1501"
```

### GET `/v1/carris/vehicles/:id`

Um veículo.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `id` | path | string (obrigatório) | Id do veículo |

```bash
curl https://api.apiaberta.pt/v1/carris/vehicles/42
```

### GET `/v1/carris/alerts`

Alertas de serviço.

```bash
curl https://api.apiaberta.pt/v1/carris/alerts
```

### GET `/v1/carris/stops`

Paragens.

```bash
curl https://api.apiaberta.pt/v1/carris/stops
```

### GET `/v1/carris/stops/:id`

Uma paragem.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `id` | path | string (obrigatório) | Id da paragem |

```bash
curl https://api.apiaberta.pt/v1/carris/stops/160101
```

### GET `/v1/carris/stops/:id/arrivals`

Chegadas previstas a uma paragem.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `id` | path | string (obrigatório) | Id da paragem |

```bash
curl https://api.apiaberta.pt/v1/carris/stops/160101/arrivals
```

### GET `/v1/carris/lines`

Linhas.

```bash
curl https://api.apiaberta.pt/v1/carris/lines
```

### GET `/v1/carris/lines/:id`

Uma linha.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `id` | path | string (obrigatório) | Id da linha |

```bash
curl https://api.apiaberta.pt/v1/carris/lines/1501
```

### GET `/v1/carris/meta`

Metadados do conector Carris.

```bash
curl https://api.apiaberta.pt/v1/carris/meta
```

# Horários (GTFS)

> Feeds GTFS unificados de operadores portugueses. Janela de 2 dias.

- Fonte: Operadores GTFS
- Prefixo: `https://api.apiaberta.pt/v1/gtfs`
- HTML: https://apiaberta.pt/docs/endpoints
- Markdown: https://apiaberta.pt/docs/endpoints.md

## Endpoints

### GET `/v1/gtfs/feeds`

Feeds configurados e estado de ingestão.

```bash
curl https://api.apiaberta.pt/v1/gtfs/feeds
```

### GET `/v1/gtfs/feeds/:feed_id`

Um feed e os últimos diffs.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `feed_id` | path | string (obrigatório) | Id do feed |

```bash
curl https://api.apiaberta.pt/v1/gtfs/feeds/carris-metropolitana
```

### GET `/v1/gtfs/changes`

Diffs de stops/routes/trips.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `feed_id` | query | string | Id do feed |
| `since` | query | string | ISO 8601 |
| `limit` | query | integer | Limite |
| `offset` | query | integer | Offset |

```bash
curl https://api.apiaberta.pt/v1/gtfs/changes
```

### GET `/v1/gtfs/routes`

Rotas.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `feed_id` | query | string | Id do feed |
| `q` | query | string | Pesquisa |
| `route_type` | query | integer | Tipo GTFS |
| `limit` | query | integer | Limite |
| `offset` | query | integer | Offset |

```bash
curl https://api.apiaberta.pt/v1/gtfs/routes
```

### GET `/v1/gtfs/routes/:feed_id/:route_id`

Uma rota, paragens e trips de hoje.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `feed_id` | path | string (obrigatório) | Id do feed |
| `route_id` | path | string (obrigatório) | Id da rota |

```bash
curl https://api.apiaberta.pt/v1/gtfs/routes/carris-metropolitana/1501
```

### GET `/v1/gtfs/stops`

Paragens.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `feed_id` | query | string | Id do feed |
| `q` | query | string | Pesquisa |
| `near` | query | string | lat,lon |
| `limit` | query | integer | Limite |
| `offset` | query | integer | Offset |

```bash
curl https://api.apiaberta.pt/v1/gtfs/stops
```

### GET `/v1/gtfs/stops/:feed_id/:stop_id`

Uma paragem.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `feed_id` | path | string (obrigatório) | Id do feed |
| `stop_id` | path | string (obrigatório) | Id da paragem |

```bash
curl https://api.apiaberta.pt/v1/gtfs/stops/carris-metropolitana/160101
```

### GET `/v1/gtfs/stops/:feed_id/:stop_id/departures`

Partidas de uma paragem.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `feed_id` | path | string (obrigatório) | Id do feed |
| `stop_id` | path | string (obrigatório) | Id da paragem |

```bash
curl https://api.apiaberta.pt/v1/gtfs/stops/carris-metropolitana/160101/departures
```

### GET `/v1/gtfs/departures/near`

Partidas perto de um ponto.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `near` | query | string (obrigatório) | lat,lon |
| `radius_m` | query | number | Raio em metros |
| `limit` | query | integer | Limite |

```bash
curl "https://api.apiaberta.pt/v1/gtfs/departures/near?near=38.72,-9.14"
```

### GET `/v1/gtfs/meta`

Metadados do conector GTFS.

```bash
curl https://api.apiaberta.pt/v1/gtfs/meta
```

# Parlamento

> Iniciativas, votações, deputados, grupos e petições.

- Fonte: Assembleia da República
- Prefixo: `https://api.apiaberta.pt/v1/parlamento`
- HTML: https://apiaberta.pt/docs/endpoints
- Markdown: https://apiaberta.pt/docs/endpoints.md

## Endpoints

### GET `/v1/parlamento/legislaturas`

Legislaturas conhecidas e estado de sync.

```bash
curl https://api.apiaberta.pt/v1/parlamento/legislaturas
```

### GET `/v1/parlamento/iniciativas`

Iniciativas parlamentares.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `leg` | query | string | Legislatura (ex.: XVI) |
| `tipo` | query | string | Tipo |
| `gp` | query | string | Grupo parlamentar |
| `deputado` | query | integer | Id de cadastro |
| `estado` | query | string | Estado |
| `q` | query | string | Pesquisa |
| `desde` | query | string | Data inicial |
| `ate` | query | string | Data final |
| `limit` | query | integer | Limite |
| `offset` | query | integer | Offset |

```bash
curl "https://api.apiaberta.pt/v1/parlamento/iniciativas?leg=XVI&limit=10"
```

### GET `/v1/parlamento/iniciativas/:ini_id`

Uma iniciativa.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `ini_id` | path | string (obrigatório) | Id da iniciativa |

```bash
curl https://api.apiaberta.pt/v1/parlamento/iniciativas/12345
```

### GET `/v1/parlamento/votacoes`

Votações.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `leg` | query | string | Legislatura |
| `ini_id` | query | string | Id da iniciativa |
| `resultado` | query | string | Resultado |
| `gp` | query | string | Grupo parlamentar |
| `sentido` | query | string | a_favor | contra | abstencao |
| `desde` | query | string | Data inicial |
| `ate` | query | string | Data final |
| `limit` | query | integer | Limite |
| `offset` | query | integer | Offset |

```bash
curl https://api.apiaberta.pt/v1/parlamento/votacoes
```

### GET `/v1/parlamento/votacoes/:vot_id`

Uma votação.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `vot_id` | path | string (obrigatório) | Id da votação |

```bash
curl https://api.apiaberta.pt/v1/parlamento/votacoes/1
```

### GET `/v1/parlamento/deputados`

Deputados da legislatura corrente.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `leg` | query | string | Legislatura |
| `gp` | query | string | Grupo parlamentar |
| `circulo` | query | string | Círculo eleitoral |
| `q` | query | string | Pesquisa |
| `em_funcoes` | query | boolean | Só em funções |
| `limit` | query | integer | Limite |
| `offset` | query | integer | Offset |

```bash
curl https://api.apiaberta.pt/v1/parlamento/deputados
```

### GET `/v1/parlamento/deputados/:dep_id`

Um deputado.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `dep_id` | path | string (obrigatório) | Id do deputado |
| `leg` | query | string | Legislatura |

```bash
curl https://api.apiaberta.pt/v1/parlamento/deputados/3
```

### GET `/v1/parlamento/grupos`

Grupos parlamentares.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `leg` | query | string | Legislatura |

```bash
curl https://api.apiaberta.pt/v1/parlamento/grupos
```

### GET `/v1/parlamento/peticoes`

Petições.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `leg` | query | string | Legislatura |
| `situacao` | query | string | Situação |
| `q` | query | string | Pesquisa |
| `min_assinaturas` | query | integer | Mínimo de assinaturas |
| `desde` | query | string | Data inicial |
| `limit` | query | integer | Limite |
| `offset` | query | integer | Offset |

```bash
curl https://api.apiaberta.pt/v1/parlamento/peticoes
```

### GET `/v1/parlamento/peticoes/:pet_id`

Uma petição.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `pet_id` | path | string (obrigatório) | Id da petição |

```bash
curl https://api.apiaberta.pt/v1/parlamento/peticoes/1
```

### GET `/v1/parlamento/meta`

Metadados do conector Parlamento.

```bash
curl https://api.apiaberta.pt/v1/parlamento/meta
```

# SNS Transparência

> Urgências, cirurgia, consultas e recursos humanos (mensal).

- Fonte: transparencia.sns.gov.pt
- Prefixo: `https://api.apiaberta.pt/v1/sns`
- HTML: https://apiaberta.pt/docs/endpoints
- Markdown: https://apiaberta.pt/docs/endpoints.md

## Endpoints

### GET `/v1/sns/datasets`

Datasets curados e estado de sync.

```bash
curl https://api.apiaberta.pt/v1/sns/datasets
```

### GET `/v1/sns/entidades`

Entidades de saúde.

```bash
curl https://api.apiaberta.pt/v1/sns/entidades
```

### GET `/v1/sns/entidades/:slug`

Uma entidade pelo slug.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `slug` | path | string (obrigatório) | Slug da entidade |

```bash
curl https://api.apiaberta.pt/v1/sns/entidades/chuln
```

### GET `/v1/sns/:dataset`

Registos mensais de um dataset (urgencias, cirurgia_tmrg, consultas_hospitalares, rh, …).

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `dataset` | path | string (obrigatório) | Chave do dataset |
| `entidade` | query | string | Slug da entidade |
| `regiao` | query | string | Região |
| `desde` | query | string | YYYY-MM |
| `ate` | query | string | YYYY-MM |
| `limit` | query | integer | 1–1000 |
| `offset` | query | integer | Offset |
| `sort` | query | string | period | -period |

```bash
curl "https://api.apiaberta.pt/v1/sns/urgencias?limit=20"
```

### GET `/v1/sns/:dataset/latest`

Último período de um dataset.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `dataset` | path | string (obrigatório) | Chave do dataset |

```bash
curl https://api.apiaberta.pt/v1/sns/urgencias/latest
```

### GET `/v1/sns/:dataset/national`

Agregado nacional de um dataset.

| Parâmetro | Onde | Tipo | Descrição |
|---|---|---|---|
| `dataset` | path | string (obrigatório) | Chave do dataset |

```bash
curl https://api.apiaberta.pt/v1/sns/urgencias/national
```

### GET `/v1/sns/meta`

Metadados do conector SNS.

```bash
curl https://api.apiaberta.pt/v1/sns/meta
```
