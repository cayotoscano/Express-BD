# API RESTful com Fastify 5, Validação por Schemas e MySQL (01/09/2026)

API RESTful desenvolvida com **Fastify 5**, utilizando **JSON Schemas** para validação automática de entrada, **MySQL2** para persistência e tratamento centralizado de erros.

---

## 1. Descrição
Esta etapa apresenta o framework Fastify como uma alternativa de altíssimo desempenho ao Express, aproveitando recursos de validação automática por esquemas e rotinas assíncronas otimizadas.

* **Objetivo da API**: Construir uma API REST rápida, segura e com forte validação de contrato de dados (payloads e parâmetros) utilizando o ecossistema Fastify 5.
* **Problema que pretende resolver**: Evitar que dados inválidos ou malformados cheguem à camada de banco de dados, garantindo performance superior no ecossistema Node.js.
* **Consumidores**: Aplicações clientes web/mobile, serviços de alta concorrência e ferramentas de teste de rotas HTTP.
* **Contexto de Utilização**: Unidade Curricular Programação Web 2 — Senac RJ.

---

## 2. Funcionalidades
* **Alta Performance com Fastify 5**: Servidor web com logger integrado de alta eficiência;
* **Validação por JSON Schema (`alunoSchemas.js`)**: Validação rigorosa dos tipos e restrições de tamanho (`minLength`, `maxLength`, `minimum`, `additionalProperties: false`);
* **Roteamento Prefixado**: Registro modular das rotas sob o prefixo `/api/alunos`;
* **Tratamento Centralizado de Erros (`setErrorHandler`)**: Captura automática de falhas de validação de esquemas e erros de execução;
* **Lifecycle Hooks (`addHook('onClose')`)**: Encerramento gracioso do pool de conexões do MySQL ao desligar a aplicação;
* **Conexão MySQL2**: Execução de queries em MySQL 8.4 hospedado via Docker.

---

## 3. Tecnologias Utilizadas
* **Node.js** (v20+ com suporte nativo a `--env-file` e `--watch`)
* **Fastify v5.12.1**
* **MySQL2 v3.24.2**
* **Docker & Docker Compose** (MySQL 8.4)
* **JavaScript (ES Modules)**

---

## 4. Arquitetura e Organização do Projeto

```text
01092026 - ApiFastify/
├── src/
│   ├── controllers/
│   │   └── alunoController.js     # Lógica de controle das requisições Fastify
│   ├── database/
│   │   └── connection.js          # Pool de conexões MySQL2
│   ├── repositories/
│   │   └── alunoRepository.js     # Consultas SQL e interações com a base de dados
│   ├── routes/
│   │   └── alunoRoutes.js         # Mapeamento de rotas e vinculação dos JSON Schemas
│   ├── schemas/
│   │   └── alunoSchemas.js        # Definição dos JSON Schemas de validação de body e params
│   ├── app.js                     # Instância do Fastify, registros de rotas, logger e hooks
│   └── server.js                  # Ponto de inicialização do servidor HTTP
├── .env.example                   # Modelo de variáveis de ambiente
├── .gitignore                     # Arquivos ignorados pelo Git
├── docker-compose.yml             # Container MySQL 8.4
├── package.json                   # Dependências e scripts de execução
└── README.md                      # Documentação do projeto
```

### Descrição dos componentes:
* **`schemas/alunoSchemas.js`**: Define `alunoParamsSchema` e `alunoBodySchema` prevenindo campos não autorizados (`additionalProperties: false`).
* **`app.js`**: Registra o plug-in de rotas de alunos com prefixo `/api/alunos`, configura o manipulador de erros global e o hook `onClose` para o banco de dados.

---

## 5. Pré-requisitos
Antes de executar o projeto, certifique-se de possuir em seu ambiente:

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
cd "01092026 - ApiFastify"
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

*Nota: O arquivo `.env` não deve ser versionado no Git.*

---

## 8. Execução do Projeto

