# API RESTful com NestJS 12, DatabaseModule (MySQL2), ConfigService e Telemetria (25/09/2026)

API RESTful corporativa desenvolvida em **NestJS 12 e TypeScript**, integrada ao **MySQL2** via `DatabaseModule`, gerenciada pelo **ConfigModule** e monitorada com **ObserveModule**.

---

## 1. Descrição
Esta versão avançada da API RESTful no ecossistema NestJS implementa a integração completa com o banco de dados MySQL2, injeção de dependências global de configurações de ambiente e telemetria observável em tempo real.

* **Objetivo da API**: Prover um serviço acadêmico robusto com persistência relacional MySQL, ciclo de vida gerenciado (`OnModuleDestroy`) e gerenciamento centralizado de variáveis de ambiente via `ConfigService`.
* **Problema que pretende resolver**: Eliminar conexões soltas de banco de dados e dados hardcoded na aplicação, garantindo encerramento gracioso dos recursos de rede e telemetria avançada de requisições.
* **Consumidores**: Sistemas de gestão de ensino, plataformas clientes SPA/Mobile e ferramentas de monitoramento.
* **Contexto de Utilização**: Unidade Curricular Programação Web 2 — Senac RJ.

---

## 2. Funcionalidades
* **Módulo de Banco de Dados Personalizado (`DatabaseModule`)**: Injeção da classe `DatabaseService` que cria um pool assíncrono do `mysql2/promise` a partir de `ConfigService`;
* **Gerenciamento Gracioso do Ciclo de Vida (`OnModuleDestroy` & `enableShutdownHooks`)**: Encerramento seguro do pool de conexões (`await this.pool.end()`) ao desligar a aplicação;
* **Configuração Global (`ConfigModule`)**: Leitura tipada e segura de variáveis (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`);
* **Telemetria e Observabilidade (`@nestjs/observe`)**: Módulo para rastreamento distribuído, logs correlacionados e alertas de erros;
* **Gerenciamento de Entidades (CRUD Completo)**:
  * **Alunos** (`/alunos`): Manipulação completa de registros de alunos no MySQL;
  * **Professores** (`/professores`): Manipulação completa de registros de professores no MySQL;
* **Validação de Parâmetros (`ParseIntPipe`)**: Garantia de tipagem inteira para parâmetros `:id`;
* **Testes Automatizados**: Suíte completa de testes com Vitest (`unit` e `e2e`).

---

## 3. Tecnologias Utilizadas
* **Node.js**
* **NestJS v12.0.1** (`@nestjs/core`, `@nestjs/common`, `@nestjs/config`, `@nestjs/observe`, `@nestjs/platform-express`)
* **TypeScript v6.0.2**
* **MySQL2 v3.x** (`mysql2/promise`)
* **Vitest v4.1.2** (Suíte de testes automatizados e relatórios de cobertura)
* **Oxlint v1.58.0** & **Prettier v3.4.2**

---

## 4. Arquitetura e Organização do Projeto

```text
25092026 - NESTJS/
├── src/
│   ├── alunos/
│   │   ├── alunos.controller.ts        # Controller HTTP para a entidade Alunos
│   │   ├── alunos.controller.spec.ts   # Testes unitários do controller de Alunos
│   │   ├── alunos.module.ts            # Módulo de Alunos
│   │   ├── alunos.service.ts           # Regras de negócio e integração com DatabaseService
│   │   └── alunos.service.spec.ts      # Testes unitários do serviço de Alunos
│   ├── professores/
│   │   ├── professores.controller.ts      # Controller HTTP para a entidade Professores
│   │   ├── professores.controller.spec.ts # Testes unitários do controller de Professores
│   │   ├── professores.module.ts          # Módulo de Professores
│   │   ├── professores.service.ts         # Regras de negócio e integração com DatabaseService
│   │   └── professores.service.spec.ts    # Testes unitários do serviço de Professores
│   ├── database/
│   │   ├── database.module.ts          # Módulo exportador do serviço de banco de dados
│   │   ├── database.service.ts         # Serviço de pool MySQL2 com ConfigService e OnModuleDestroy
│   │   └── database.service.spec.ts    # Testes do serviço de banco de dados
│   ├── app.controller.ts               # Controller raiz
│   ├── app.module.ts                   # Módulo raiz configurando ConfigModule e ObserveModule
│   ├── app.service.ts                  # Serviço raiz
│   └── main.ts                         # Bootstrap com enableShutdownHooks e busca dinâmica da PORT
├── test/                               # Testes E2E (End-to-End)
├── nest-cli.json                       # Configuração de CLI do NestJS
├── oxlint.json                         # Linter Oxlint
├── tsconfig.json                       # Configuração do TypeScript
├── vitest.config.ts                    # Configuração do Vitest
├── vitest.config.e2e.ts                # Configuração de E2E no Vitest
├── package.json                        # Dependências e scripts
└── README.md                           # Documentação do projeto
```

---

## 5. Pré-requisitos
Antes de executar o projeto, certifique-se de possuir instalado:

* **Node.js** (v18 ou superior);
* **npm**, **yarn** ou **pnpm**;
* **Git**;
* **Banco de dados MySQL 8.x** (em execução local ou via Docker).

---

## 6. Instalação

### 6.1 Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-projeto.git
```

### 6.2 Acesse a pasta do projeto
```bash
cd "25092026 - NESTJS"
```

### 6.3 Instale as dependências
```bash
npm install
```

---

## 7. Configuração das Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as credenciais do banco de dados e porta de rede:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=api_user
DB_PASSWORD=api123
DB_NAME=api_rest
```

*Importante: O arquivo `.env` deve estar contido no `.gitignore` por questões de segurança de dados sensíveis.*

---

## 8. Execução do Projeto

### Modo de desenvolvimento com auto-reload
```bash
npm run start:dev
```

### Compilação de código (Build)
```bash
npm run build
```

### Modo de produção
```bash
npm run start:prod
```

Após iniciar a aplicação, a API estará acessível no endereço:
[http://localhost:3000](http://localhost:3000)

---

## 9. Endpoints da API

### Módulo Alunos (`/alunos`)
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/alunos` | Lista todos os alunos cadastrados no MySQL |
| `GET` | `/alunos/:id` | Busca um aluno específico no MySQL por ID |
| `POST` | `/alunos` | Cadastra um novo aluno na base de dados |
| `PUT` | `/alunos/:id` | Atualiza o cadastro de um aluno no MySQL |
| `DELETE` | `/alunos/:id` | Remove um aluno do banco de dados |

### Módulo Professores (`/professores`)
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/professores` | Lista todos os professores no MySQL |
| `GET` | `/professores/:id` | Busca um professor por ID |
| `POST` | `/professores` | Cadastra um novo professor |
| `PUT` | `/professores/:id` | Atualiza os dados de um professor por ID |
| `DELETE` | `/professores/:id` | Exclui um professor da base relacional |

---

## 10. Exemplos de Requisição e Resposta

### Cadastrar Aluno (`POST /alunos`)
**Requisição:**
`POST /alunos`
`Content-Type: application/json`
```json
{
  "nome": "Guilherme Arantes",
  "curso": "Sistemas para Internet"
}
```

**Resposta (`201 Created`):**
```json
{
  "id": 1,
  "nome": "Guilherme Arantes",
  "curso": "Sistemas para Internet"
}
```

---

## 11. Autenticação
Todos os endpoints são públicos nesta versão. A arquitetura modular do NestJS está preparada para a inclusão futura de `Guards` e `Strategies` de autenticação (JWT / Passport).

---

## 12. Tratamento de Erros
A aplicação conta com o sistema nativo de tratamento de exceções do NestJS combinando o `ParseIntPipe` para validação de tipos de rotas.

### Principais códigos HTTP utilizados:
* **200 — OK**: Operação de busca, edição ou exclusão concluída com sucesso.
* **201 — Created**: Registro inserido com sucesso na base relacional MySQL.
* **400 — Bad Request**: Parâmetros incorretos ou erro de validação nos dados.
* **404 — Not Found**: Aluno ou Professor não localizado no banco.
* **500 — Internal Server Error**: Erro de execução ou desconexão não esperada no MySQL.

---

## 13. Testes

### Executar suíte de testes unitários com Vitest
```bash
npm run test
```

### Modo de desenvolvimento de testes
```bash
npm run test:watch
```

### Relatório de cobertura de testes (Coverage)
```bash
npm run test:cov
```

### Executar testes E2E
```bash
npm run test:e2e
```

---

## 14. Documentação da API
A documentação detalhada das rotas e contratos dos módulos `Alunos` e `Professores` está disponível neste arquivo `README.md`.

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

### Tabela `professores` (MySQL):
```sql
CREATE TABLE professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    disciplina VARCHAR(100) NOT NULL
);
```

---

## 16. Regras de Negócio
* A classe `DatabaseService` obriga a definição válida de `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` e `DB_NAME` via `ConfigService.getOrThrow`.
* Ao receber o sinal de parada da aplicação, o NestJS aciona os `shutdownHooks` que disparam o método `onModuleDestroy()` no `DatabaseService`, fechando com segurança o pool de conexões do MySQL.

---

## 17. Extras — Programação Web 2
* **`DatabaseService` com Ciclo de Vida**: Implementação da interface `OnModuleDestroy` para finalização graciosa do pool de conexões do MySQL2.
* **Injeção de Configurações com `ConfigService`**: Uso de `getOrThrow` para garantir a integridade das variáveis de ambiente no boot.
* **Telemetria com `@nestjs/observe`**: Configuração de observabilidade integrada em nível de aplicação para monitoramento de rotas e performance.
* **Shutdown Hooks Habilitados**: Inclusão de `app.enableShutdownHooks()` no `main.ts` para tratamento de sinais POSIX de encerramento do processo Node.js.

---

## 18. Versionamento e Organização das Branches
O desenvolvimento das atividades da disciplina segue o padrão de versionamento estabelecido.

Branch da semana:
```text
branch_20260925
```

Fluxo esperado:
```text
main
  │
  └── branch_20260925
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
