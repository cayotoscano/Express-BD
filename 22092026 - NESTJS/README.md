# API RESTful com NestJS 12, TypeScript e Vitest (22/09/2026)

API RESTful modular desenvolvida no ecossistema **NestJS 12** em **TypeScript**, utilizando injeção de dependências e testes unitários automatizados com **Vitest**.

---

## 1. Descrição
Esta etapa introduz a arquitetura corporativa do NestJS, aplicando conceitos de Inversão de Controle (IoC), Injeção de Dependências (DI), Decoradores, Pipes de validação e testes automatizados de alta performance com Vitest.

* **Objetivo da API**: Estruturar uma API RESTful escalável e tipada em TypeScript para o gerenciamento de duas entidades distintas: `Alunos` e `Professores`.
* **Problema que pretende resolver**: Organizar sistemas de grande porte através de módulos bem delimitados (`AlunosModule` e `ProfessoresModule`), facilitando a manutenção e a escrita de testes unitários automatizados.
* **Consumidores**: Sistemas de gestão acadêmica, front-ends SPA/Mobile e suítes de testes.
* **Contexto de Utilização**: Unidade Curricular Programação Web 2 — Senac RJ.

---

## 2. Funcionalidades
* **Arquitetura Modular (NestJS 12)**: Separação clara de domínios em módulos independentes (`AlunosModule` e `ProfessoresModule`);
* **Tipagem Estática e Decoradores (TypeScript)**: Uso de `@Controller()`, `@Get()`, `@Post()`, `@Put()`, `@Delete()`, `@Body()`, `@Param()`;
* **Transformação de Parâmetros com Nest Pipes**: `ParseIntPipe` para garantia de tipo numérico nos parâmetros de rota `:id`;
* **Gerenciamento de Entidades**:
  * **Alunos** (`/alunos`): CRUD de nome e curso;
  * **Professores** (`/professores`): CRUD de nome e disciplina;
* **Testes Automatizados com Vitest**: Suíte completa de testes unitários (`.spec.ts`) e testes ponta-a-ponta (`e2e`);
* **Linter de Alta Velocidade (Oxlint)**: Verificação estática de código com `oxlint`.

---

## 3. Tecnologias Utilizadas
* **Node.js**
* **NestJS v12.0.1** (`@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`)
* **TypeScript v6.0.2**
* **Vitest v4.1.2** (Suíte de testes automatizados e cobertura de código)
* **Oxlint v1.58.0** & **Prettier v3.4.2**

---

## 4. Arquitetura e Organização do Projeto

```text
22092026 - NESTJS/
├── src/
│   ├── alunos/
│   │   ├── alunos.controller.ts        # Controller HTTP de Alunos
│   │   ├── alunos.controller.spec.ts   # Testes unitários do controller de Alunos
│   │   ├── alunos.module.ts            # Módulo de cadastro e provisão de Alunos
│   │   ├── alunos.service.ts           # Regras de negócio de Alunos
│   │   └── alunos.service.spec.ts      # Testes unitários do serviço de Alunos
│   ├── professores/
│   │   ├── professores.controller.ts      # Controller HTTP de Professores
│   │   ├── professores.controller.spec.ts # Testes unitários do controller de Professores
│   │   ├── professores.module.ts          # Módulo de cadastro e provisão de Professores
│   │   ├── professores.service.ts         # Regras de negócio de Professores
│   │   └── professores.service.spec.ts    # Testes unitários do serviço de Professores
│   ├── app.controller.ts               # Controller raiz da aplicação
│   ├── app.module.ts                   # Módulo raiz agregador
│   ├── app.service.ts                  # Serviço raiz
│   └── main.ts                         # Bootstrap da aplicação NestJS
├── test/                               # Arquivos e configurações para testes E2E
├── nest-cli.json                       # Configurações de CLI do NestJS
├── oxlint.json                         # Configuração do linter Oxlint
├── tsconfig.json                       # Configurações do compilador TypeScript
├── vitest.config.ts                    # Configuração do runner de testes Vitest
├── vitest.config.e2e.ts                # Configuração para testes E2E no Vitest
├── package.json                        # Scripts e dependências do projeto
└── README.md                           # Documentação do projeto
```

---

## 5. Pré-requisitos
Antes de executar o projeto, certifique-se de possuir instalado:

* **Node.js** (v18 ou superior);
* **npm**, **yarn** ou **pnpm**;
* **Git**.

---

## 6. Instalação

