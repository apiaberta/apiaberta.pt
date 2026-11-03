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
