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
