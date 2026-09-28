# API REST com Express, Arquitetura em Camadas e MySQL (25/08/2026)

API RESTful completa desenvolvida com **Node.js, Express e MySQL 8.4**, estruturada através da **Arquitetura em Camadas (Routes, Controllers e Repositories)**.

---

## 1. Descrição
Esta etapa representa a evolução arquitetural da API REST, separando responsabilidades HTTP, regras de negócio e consultas SQL parametrizadas ao banco de dados relacional.

* **Objetivo da API**: Implementar uma arquitetura limpa em camadas (Layered Architecture) para gerenciamento completo dos registros de alunos no banco de dados MySQL.
* **Problema que pretende resolver**: Desacoplar a lógica de acesso ao banco de dados da camada de controle de requisições HTTP, garantindo segurança contra injeção de SQL (SQL Injection) via instruções preparadas (`pool.execute`).
* **Consumidores**: Front-ends web/mobile, serviços de integração acadêmica e ferramentas de teste de rotas API.
* **Contexto de Utilização**: Unidade Curricular Programação Web 2 — Senac RJ.

---

## 2. Funcionalidades
* **Arquitetura em Camadas**: Divisão entre Roteamento (`routes`), Controle HTTP (`controllers`) e Persistência de Dados (`repositories`);
* **Consultas SQL Parametrizadas**: Prevenção contra injeção de SQL utilizando `pool.execute(sql, params)`;
* **CRUD Completo de Alunos**:
  * Listagem geral (`findAll`);
  * Busca por identificador único (`findById`);
  * Cadastro de aluno com retorno do cabeçalho HTTP `Location` (`create`);
  * Atualização de registros (`update`);
  * Exclusão física com retorno `204 No Content` (`delete`);
* **Respostas HTTP Padronizadas**: Mensagens amigáveis para registros não encontrados (`404 Not Found`).

---

## 3. Tecnologias Utilizadas
* **Node.js** (v20+ com suporte nativo a `--env-file` e `--watch`)
* **Express v5.2.1**
* **MySQL2 v3.23.4** (`mysql2/promise`)
* **Docker & Docker Compose** (MySQL 8.4)
* **JavaScript (ES Modules)**

---

## 4. Arquitetura e Organização do Projeto

```text
25082026 - ExpressBD/
└── api-restt-main/
    ├── src/
    │   ├── controllers/
    │   │   └── AlunoController.js     # Trata requisições/respostas HTTP e códigos de status
    │   ├── database/
    │   │   └── pool.js                # Instância do pool de conexões MySQL
    │   ├── repositories/
    │   │   └── AlunoRepository.js     # Camada de persistência (Consultas SQL no MySQL)
    │   ├── routes/
    │   │   └── alunos.routes.js       # Definição e mapeamento dos endpoints da entidade Aluno
    │   ├── app.js                     # Inicialização do Express e acoplamento de rotas
    │   └── server.js                  # Healthcheck de banco de dados e boot do servidor HTTP
    ├── .env.example                   # Modelo de variáveis de ambiente
    ├── .gitignore                     # Arquivos ignorados pelo Git
    ├── docker-compose.yml             # Container MySQL 8.4
    ├── package.json                   # Dependências e scripts
    └── README.md                      # Documentação do projeto
```

### Descrição da responsabilidade das camadas:
* **`routes/`**: Recebe a requisição HTTP e direciona para o método correspondente do Controller.
* **`controllers/`**: Valida a entrada da requisição, invoca o Repository e constrói a resposta HTTP (status code, headers e body JSON).
* **`repositories/`**: Executa comandos SQL (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) de forma parametrizada via `pool.execute`.
* **`database/`**: Provedor central do pool de conexões com o MySQL.

---

## 5. Pré-requisitos
Antes de executar o projeto, certifique-se de possuir instalado:

* **Node.js** (versão 20 ou superior);
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
cd "25082026 - ExpressBD/api-restt-main"
```

### 6.3 Instale as dependências
```bash
npm install
```

---

## 7. Configuração das Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`:

```bash
cp .env.example .env
```

