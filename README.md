# FoodBytes 🍲

## Descrição do Projeto

FoodBytes é uma aplicação web e mobile dedicada a criar uma comunidade interativa de compartilhamento gastronômico. Nosso objetivo é conectar cozinheiros de todos os níveis, permitindo o compartilhamento de receitas, troca de experiências culinárias e inspiração para novos pratos.

## Principais Funcionalidades

- 👤 Cadastro e login de usuários
- 📝 Publicação de receitas

## Tecnologias Utilizadas

### Frameworks
- Web: ReactJS
- Mobile: React Native

### Bibliotecas Principais
- react-icons
- react-router-dom
- lucide-react
- axios

## Configuração do Projeto

### Pré-requisitos
- Node.js
- npm (Node Package Manager)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/ThiagoBianchini/SiteCulinariaPB.git
```

2. Instale as dependências:
```bash
cd SiteCulinariaPB
npm install
```

3. Inicie o servidor da API:
```bash
npx json-server --watch db.json --port 3001
```

4. Inicie a aplicação web:
```bash
npm run dev
```

## Principais Componentes

- `App.jsx`: Componente central com gerenciamento de rotas e autenticação
- `Header.jsx`: Navegação e identidade visual responsiva
- `Home.jsx`: Página inicial com recomendações
- `RecipeList.jsx`: Listagem de receitas
- `RecipeDetail.jsx`: Detalhes específicos de cada receita
- `Login.jsx`: Autenticação de usuários

## Regras de Negócio

- Cadastro com verificação de e-mail
- Login seguro com sistema de tokens
- Publicação de receitas com título, ingredientes e passos
- Moderação de conteúdo

## Contato

**Líderes do Projeto:**
- Dagoberto do Nascimento
- Thiago Costa
- Roberto Tinoco
- João Gabriel

## Contribuição

Por favor, leia as diretrizes de contribuição antes de submeter pull requests.
