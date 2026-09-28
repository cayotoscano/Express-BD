# API REST com Express, MySQL2 Pool e Dotenv (21/08/2026)

API RESTful desenvolvida para integrar o Node.js e o Express ao banco de dados MySQL utilizando **pool de conexões (`mysql2/promise`)** e gerenciamento de variáveis de ambiente através de arquivos `.env`.

---

## 1. Descrição
Esta etapa foca na conexão segura e eficiente entre a aplicação Node.js e o banco de dados MySQL rodando em container Docker.

* **Objetivo da API**: Estabelecer um pool de conexões reutilizáveis com o MySQL 8.4, testando a integridade da conexão na inicialização do servidor HTTP e abstraindo configurações sensíveis em arquivo de ambiente.
* **Problema que pretende resolver**: Evitar o vazamento de credenciais do banco de dados no código-fonte e garantir o gerenciamento otimizado de conexões concorrentes no banco.
* **Consumidores**: Clientes HTTP, aplicações web e sistemas integrados.
* **Contexto de Utilização**: Unidade Curricular Programação Web 2 — Senac RJ.

---

## 2. Funcionalidades
* **Conexão com MySQL via Pool (`mysql2/promise`)**: Reutilização eficiente de conexões com `connectionLimit: 10`;
* **Verificação de Conexão na Inicialização**: Teste automático da base de dados (`SELECT 1`) antes da abertura da porta HTTP;
* **Gerenciamento por Variáveis de Ambiente**: Suporte nativo a `.env` usando a flag `--env-file=.env` do Node.js;
* **Modo de Observação (`--watch`)**: Recarregamento automático ao alterar arquivos em ambiente dev;
* **Ambiente isolado em Docker**: Subida do container MySQL 8.4 com volume e credenciais personalizadas.

---

## 3. Tecnologias Utilizadas
* **Node.js** (v20+ com suporte a `--env-file` e `--watch`)
* **Express v5.2.1**
* **MySQL2 v3.23.4** (`mysql2/promise`)
* **Docker & Docker Compose**
* **JavaScript (ES Modules)**

---

## 4. Arquitetura e Organização do Projeto

```text
21082026 - ExpressBD/
└── api-restt-main/
    ├── src/
    │   ├── database/
    │   │   └── pool.js     # Configuração do pool de conexões MySQL (mysql2/promise)
    │   ├── app.js          # Configuração da aplicação Express e rotas HTTP
    │   └── server.js       # Verificação da conexão com o banco e inicialização do servidor
    ├── .env.example        # Modelo de variáveis de ambiente do projeto
    ├── .gitignore          # Arquivos e pastas ignorados pelo Git (inclui .env)
    ├── docker-compose.yml  # Configuração do container MySQL 8.4
    ├── package.json        # Configurações de scripts e dependências
    └── README.md           # Documentação do projeto
```

