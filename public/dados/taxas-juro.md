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
