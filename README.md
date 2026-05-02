📚 Mystic Library UI

Uma aplicação web construída com React + TypeScript + Vite, que simula uma biblioteca mística interativa, onde usuários podem explorar, gerenciar e descobrir livros.

✨ Funcionalidades

🔐 Autenticação (simulada)

Login
Recuperação de senha

📖 Biblioteca do usuário

Visualizar livros adicionados
Remover livros da biblioteca

🔍 Exploração de livros

Busca por título ou autor
Histórico de pesquisa
Seções:
Mais procurados
Livros populares
Lançamentos

❤️ Lista de desejos

Adicionar livros
Remover livros

📘 Detalhes do livro

Modal com:
Sinopse
Autor
Ações (adicionar à biblioteca / wishlist)

⚙️ Configurações

Logout
(placeholder) exclusão de conta

🎨 UI/UX rica

Tema místico (cores como gold, amethyst, sepia)
Animações com Framer Motion
Estilização com Tailwind CSS

🧱 Tecnologias utilizadas

React
TypeScript
Vite
Tailwind CSS
Framer Motion
clsx + tailwind-merge (utilitário cn)

📁 Estrutura do projeto

project/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx        # Entrada da aplicação
    ├── App.tsx         # Lógica principal e telas
    ├── index.css       # Estilos globais + tema
    └── utils/
        └── cn.ts       # Helper para classes CSS
        
🧠 Arquitetura

A aplicação é baseada em estado local (React hooks):

isLoggedIn → controla autenticação
screen → controla navegação interna
userBooks → livros do usuário
wishlist → lista de desejos
selectedBook → livro aberto no modal

Não há backend — tudo é simulado no front.

Sistema de Design

Definido via Tailwind + variáveis customizadas:

Cores principais
mahogany → fundo escuro
gold → destaque
amethyst → ações
sepia → texto secundário
ink → fundo base
Tipografia
Serif (principal): leitura e títulos
Sans: UI e labels
Componentes visuais
.parchment-texture
.book-shadow
.gold-glow
.wood-shelf

Como rodar o projeto
1. Instalar dependências
npm install
2. Rodar em desenvolvimento
npm run dev
3. Build para produção
npm run build
4. Preview do build
npm run preview

🔧 Scripts disponíveis

No package.json:

dev → inicia servidor Vite
build → build de produção
preview → visualiza build

📌 Observações

Os dados dos livros (ALL_BOOKS) estão hardcoded no projeto
Não há persistência (localStorage ou API)
Sistema de autenticação é apenas visual (mock)
Algumas funcionalidades são placeholders (ex: excluir conta)

🚀 Possíveis melhorias

Integração com backend (API REST ou GraphQL)
Persistência com localStorage ou banco
Sistema real de autenticação (JWT, OAuth)
Favoritos e recomendações inteligentes
Paginação e carregamento dinâmico
Testes automatizados (Jest / RTL)

