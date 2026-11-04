# API de Gestão Escolar

API RESTful acadêmica para gerenciar alunos, cursos, professores e disciplinas, com persistência em MySQL.

## 1. Descrição

A API centraliza operações de cadastro, consulta, atualização e remoção de dados acadêmicos. Ela pode ser consumida por aplicações web, clientes HTTP ou outras aplicações que precisem acessar informações da estrutura escolar.

O projeto foi desenvolvido no contexto da Unidade Curricular Programação Web 2.

## 2. Funcionalidades

- CRUD de alunos, cursos, professores e disciplinas;
- Consulta de alunos por curso, usando o nome exato do curso como filtro;
- Associação de cada aluno a um curso;
- Associação de professores a uma ou mais disciplinas;
- Validação de tipos, campos obrigatórios, formatos e limites definidos nos DTOs;
- Tratamento de recursos inexistentes com respostas HTTP 404;
- Validação global de requisições com `ValidationPipe`.

## 3. Tecnologias Utilizadas

- **Node.js** e **TypeScript**;
- **NestJS 12** para a aplicação HTTP e injeção de dependências;
- **Prisma 7** para acesso e geração do cliente de banco de dados;
- **MySQL 8.4**, com o adaptador `@prisma/adapter-mariadb`;
- **class-validator** e **class-transformer** para validação e transformação de dados;
- **Vitest** e **Supertest** para testes;
- **Docker Compose** para executar o MySQL localmente;
- **Oxlint** e **Prettier** para lint e formatação.

## 4. Arquitetura e Organização do Projeto

```text
src/
├── alunos/
│   ├── dto/
│   ├── alunos.controller.ts
│   ├── alunos.service.ts
│   └── alunos.repository.ts
├── cursos/
├── disciplinas/
├── professores/
├── prisma/
├── app.module.ts
└── main.ts
prisma/
└── schema.prisma
test/
└── app.e2e-spec.ts
bruno/
├── Alunos/
├── Cursos/
├── Disciplina/
└── Professores/
```

- `*.controller.ts` recebe requisições HTTP e encaminha as operações;
- `*.service.ts` coordena as operações e trata recursos não encontrados;
- `*.repository.ts` realiza consultas e alterações por meio do Prisma;
- `dto/` define os formatos e as validações dos dados recebidos;
- `src/prisma/` configura o cliente Prisma usado pela aplicação;
- `prisma/schema.prisma` define as entidades e seus relacionamentos;
- `bruno/` contém coleções de requisições para testar os recursos;
- `test/` e arquivos `*.spec.ts` contêm testes automatizados.

## 5. Pré-requisitos

- Node.js e npm em versões compatíveis com NestJS 12 e Prisma 7;
- MySQL 8.4 ou Docker com Docker Compose;
- Git para clonar o repositório e seguir o fluxo de branches acadêmico.

## 6. Instalação

### 6.1. Clone o repositório

Substitua o endereço abaixo pela URL do repositório do projeto:

```bash
git clone <URL_DO_REPOSITORIO>
cd <PASTA_DO_PROJETO>
```

### 6.2. Instale as dependências

```bash
npm install
```

### 6.3. Inicie o banco local com Docker

Na raiz do projeto:

```bash
docker compose up -d
```

O Compose inicia o MySQL na porta `3306`. As credenciais configuradas nele são destinadas somente ao ambiente local de desenvolvimento.

## 7. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz, usando `.env.example` como referência. Para usar o banco definido em `docker-compose.yml`, configure:

```dotenv
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=api_user
DB_PASSWORD=api123
DB_NAME=api_rest
DATABASE_URL="mysql://api_user:api123@localhost:3306/api_rest"
```

`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` e `DB_NAME` são usados pela API. `DATABASE_URL` é usado pela configuração do Prisma CLI. Se as credenciais do Compose forem alteradas, atualize os valores correspondentes no `.env`.

O `.gitignore` exclui arquivos `.env` e mantém `.env.example` versionável. Não armazene credenciais reais ou dados sensíveis no repositório. As credenciais do Compose são públicas e servem apenas para desenvolvimento local; não as reutilize em produção.

## 8. Execução do Projeto

Gere o Prisma Client e sincronize o schema com o banco de desenvolvimento:

