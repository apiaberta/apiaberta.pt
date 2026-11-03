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
