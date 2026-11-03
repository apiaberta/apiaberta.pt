# Documentação API Aberta

Base URL: `https://api.apiaberta.pt`

Os endpoints públicos de dados não exigem API key (30 req/min por IP). Com `X-API-Key` o limite sobe para 300 req/min.

## Páginas

- [Catálogo de endpoints](https://apiaberta.pt/docs/endpoints) ([.md](https://apiaberta.pt/docs/endpoints.md))
- [Servidor MCP](https://apiaberta.pt/docs/mcp) ([.md](https://apiaberta.pt/docs/mcp.md))
- [SDKs JavaScript e Python](https://apiaberta.pt/sdk) ([.md](https://apiaberta.pt/sdk.md))
- [Dados abertos (UI)](https://apiaberta.pt/dados) ([.md](https://apiaberta.pt/dados.md))
- [/llms.txt](https://apiaberta.pt/llms.txt)
- [/llms-full.txt](https://apiaberta.pt/llms-full.txt)

Cola o conteúdo do botão **Copiar para LLM** (na página HTML) num ficheiro `SKILL.md` do teu agente.

## Serviços

- [Plataforma](https://apiaberta.pt/docs/endpoints.md#platform) — `/v1` — Estado da plataforma e estatísticas agregadas.
- [Preços de Combustíveis](https://apiaberta.pt/dados/combustivel.md) — `/v1/fuel` — Médias nacionais e preços por posto, actualizados diariamente às 07:30.
- [Meteorologia](https://apiaberta.pt/dados/tempo.md) — `/v1/ipma` — Previsões, avisos e sismos. Previsões a cada 6h, avisos a cada 30 min.
- [Contratos Públicos](https://apiaberta.pt/dados/contratos-publicos.md) — `/v1/base` — Contratos públicos. Alias: /v1/contracts aponta para o mesmo conector.
- [Carregamento Eléctrico](https://apiaberta.pt/dados/ev.md) — `/v1/ev` — Tarifas CEME e preços spot OMIE.
- [Estatísticas de Portugal](https://apiaberta.pt/dados/estatisticas.md) — `/v1/ine` — PIB, população, desemprego, inflação. Série histórica desde 1960.
- [Proteção Civil](https://apiaberta.pt/dados/protecao-civil.md) — `/v1/anpc` — Ocorrências, risco de incêndio, avisos e hotspots. Actualizado a cada 5 minutos.
- [Taxas de Juro](https://apiaberta.pt/dados/taxas-juro.md) — `/v1/bdp` — Taxas BCE, €STR e crédito em Portugal.
- [Dados Geográficos](https://apiaberta.pt/dados/geo.md) — `/v1/geo` — Distritos, municípios, freguesias e códigos postais.
- [Validador de NIF](https://apiaberta.pt/docs/endpoints.md#nif) — `/v1/nif` — Validação de NIF português e lookup de empresa (VIES).
- [PRR / PT2030](https://apiaberta.pt/docs/endpoints.md#prr) — `/v1/prr` — Componentes, investimentos e resumo do PRR. /v1/pt2030 é o mesmo conector.
- [Legislação (DRE)](https://apiaberta.pt/docs/endpoints.md#dre) — `/v1/dre` — Séries, tipos e pesquisa no Diário da República.
- [Fogos (NASA FIRMS)](https://apiaberta.pt/docs/endpoints.md#nasafirms) — `/v1/nasafirms` — Hotspots VIIRS/MODIS em Portugal.
- [Carris Metropolitana](https://apiaberta.pt/docs/endpoints.md#carris) — `/v1/carris` — Veículos em tempo real, paragens, linhas e alertas.
- [Horários (GTFS)](https://apiaberta.pt/docs/endpoints.md#gtfs) — `/v1/gtfs` — Feeds GTFS unificados de operadores portugueses. Janela de 2 dias.
- [Parlamento](https://apiaberta.pt/docs/endpoints.md#parlamento) — `/v1/parlamento` — Iniciativas, votações, deputados, grupos e petições.
- [SNS Transparência](https://apiaberta.pt/docs/endpoints.md#sns) — `/v1/sns` — Urgências, cirurgia, consultas e recursos humanos (mensal).
