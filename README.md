# apiaberta.pt - Landing Page

Landing page oficial do projecto [API Aberta](https://github.com/apiaberta) - uma iniciativa open-source para unificar e disponibilizar dados públicos portugueses numa única API REST moderna.

## Tech Stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router v6](https://reactrouter.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (icons)
- Custom i18n (PT/EN)

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Estrutura

```
src/
  components/     # Componentes reutilizáveis
  contexts/       # React Context (Language, API)
  i18n/           # Traduções PT/EN
  pages/          # Páginas da aplicação
  App.jsx
  main.jsx
```

## Páginas

- `/` - Home (todas as secções)
- `/contribute` - Guia de contribuição
- `/contact` - Formulário de contacto

## Contribuir

Contribuições são bem-vindas! Lê o [guia de contribuição](https://github.com/apiaberta/apiaberta/blob/main/CONTRIBUTING.md) e abre um Pull Request.

## Licença

MIT - ver [LICENSE](LICENSE)
