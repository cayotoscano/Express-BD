# API REST com Express — CRUD de Alunos em Memória (11/08/2026)

API RESTful desenvolvida para o gerenciamento básico de alunos, permitindo operações completas de cadastro, consulta, atualização e exclusão (CRUD) de registros armazenados em memória.

---

## 1. Descrição
Esta API foi desenvolvida para praticar os conceitos fundamentais de desenvolvimento de rotas HTTP RESTful e manipulação de conjuntos de dados em JavaScript.

* **Objetivo da API**: Implementar endpoints HTTP (`GET`, `POST`, `PUT`, `DELETE`) para gerenciar uma lista de alunos.
* **Problema que pretende resolver**: Facilitar a gestão de cadastros de alunos e cursos, permitindo buscas dinâmicas por identificador único e atualização de informações.
* **Consumidores**: Sistemas acadêmicos, aplicações front-end de gestão escolar ou ferramentas de testes de API.
* **Contexto de Utilização**: Unidade Curricular Programação Web 2 — Senac RJ.

---

## 2. Funcionalidades
* **Listagem de alunos**: Consulta completa de todos os alunos cadastrados;
* **Busca por ID**: Consulta individual das informações de um aluno específico pelo parâmetro de rota `:id`;
* **Cadastro de aluno**: Inclusão de novos alunos enviando dados via corpo da requisição em formato JSON;
* **Atualização de cadastro**: Alteração do `nome` e `curso` de um aluno existente;
* **Exclusão de registro**: Remoção de um aluno da lista através do seu ID;
* **Parsing de JSON**: Middleware nativo `express.json()` configurado para interpretação de payloads no formato JSON.

---

## 3. Tecnologias Utilizadas
* **Node.js**
* **Express v5.2.1**
* **JavaScript (ES Modules)**
* **Nodemon v3.1.14**

---

## 4. Arquitetura e Organização do Projeto
O projeto foi organizado com a separação entre a camada da aplicação Express e o servidor HTTP de inicialização:

```text
11082026 - NodeExpress/
├── src/
│   └── app.js          # Definição do app Express, rotas HTTP e funções de apoio (CRUD)
├── server.js           # Arquivo principal de execução do servidor HTTP na porta 3000
├── package.json        # Configuração de scripts e dependências do projeto
├── package-lock.json   # Mapeamento estrito das dependências
└── README.md           # Documentação do projeto
```

### Descrição dos componentes principais:
* **`src/app.js`**: Contém o array em memória `alunos`, funções auxiliares (`buscarAlunoPorId` e `buscarIndexAluno`) e o mapeamento dos endpoints.
* **`server.js`**: Importa a aplicação e inicia o servidor escutando a porta HTTP `3000`.

---

## 5. Pré-requisitos
Antes de executar o projeto, verifique se você possui os seguintes itens instalados:

* **Node.js** (versão 18 ou superior);
* **npm** ou **yarn**;
* **Git**.

---

## 6. Instalação

### 6.1 Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-projeto.git
```

### 6.2 Acesse a pasta do projeto
```bash
cd "11082026 - NodeExpress"
```

### 6.3 Instale as dependências
```bash
npm install
```

---

## 7. Configuração das Variáveis de Ambiente
Nesta fase, a aplicação utiliza dados em memória mantidos durante a execução do processo Node.js. Não é necessária a configuração de banco de dados ou variáveis de ambiente externas.

Caso queira alterar a porta padrão (`3000`), modifique a variável `port` no arquivo `server.js`.

---

## 8. Execução do Projeto

### Ambiente de desenvolvimento
```bash
npm run dev
```

### Ambiente de produção
```bash
node server.js
```

Endereço padrão da aplicação em execução:
[http://localhost:3000](http://localhost:3000)

---

## 9. Endpoints da API

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Retorna a mensagem de boas-vindas da API |
| `GET` | `/alunos` | Lista todos os alunos cadastrados |
| `GET` | `/alunos/:id` | Retorna os dados de um aluno específico filtrado por ID |
| `POST` | `/alunos` | Cadastra um novo aluno no sistema |
| `PUT` | `/alunos/:id` | Atualiza os dados (`nome` e `curso`) de um aluno por ID |
| `DELETE` | `/alunos/:id` | Remove um aluno do sistema pelo ID |

---

## 10. Exemplos de Requisição e Resposta

### 10.1 Listar todos os alunos (`GET /alunos`)
**Resposta (`200 OK`):**
```json
[
  { "id": 1, "nome": "Bruno", "curso": "ADS" },
  { "id": 2, "nome": "Maria", "curso": "ADS" },
  { "id": 3, "nome": "Lara", "curso": "ADS" },
  { "id": 4, "nome": "José", "curso": "ADS" }
]
```

### 10.2 Cadastrar aluno (`POST /alunos`)
**Requisição:**
`POST /alunos`
`Content-Type: application/json`
```json
{
  "id": 5,
  "nome": "Carlos",
  "curso": "ADS"
}
```

**Resposta (`201 Created`):**
```text
Aluno cadastrado com sucesso!
```

### 10.3 Atualizar aluno (`PUT /alunos/:id`)
**Requisição:**
`PUT /alunos/1`
`Content-Type: application/json`
```json
{
  "nome": "Bruno Silva",
  "curso": "Engenharia de Software"
}
```

### 10.4 Excluir aluno (`DELETE /alunos/:id`)
**Requisição:**
`DELETE /alunos/2`

**Resposta:**
```text
Aluno com id 2 excluido com sucesso
```

---

## 11. Autenticação
Todos os endpoints da API são públicos. Não há restrição de acesso ou necessidade de token de autenticação nesta etapa.

---

## 12. Tratamento de Erros
A aplicação processa requisições através dos seletores de rotas e manipulação de arrays nativos do JavaScript.

### Principais códigos HTTP utilizados:
* **200 — OK**: Operações de busca ou alteração concluídas com sucesso.
* **201 — Created**: Registro cadastrado com sucesso.
* **404 — Not Found**: Recurso não localizado.
* **500 — Internal Server Error**: Erro genérico do servidor.

---

## 13. Testes
Os endpoints podem ser testados utilizando utilitários de requisição HTTP (como Postman, Insomnia ou extensão Thunder Client do VS Code).

---

## 14. Documentação da API
A documentação completa dos endpoints e payloads esperados encontra-se detalhada neste arquivo `README.md`.

---

## 15. Modelo de Dados

### Entidade: Aluno
```text
Aluno
├── id (number)      — Identificador único do aluno
├── nome (string)    — Nome completo do aluno
└── curso (string)   — Nome do curso matriculado
```

---

## 16. Regras de Negócio
* Cada aluno possui um `id` numérico único.
* A alteração via `PUT /alunos/:id` atualiza os atributos `nome` e `curso` do aluno identificado pelo parâmetro `:id`.
* A exclusão via `DELETE /alunos/:id` localiza o índice do elemento via `findIndex` e remove o elemento utilizando `splice`.

---

## 17. Extras — Programação Web 2
* **Manipulação Dinâmica de Arrays**: Utilização dos métodos de alta ordem `.filter()`, `.findIndex()` e `.splice()` para gerenciamento de dados em memória.
* **Parâmetros de Rota (`req.params`)**: Captura dinâmica de identificadores na URL (`:id`).
* **Envio de JSON no Body (`req.body`)**: Processamento automático de dados JSON com `express.json()`.

---

## 18. Versionamento e Organização das Branches
O desenvolvimento das atividades da Unidade Curricular segue o padrão de versionamento definido.

Branch da semana:
```text
branch_20260811
```

Fluxo esperado:
```text
main
  │
  └── branch_20260811
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