### Exemplo de `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=api_user
DB_PASSWORD=api123
DB_NAME=api_rest
```

*Nota: O arquivo `.env` é mantido fora do repositório Git por questões de segurança (`.gitignore`).*

---

## 8. Execução do Projeto

### 8.1 Iniciar o banco de dados MySQL via Docker
```bash
docker compose up -d
```

### 8.2 Executar a API em modo de desenvolvimento
```bash
npm run dev
```

### 8.3 Executar em produção
```bash
npm start
```

Após iniciar a aplicação, a API estará acessível em:
[http://localhost:3000](http://localhost:3000)

---

## 9. Endpoints da API

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/alunos` | Retorna todos os alunos da base de dados |
| `GET` | `/alunos/:id` | Busca e retorna um aluno específico por ID |
| `POST` | `/alunos` | Cadastra um novo aluno no banco de dados |
| `PUT` | `/alunos/:id` | Atualiza o `nome` e `curso` de um aluno por ID |
| `DELETE` | `/alunos/:id` | Remove o registro do aluno da base de dados |

---

## 10. Exemplos de Requisição e Resposta

### 10.1 Cadastrar aluno (`POST /alunos`)
**Requisição:**
`POST /alunos`
`Content-Type: application/json`
```json
{
  "nome": "Fernanda Lima",
  "curso": "Sistemas para Internet"
}
```

**Resposta (`201 Created`):**
*Header:* `Location: /alunos/1`
```json
{
  "id": 1,
  "nome": "Fernanda Lima",
  "curso": "Sistemas para Internet"
}
```

### 10.2 Buscar por ID inexistente (`GET /alunos/999`)
**Resposta (`404 Not Found`):**
```json
{
  "mensagem": "Aluno não encontrado"
}
```

---

## 11. Autenticação
Atualmente a API não exige autenticação por token ou chave de API. Todas as rotas estão liberadas para acesso público.

---

## 12. Tratamento de Erros
As respostas de erro são gerenciadas pelos controllers garantindo códigos HTTP apropriados:

### Principais códigos HTTP utilizados:
* **200 — OK**: Leitura ou atualização realizada com sucesso.
* **201 — Created**: Registro inserido com sucesso na base de dados.
* **204 — No Content**: Registro excluído com sucesso (sem corpo na resposta).
* **400 — Bad Request**: Dados inválidos na requisição.
* **404 — Not Found**: Aluno não localizado na busca, edição ou exclusão.
* **500 — Internal Server Error**: Exceção não tratada na camada de banco de dados ou servidor.

---

## 13. Testes
As rotas podem ser testadas com ferramentas de cliente HTTP (como Postman, Insomnia, VS Code REST Client ou cURL).

Exemplo cURL para cadastrar aluno:
```bash
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Gabriel", "curso":"ADS"}'
```

---

## 14. Documentação da API
A documentação com o detalhamento das rotas, parâmetros e exemplos de requisição encontra-se neste arquivo `README.md`.

---

## 15. Modelo de Dados

### Tabela `alunos` no MySQL:
```sql
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    curso VARCHAR(100) NOT NULL
);
```

---

## 16. Regras de Negócio
* Apenas requisições com os campos obrigatórios `nome` e `curso` são processadas para inserção.
* A criação de um aluno retorna o cabeçalho `Location` apontando a URL de consulta do novo recurso gerado.
* Se um ID não for localizado em operações de atualização (`PUT`) ou remoção (`DELETE`), a API retorna erro `404 Not Found` com mensagem descritiva.

---

## 17. Extras — Programação Web 2
* **Arquitetura em Camadas (Layered Architecture)**: Aplicação dos padrões Repository e Controller para alta manutenibilidade.
* **Consultas SQL Seguras (`Prepared Statements`)**: Utilização de placeholders `?` no `mysql2` contra ataques de SQL Injection.
* **Padrão RESTful nos Retornos HTTP**: Uso correto dos status códigos `201 Created` (com `Location`), `204 No Content` e `404 Not Found`.

---

## 18. Versionamento e Organização das Branches
O desenvolvimento das atividades da disciplina segue o padrão de versionamento estabelecido.

Branch da semana:
```text
branch_20260825
```

Fluxo esperado:
```text
main
  │
  └── branch_20260825
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