### 6.1 Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-projeto.git
```

### 6.2 Acesse a pasta do projeto
```bash
cd "22092026 - NESTJS"
```

### 6.3 Instale as dependências
```bash
npm install
```

---

## 7. Configuração das Variáveis de Ambiente
Nesta etapa, os serviços de alunos e professores utilizam estruturas de dados configuradas no próprio escopo dos serviços do NestJS. Caso a aplicação necessite de portas personalizadas, utilize a variável de ambiente `PORT`.

---

## 8. Execução do Projeto

### Ambiente de desenvolvimento (Hot-reload)
```bash
npm run start:dev
```

### Build da aplicação
```bash
npm run build
```

### Ambiente de produção
```bash
npm run start:prod
```

Após iniciar a aplicação, a API estará acessível em:
[http://localhost:3000](http://localhost:3000)

---

## 9. Endpoints da API

### Módulo Alunos (`/alunos`)
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/alunos` | Lista todos os alunos |
| `GET` | `/alunos/:id` | Busca um aluno por ID (valida via `ParseIntPipe`) |
| `POST` | `/alunos` | Cria um novo aluno |
| `PUT` | `/alunos/:id` | Atualiza o aluno por ID |
| `DELETE` | `/alunos/:id` | Remove o aluno por ID |

### Módulo Professores (`/professores`)
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/professores` | Lista todos os professores |
| `GET` | `/professores/:id` | Busca um professor por ID (valida via `ParseIntPipe`) |
| `POST` | `/professores` | Cria um novo professor |
| `PUT` | `/professores/:id` | Atualiza o professor por ID |
| `DELETE` | `/professores/:id` | Remove o professor por ID |

---

## 10. Exemplos de Requisição e Resposta

### 10.1 Criar Professor (`POST /professores`)
**Requisição:**
`POST /professores`
`Content-Type: application/json`
```json
{
  "nome": "Professor Alan Turing",
  "disciplina": "Algoritmos e Estruturas de Dados"
}
```

**Resposta (`201 Created`):**
```json
{
  "id": 1,
  "nome": "Professor Alan Turing",
  "disciplina": "Algoritmos e Estruturas de Dados"
}
```

---

## 11. Autenticação
Não há camada de autenticação obrigatória nesta etapa do projeto. Todos os endpoints são abertos.

---

## 12. Tratamento de Erros
O NestJS possui uma camada global de tratamento de exceções (Global Exception Filter). Se uma string for enviada onde um ID numérico é esperado (ex: `/alunos/abc`), o `ParseIntPipe` intercepta e retorna status HTTP 400 automaticamente.

### Principais códigos HTTP utilizados:
* **200 — OK**: Leitura, alteração ou exclusão realizada com sucesso.
* **201 — Created**: Recurso (Aluno ou Professor) criado com sucesso.
* **400 — Bad Request**: Falha de validação no `ParseIntPipe` ou payload malformado.
* **404 — Not Found**: Recurso não localizado.
* **500 — Internal Server Error**: Erro genérico no servidor.

---

## 13. Testes

O projeto conta com suítes de testes automatizados configurados no Vitest:

### Executar testes unitários
```bash
npm run test
```

### Executar testes no modo watch (desenvolvimento)
```bash
npm run test:watch
```

### Gerar relatório de cobertura de testes (Coverage)
```bash
npm run test:cov
```

### Executar testes de integração / E2E
```bash
npm run test:e2e
```

---

## 14. Documentação da API
A documentação completa das rotas e contratos dos módulos `Alunos` e `Professores` está disponível neste arquivo `README.md`.

---

## 15. Modelo de Dados

### Entidade: Aluno
```text
Aluno
├── id (number)
├── nome (string)
└── curso (string)
```

### Entidade: Professor
```text
Professor
├── id (number)
├── nome (string)
└── disciplina (string)
```

---

## 16. Regras de Negócio
* O identificador `:id` em todas as rotas deve ser obrigatoriamente conversível para número inteiro através do `ParseIntPipe`.
* A injeção de dependências dos serviços (`AlunosService` e `ProfessoresService`) nos seus respectivos controllers é realizada automaticamente pelo container IoC do NestJS.

---

## 17. Extras — Programação Web 2
* **NestJS 12 Dependency Injection**: Provisão desacoplada de dependências usando injetores nativos do NestJS.
* **Testes Automatizados com Vitest**: Substituição do Jest pelo Vitest para maior velocidade na execução dos testes unitários e E2E.
* **Nest Pipes (`ParseIntPipe`)**: Sanitização e transformação automática de tipos de parâmetros na camada de controle.
* **Linter de Alta Velocidade (Oxlint)**: Verificação estática de código ultrarrápida configurada no `oxlint.json`.

---

## 18. Versionamento e Organização das Branches
O desenvolvimento das atividades da disciplina segue o padrão de versionamento estabelecido.

Branch da semana:
```text
branch_20260922
```

Fluxo esperado:
```text
main
  │
  └── branch_20260922
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