### 8.1 Iniciar o banco de dados via Docker
```bash
docker compose up -d
```

### 8.2 Iniciar a API em ambiente de desenvolvimento
```bash
npm run dev
```

### 8.3 Iniciar em produção
```bash
npm start
```

Após iniciar a aplicação, a API estará escutando no endereço:
[http://localhost:3000](http://localhost:3000)

---

## 9. Endpoints da API

Todos os endpoints desta API são prefixados com `/api/alunos`:

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/alunos` | Lista todos os alunos |
| `GET` | `/api/alunos/:id` | Retorna um aluno por ID (validação de número inteiro) |
| `POST` | `/api/alunos` | Cria um novo aluno (validação de body via JSON Schema) |
| `PUT` | `/api/alunos/:id` | Atualiza o aluno por ID |
| `DELETE` | `/api/alunos/:id` | Exclui o aluno por ID |

---

## 10. Exemplos de Requisição e Resposta

### 10.1 Cadastrar aluno (`POST /api/alunos`)
**Requisição:**
`POST /api/alunos`
`Content-Type: application/json`
```json
{
  "nome": "Renata Vasconcelos",
  "curso": "Sistemas de Informação"
}
```

**Resposta (`201 Created`):**
```json
{
  "id": 1,
  "nome": "Renata Vasconcelos",
  "curso": "Sistemas de Informação"
}
```

### 10.2 Envio de dados inválidos (`POST /api/alunos`)
**Requisição com corpo malformado:**
```json
{
  "nome": "R",
  "curso": "Sistemas",
  "campoExtra": "Não permitido"
}
```

**Resposta (`404 Bad Request / Validation Failure`):**
```json
{
  "message": "Dados inválidos",
  "errors": [
    {
      "keyword": "additionalProperties",
      "message": "must NOT have additional properties"
    }
  ]
}
```

---

## 11. Autenticação
A API não requer token de autenticação nesta etapa. Todos os endpoints são abertos para consulta e manipulação.

---

## 12. Tratamento de Erros
A aplicação centraliza os erros através do método `app.setErrorHandler(...)`:

### Principais códigos HTTP utilizados:
* **200 — OK**: Operação realizada com sucesso.
* **201 — Created**: Aluno criado com sucesso.
* **204 — No Content**: Registro excluído com sucesso.
* **400 / 404 — Bad Request / Invalid Data**: Falha na validação de esquemas JSON (campos faltantes ou propriedades extras).
* **500 — Internal Server Error**: Erro inesperado do servidor.

---

## 13. Testes
Os endpoints podem ser testados com clientes HTTP como Postman, Insomnia ou cURL:

```bash
curl -X POST http://localhost:3000/api/alunos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Juliana", "curso": "Engenharia"}'
```

---

## 14. Documentação da API
Os contratos de entrada e saída estão formalizados via JSON Schemas no código-fonte (`alunoSchemas.js`) e documentados neste arquivo `README.md`.

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
* Parâmetro `:id` deve ser um inteiro positivo maior ou igual a 1 (`minimum: 1`).
* Propriedades `nome` e `curso` são obrigatórias e devem possuir entre 2 e 100 caracteres.
* Não são aceitas propriedades adicionais no payload JSON enviado nas requisições.

---

## 17. Extras — Programação Web 2
* **Fastify 5 Schema Validation**: Validação automática de contrato de dados integrada com Ajv.
* **Fastify Error Handler Personalizado**: Interceptação de falhas de schema com respostas formatadas em JSON.
* **Lifecycle Hooks (`onClose`)**: Fechamento automático do pool do MySQL2 ao desativar a instância do servidor Fastify.
* **Logger Integrado Fastify (`logger: true`)**: Registro de acessos e erros de performance em tempo real no console.

---

## 18. Versionamento e Organização das Branches
O desenvolvimento das atividades da disciplina segue o padrão de versionamento estabelecido.

Branch da semana:
```text
branch_20260901
```

Fluxo esperado:
```text
main
  │
  └── branch_20260901
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