```bash
npx prisma generate
npx prisma db push
```

Inicie a API em modo de desenvolvimento:

```bash
npm run start:dev
```

A aplicação ficará disponível, por padrão, em `http://localhost:3000`. A porta pode ser alterada pela variável `PORT`.

Para iniciar a aplicação compilada:

```bash
npm run build
npm run start:prod
```

## 9. Endpoints da API

Todas as rotas abaixo são relativas a `http://localhost:3000`.

### Raiz

| Método | Endpoint | Descrição | Resposta de sucesso |
| --- | --- | --- | --- |
| `GET` | `/` | Verifica a rota raiz da aplicação | `200` |

### Alunos

| Método | Endpoint | Descrição | Resposta de sucesso |
| --- | --- | --- | --- |
| `GET` | `/alunos` | Lista alunos; aceita o filtro opcional `?curso=Nome do curso` | `200` |
| `GET` | `/alunos/:id` | Busca um aluno pelo ID | `200` |
| `POST` | `/alunos` | Cadastra um aluno | `201` |
| `PATCH` | `/alunos/:id` | Atualiza parcialmente um aluno | `200` |
| `DELETE` | `/alunos/:id` | Exclui um aluno | `204` |

### Cursos

| Método | Endpoint | Descrição | Resposta de sucesso |
| --- | --- | --- | --- |
| `GET` | `/cursos` | Lista cursos | `200` |
| `GET` | `/cursos/:id` | Busca um curso pelo ID | `200` |
| `POST` | `/cursos` | Cadastra um curso | `201` |
| `PATCH` | `/cursos/:id` | Atualiza parcialmente um curso | `200` |
| `DELETE` | `/cursos/:id` | Exclui um curso | `204` |

### Professores

| Método | Endpoint | Descrição | Resposta de sucesso |
| --- | --- | --- | --- |
| `GET` | `/professores` | Lista professores e suas disciplinas | `200` |
| `GET` | `/professores/:id` | Busca um professor pelo ID | `200` |
| `POST` | `/professores` | Cadastra um professor com disciplinas associadas | `201` |
| `PATCH` | `/professores/:id` | Atualiza parcialmente os dados e, opcionalmente, as disciplinas | `200` |
| `DELETE` | `/professores/:id` | Exclui um professor | `204` |

### Disciplinas

| Método | Endpoint | Descrição | Resposta de sucesso |
| --- | --- | --- | --- |
| `GET` | `/disciplinas` | Lista disciplinas e professores associados | `200` |
| `GET` | `/disciplinas/:id` | Busca uma disciplina pelo ID | `200` |
| `POST` | `/disciplinas` | Cadastra uma disciplina | `201` |
| `PATCH` | `/disciplinas/:id` | Atualiza parcialmente uma disciplina | `200` |
| `DELETE` | `/disciplinas/:id` | Exclui uma disciplina | `204` |

Os IDs das rotas devem ser inteiros. Não há endpoint `PUT` implementado; as atualizações parciais usam `PATCH`.

## 10. Exemplos de Requisição e Resposta

Cadastre um curso:

```http
POST /cursos
Content-Type: application/json
```

```json
{
  "nome": "Análise e Desenvolvimento de Sistemas"
}
```

Exemplo de resposta (`201 Created`):

```json
{
  "id": 1,
  "nome": "Análise e Desenvolvimento de Sistemas"
}
```

Cadastre um aluno usando o ID de um curso existente:

```http
POST /alunos
Content-Type: application/json
```

```json
{
  "nome": "Maria Silva",
  "email": "maria@example.com",
  "cursoId": 1
}
```

Filtre alunos pelo nome exato do curso:

```http
GET /alunos?curso=Análise%20e%20Desenvolvimento%20de%20Sistemas
```

Cadastre um professor associado a disciplinas existentes:

```http
POST /professores
Content-Type: application/json
```

```json
{
  "nome": "João Santos",
  "disciplinaIds": [1, 2]
}
```

## 11. Autenticação

A API não implementa autenticação ou autorização. As rotas não exigem token; não há endpoints de login ou uso de JWT.

## 12. Tratamento de Erros

