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