### Descrição dos componentes principais:
* **`src/database/pool.js`**: Cria o pool de conexões MySQL utilizando variáveis de ambiente (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
* **`src/server.js`**: Executa `pool.query('SELECT 1')` ao iniciar. Caso a conexão seja estabelecida com sucesso, o servidor HTTP entra em escuta na porta definida.

---

## 5. Pré-requisitos
Antes de executar o projeto, certifique-se de ter instalado em sua máquina:

* **Node.js** (versão 20 ou superior recomendada);
* **npm** ou **yarn**;
* **Git**;
* **Docker** e **Docker Compose**.

---

## 6. Instalação

### 6.1 Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-projeto.git
```

### 6.2 Acesse a pasta do projeto
```bash
cd "21082026 - ExpressBD/api-restt-main"
```

### 6.3 Instale as dependências
```bash
npm install
```

---

## 7. Configuração das Variáveis de Ambiente
Crie um arquivo `.env` na raiz da pasta `api-restt-main` utilizando como referência o arquivo `.env.example`:

```bash
cp .env.example .env
```

### Conteúdo do arquivo `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=api_user
DB_PASSWORD=api123
DB_NAME=api_rest
```

> **Importante**: Nunca envie o arquivo `.env` com senhas reais para repositórios remotos. Certifique-se de que ele esteja listado no `.gitignore`.

---

## 8. Execução do Projeto

### 8.1 Iniciar o banco de dados via Docker
Na pasta do `docker-compose.yml`, execute:
```bash
docker compose up -d
```

### 8.2 Iniciar a API em ambiente de desenvolvimento
```bash
npm run dev
```
*Este comando executa: `node --watch --env-file=.env src/server.js`*

### 8.3 Iniciar em ambiente de produção
```bash
npm start
```
*Este comando executa: `node --env-file=.env src/server.js`*

Endereço padrão da aplicação em execução:
[http://localhost:3000](http://localhost:3000)

---

## 9. Endpoints da API

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Retorna a mensagem de status da API |
| `GET` | `/alunos` | Retorna a lista de alunos |
| `GET` | `/alunos/:id` | Retorna um aluno filtrado pelo ID |
| `POST` | `/alunos` | Cadastra um novo aluno |
| `PUT` | `/alunos/:id` | Atualiza as informações do aluno |
| `DELETE` | `/alunos/:id` | Exclui um aluno pelo ID |

---

## 10. Exemplos de Requisição e Resposta

### Requisição (`POST /alunos`)
`Content-Type: application/json`
```json
{
  "nome": "Lucas Santos",
  "curso": "Análise e Desenvolvimento de Sistemas"
}
```

### Resposta (`201 Created`)
```text
Aluno cadastrado com sucesso!
```

---

## 11. Autenticação
A API não implementa autenticação nesta versão. Todas as rotas estão abertas para requisições.

---

## 12. Tratamento de Erros
Se a API não conseguir se conectar ao MySQL durante a inicialização em `server.js`, a aplicação exibe uma mensagem no terminal e encerra o processo com código de erro `1` (`process.exit(1)`).

### Principais códigos HTTP utilizados:
* **200 — OK**: Requisição realizada com sucesso.
* **201 — Created**: Aluno criado com sucesso.
* **400 — Bad Request**: Dados inválidos na requisição.
* **404 — Not Found**: Aluno ou rota não encontrada.
* **500 — Internal Server Error**: Falha de conexão com a base MySQL ou exceção interna.

---

## 13. Testes
Teste o funcionamento das rotas via terminal utilizando `curl`:

```bash
# Testar a rota de listagem
curl http://localhost:3000/alunos
```

---

## 14. Documentação da API
A documentação com todos os parâmetros, payloads de requisição e rotas disponíveis encontra-se detalhada neste arquivo `README.md`.

---

## 15. Modelo de Dados

### Tabela `alunos` (MySQL):
```sql
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    curso VARCHAR(100) NOT NULL
);
```

---

## 16. Regras de Negócio
* A API verifica ativamente a disponibilidade do MySQL executando a query `SELECT 1` antes de liberar as requisições HTTP.
* As credenciais da base de dados são carregadas exclusivamente a partir das variáveis de ambiente.

---

## 17. Extras — Programação Web 2
* **`mysql2/promise` Pool**: Uso de pool assíncrono com limites de conexões configuráveis (`connectionLimit: 10`).
* **Node Native Environment & Watch (`--env-file`, `--watch`)**: Recursos modernos do Node.js dispensando pacotes terceiros para leitura de `.env` e hot-reload.
* **Healthcheck de Banco de Dados**: A aplicação recusa a inicialização do servidor web caso a base de dados esteja inacessível.

---

## 18. Versionamento e Organização das Branches
O desenvolvimento das atividades da disciplina segue o padrão de versionamento estabelecido.

Branch da semana:
```text
branch_20260821
```

Fluxo esperado:
```text
main
  │
  └── branch_20260821
          │
          ├── desenvolvimento
          ├── commits
          └── merge
                │
                ▼
              main
```

---

## 19. Autor
* **Nome**: Cayo Toscano
* **Turma**: 36129382024
* **Unidade Curricular**: Programação Web 2

---

## 20. Licença e Uso Acadêmico
Projeto desenvolvido para fins acadêmicos na Unidade Curricular de **Programação Web 2 — Senac RJ**.