A aplicação utiliza os mecanismos padrão do NestJS. IDs inválidos e dados que não passam pela validação retornam `400 Bad Request`; recursos não encontrados retornam `404 Not Found`. Erros inesperados ou de persistência não tratados pela aplicação são respondidos pelo tratamento padrão do NestJS.

Exemplo de resposta para um recurso não encontrado:

```json
{
  "statusCode": 404,
  "message": "Recurso não encontrado",
  "error": "Not Found"
}
```

As operações de exclusão bem-sucedidas retornam `204 No Content`, sem corpo de resposta.

## 13. Testes

Execute os testes unitários:

```bash
npm run test
```

Execute os testes em modo observação ou com cobertura:

```bash
npm run test:watch
npm run test:cov
```

Execute os testes e2e:

```bash
npm run test:e2e
```

Os testes unitários existentes verificam a instanciação de serviços e do controller raiz. O teste e2e verifica `GET /` e a resposta `Hello World!`. Os testes atuais não cobrem todos os fluxos de CRUD.

## 14. Documentação da API

O projeto não possui Swagger ou outra documentação OpenAPI configurada. Os endpoints disponíveis estão listados neste README e as coleções de requisições estão na pasta `bruno/`.

## 15. Modelo de Dados

```text
Curso
├── id
├── nome
└── alunos: Aluno[]

Aluno
├── id
├── nome
├── email (único)
├── cursoId
└── curso: Curso

Professor
├── id
├── nome
└── disciplinas: Disciplina[]

Disciplina
├── id
├── nome
├── cargaHoraria
└── professores: Professor[]
```

Um curso pode estar associado a vários alunos; cada aluno referencia um curso. Professores e disciplinas possuem relacionamento muitos-para-muitos. O schema está definido em `prisma/schema.prisma`.

## 16. Regras de Negócio e Validação

1. Alunos devem ter nome não vazio com até 100 caracteres, e-mail válido com até 150 caracteres e `cursoId` inteiro maior ou igual a 1.
2. Cursos devem ter nome não vazio com até 100 caracteres.
3. Professores devem ter nome não vazio com até 100 caracteres e uma lista de IDs inteiros positivos de disciplinas.
4. Disciplinas devem ter nome não vazio com até 100 caracteres e `cargaHoraria` inteira.
5. O e-mail do aluno é único conforme a restrição do schema do banco.
6. Os DTOs de atualização tornam os campos opcionais. Em uma atualização de professor, omitir `disciplinaIds` mantém as associações; enviar uma lista vazia remove as associações existentes.
7. Propriedades sem validação declarada nos DTOs são removidas pela configuração global de validação.

## 17. Extras — Programação Web 2

- **Filtro de alunos por curso:** `GET /alunos?curso=...` retorna alunos associados ao curso com o nome informado.
- **Relacionamentos entre entidades:** as consultas de listagem de cursos incluem alunos; as consultas de professores e disciplinas incluem suas associações.
- **Banco local com Docker Compose:** o arquivo `docker-compose.yml` disponibiliza MySQL 8.4 para desenvolvimento.
- **Coleções Bruno:** há requisições organizadas por recurso na pasta `bruno/`.
- **Validação global:** `ValidationPipe` transforma os dados de entrada e aplica as regras dos DTOs.

Não há paginação, autenticação, upload de arquivos, integração externa ou deploy configurado no projeto.

## 18. Versionamento e Organização das Branches

Para cada semana, crie uma branch a partir de `main` no formato `branch_yyyymmdd`, por exemplo `branch_20260818`:

```bash
git switch main
git pull
git switch -c branch_yyyymmdd
```

Use commits com mensagens claras e relacionadas às alterações realizadas. Após concluir a atividade, integre a branch semanal à `main` conforme o fluxo definido para a turma.

## 19. Autor

**Nome:** Cayo Toscano  
**Turma:** 36129382024.2n  
**Unidade Curricular:** Programação Web 2 — Senac RJ

## 20. Licença e Uso Acadêmico

Projeto desenvolvido para fins acadêmicos na Unidade Curricular **Programação Web 2 — Senac RJ**. O `package.json` identifica o projeto como `UNLICENSED`; portanto, este README não concede uma licença pública de uso ou redistribuição.