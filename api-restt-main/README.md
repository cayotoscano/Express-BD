# API REST de Alunos

## 1. Sobre o Projeto

Este projeto consiste em uma API REST para gerenciamento de alunos, permitindo realizar operações de criação, consulta, alteração e remoção de registros.

Nesta etapa, a aplicação foi reorganizada utilizando uma arquitetura em camadas, separando o tratamento das requisições HTTP, o acesso aos dados e o gerenciamento das rotas.

A API utiliza MySQL para armazenamento dos dados, com o banco sendo executado através do Docker.

---

## 2. Funcionalidades Implementadas

* Criar novos alunos;
* Listar alunos cadastrados;
* Consultar aluno através do ID;
* Alterar dados de um aluno;
* Remover alunos;
* Persistir informações no banco MySQL;
* Utilizar consultas SQL com parâmetros;
* Retornar códigos HTTP de acordo com cada operação.

---

## 3. Tecnologias

* **Node.js**
* **Express**
* **JavaScript**
* **MySQL 8.4**
* **MySQL2**
* **Docker**
* **Docker Compose**

---

## 4. Estrutura da Aplicação

A aplicação foi dividida em três principais camadas:

```text
Route
  ↓
Controller
  ↓
Repository
  ↓
MySQL
```

Estrutura dos arquivos:

```text
src/
├── controllers/
│   └── AlunoController.js
├── database/
│   └── pool.js
├── repositories/
│   └── AlunoRepository.js
├── routes/
│   └── alunos.routes.js
├── app.js
└── server.js
```

### Responsabilidades

* `routes/` — define os caminhos e métodos HTTP disponíveis;
* `controllers/` — processa as requisições e monta as respostas;
* `repositories/` — executa as operações SQL no banco;
* `database/` — configura o acesso ao MySQL;
* `app.js` — configura o Express e registra as rotas;
* `server.js` — inicializa o servidor.

A camada Service não foi utilizada nesta versão, pois não existem regras de negócio complexas no CRUD atual.

---

## 5. Requisitos

Para executar o projeto, é necessário ter:

* Node.js;
* npm;
* Git;
* Docker;
* Docker Compose.

---

## 6. Instalação e Configuração

Após clonar o projeto, entre na pasta:

```bash
cd Express-BD-main
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env` com os dados de conexão do banco:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=api_user
DB_PASSWORD=api123
DB_NAME=api_rest
```

---

## 7. Inicialização

O MySQL deve ser iniciado através do Docker Compose:

```bash
docker compose up -d
```

Depois, execute a API:

```bash
npm run dev
```

O servidor ficará disponível em:

```text
http://localhost:3000
```

---

## 8. Rotas Disponíveis

| Método   | Rota          | Função                      |
| -------- | ------------- | --------------------------- |
| `GET`    | `/alunos`     | Retorna todos os alunos     |
| `GET`    | `/alunos/:id` | Retorna um aluno específico |
| `POST`   | `/alunos`     | Cria um aluno               |
| `PUT`    | `/alunos/:id` | Modifica um aluno           |
| `DELETE` | `/alunos/:id` | Remove um aluno             |

---

## 9. Exemplos de Uso

### Criar aluno

```http
POST /alunos
Content-Type: application/json
```

```json
{
  "nome": "Cayo",
  "curso": "ADS"
}
```

Exemplo de retorno:

```json
{
  "id": 1,
  "nome": "Cayo",
  "curso": "ADS"
}
```

Código HTTP:

```text
201 Created
```

### Consultar alunos

```http
GET /alunos
```

Retorno:

```json
[
  {
    "id": 1,
    "nome": "Cayo",
    "curso": "ADS"
  }
]
```

### Consultar por ID

```http
GET /alunos/1
```

### Alterar aluno

```http
PUT /alunos/1
Content-Type: application/json
```

```json
{
  "nome": "Cayo Toscano",
  "curso": "Sistemas de Informação"
}
```

### Remover aluno

```http
DELETE /alunos/1
```

Em caso de sucesso:

```text
204 No Content
```

---

## 10. Banco de Dados

O banco utilizado pela aplicação é o **MySQL 8.4**, executado em um container Docker.

Configuração:

```text
Banco: api_rest
Usuário: api_user
Senha: api123
Porta: 3306
Container: mysql-api-rest
```

A tabela principal possui:

```text
alunos
├── id
├── nome
└── curso
```

O `id` é gerado automaticamente utilizando `AUTO_INCREMENT` e funciona como chave primária.

---

## 11. Persistência com Docker

O banco utiliza um Docker Volume para preservar os dados.

Iniciar o banco:

```bash
docker compose up -d
```

Verificar os containers:

```bash
docker ps
```

Parar os containers:

```bash
docker compose down
```

Para remover também o volume e apagar os dados:

```bash
docker compose down -v
```

---

## 12. Organização do CRUD

As operações do CRUD foram distribuídas entre as camadas da aplicação.

O fluxo de uma requisição segue:

```text
Cliente
  ↓
Route
  ↓
Controller
  ↓
Repository
  ↓
MySQL
```

O Repository concentra as operações:

```text
SELECT
INSERT
UPDATE
DELETE
```

Enquanto o Controller fica responsável pelo tratamento HTTP e pelos códigos de resposta.

---

## 13. Tratamento de Respostas

Quando um aluno não é localizado, a API retorna:

```json
{
  "mensagem": "Aluno não encontrado"
}
```

com status:

```text
404 Not Found
```

Os principais status utilizados são:

* `200` — requisição processada com sucesso;
* `201` — aluno criado;
* `204` — aluno removido sem conteúdo na resposta;
* `404` — aluno não encontrado.

---

## 14. Consultas ao Banco

As consultas utilizam parâmetros através do `mysql2`, por exemplo:

```js
pool.execute(
  'SELECT * FROM alunos WHERE id = ?',
  [id]
)
```

Essa abordagem mantém os valores separados da instrução SQL e é utilizada nas operações que recebem dados externos.

---

## 15. Versionamento

O desenvolvimento é organizado através de branches criadas a partir da `main`.

O padrão utilizado é:

```text
branch_yyyymmdd
```

Exemplo:

```text
branch_20260818
```

Após finalizar a atividade, a branch poderá ser integrada à `main`.

---

## 16. Autor

**Nome:** Cayo Toscano

**Unidade Curricular:** Programação Web 2

**Instituição:** Senac RJ

---

## 17. Finalidade

Projeto desenvolvido para fins acadêmicos na disciplina de Programação Web 2 — Senac RJ.
