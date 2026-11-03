# SDKs API Aberta

Integra dados públicos portugueses com os SDKs oficiais.

## JavaScript / Node.js

```bash
npm install apiaberta-js
```

```js
import ApiAberta from 'apiaberta-js'

const api = new ApiAberta({ apiKey: 'your-key' })
const prices = await api.fuel({ district: 'Lisboa' })
```

## Python

```bash
pip install apiaberta
```

```python
from apiaberta import ApiAberta

api = ApiAberta(api_key="your-key")
prices = api.fuel(district="Lisboa")
```

- [apiaberta-js](https://github.com/apiaberta/apiaberta-js)
- [apiaberta-py](https://github.com/apiaberta/apiaberta-py)
- [HTML](https://apiaberta.pt/sdk)

Os endpoints REST públicos funcionam sem SDK nem chave. Ver [endpoints.md](./docs/endpoints.md).
