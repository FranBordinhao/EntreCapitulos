# EntreCapitulos

API REST para uma rede social de leitores (cadastro de livros, estantes de leitura, resenhas, listas e sistema de seguidores).

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [MongoDB](https://www.mongodb.com/try/download/community) rodando localmente na porta padrão (`27017`)

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

## Configuração

O projeto usa um token JWT para autenticação. Por padrão, se a variável de ambiente `JWT_SECRET` não estiver definida, é usado um segredo fixo apenas para desenvolvimento. Para definir o seu próprio segredo, exporte a variável antes de iniciar o servidor:

```bash
# Linux/macOS
export JWT_SECRET="sua_chave_secreta"

# Windows (PowerShell)
$env:JWT_SECRET="sua_chave_secreta"
```

A conexão com o banco está configurada em `dbconexao.js` apontando para `mongodb://localhost:27017/entrecapitulos`. Certifique-se de que o MongoDB esteja em execução antes de iniciar o servidor.

## Como iniciar o servidor

```bash
npm run dev
```

O servidor será iniciado e ficará disponível em:

```
http://localhost:3000
```

## Endpoints principais

| Recurso | Rota base |
|---|---|
| Usuários | `/usuarios` |
| Livros | `/livros` |
| Estantes | `/estantes` |
| Resenhas | `/resenhas` |
| Listas | `/listas` |
| Livro-Listas | `/livro-listas` |
| Usuarios-Seguidores | `/usuarios-seguidores` |
| Atividades | `/atividades` |

A leitura (`GET`) dos recursos é pública. Criar, editar e excluir (`POST`/`PUT`/`DELETE`) exigem um token JWT válido no header `Authorization: Bearer <token>`, obtido via `POST /usuarios/login`.
