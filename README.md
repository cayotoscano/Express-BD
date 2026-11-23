# DevFlix

Projeto dividido entre a aplicação React + Vite em `frontend/` e a API NestJS
12 + Prisma 7 em `backend/`. O PostgreSQL 17 de desenvolvimento é iniciado pelo
Docker Compose da raiz.

## Pré-requisitos

- Node.js 24 LTS (24.15 ou superior na linha 24) e npm
- Docker Desktop ou Docker Engine com Docker Compose V2
- Opcional: `psql` para executar comandos SQL diretamente

## Estrutura

```text
devflix/
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   │   ├── 20261123180000_baseline_categories/
│   │   │   └── 20261123200600_add_courses_lessons/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── categories/
│   │   ├── courses/
│   │   ├── generated/prisma/   # gerado por `npm run db:generate`
│   │   ├── health/
│   │   └── prisma/
│   ├── .env.example
│   └── prisma.config.ts
└── docker-compose.yml
```

## Primeira configuração do backend

O comando de scaffold abaixo documenta como iniciar o projeto Nest em um
diretório DevFlix vazio. A estrutura deste repositório já contém o backend
configurado; não rode o comando sobre essa pasta existente.

```bash
# Na pasta que conterá o projeto devflix:
npx @nestjs/cli@12 new backend --package-manager npm
```

Ao responder ao CLI, selecione **ESM** e não habilite NestJS Observe. O projeto
atual já usa ESM.

Para criar e iniciar um projeto Nest recém-gerado:

```bash
cd backend
npm run start:dev
```

Abra `http://localhost:3000` para conferir a resposta inicial `Hello World!`.
Após adicionar os módulos DevFlix, use `/health` e `/categories`.

## PostgreSQL e Prisma

Na raiz `devflix/`, inicie e confira o PostgreSQL:

```bash
docker compose up -d
docker compose ps
```

O serviço publica a porta somente em `127.0.0.1:5432`. A senha `devflix123`
serve exclusivamente para desenvolvimento local; não a use em produção.

Crie o arquivo local `backend/.env` copiando `backend/.env.example`. Esse `.env`
está no `.gitignore` e não deve ser versionado:

```env
DATABASE_URL="postgresql://devflix:devflix123@localhost:5432/devflix_db?schema=public"
PORT=3000
```

Comandos de instalação e inicialização (os pacotes do Prisma 7 já constam no
`package.json`):

```bash
cd backend
npm install
npm install @prisma/client@7 @prisma/adapter-pg@7 pg dotenv
npm install -D prisma@7 @types/pg
npm install @nestjs/config
npx prisma init --datasource-provider postgresql
npm run db:generate
npx prisma migrate dev --name init
npx prisma generate
```

O `prisma.config.ts` e `schema.prisma` incluídos já configuram a localização
dos arquivos, PostgreSQL e URL de conexão. Se rodar `prisma init`, preserve
essas configurações. O seed é idempotente e registra as três categorias:

```bash
npm run db:seed
```

Alternativamente, para cadastrar os dados no `psql` ou Prisma Studio:

```sql
INSERT INTO "Category" ("name", "slug", "createdAt", "updatedAt")
VALUES
  ('Desenvolvimento Frontend', 'frontend', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Desenvolvimento Backend', 'backend', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Banco de Dados', 'banco-de-dados', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("slug") DO UPDATE
SET "name" = EXCLUDED."name", "updatedAt" = CURRENT_TIMESTAMP;
```

Para iniciar a API em modo de desenvolvimento:

```bash
npm run start:dev
```

O endpoint de categorias responde em `http://localhost:3000/categories`.

## Comandos do CLI Nest

Estes comandos geram os módulos e arquivos usados pelo backend:

```bash
npx nest generate module prisma
npx nest generate service prisma --no-spec
npx nest generate module health
npx nest generate controller health --no-spec
npx nest generate service health --no-spec
npx nest generate module categories
npx nest generate controller categories --no-spec
npx nest generate service categories --no-spec
```

Os arquivos gerados já estão implementados neste repositório. Não é necessário
executar os geradores novamente.

## Testes, build e inspeção

Na pasta `backend/`:

```bash
npm run test
npm run build
npx prisma generate
npx prisma studio
```

O Prisma Studio abre em `http://localhost:5555`. O teste em
`src/health/health.controller.spec.ts` é unitário: usa `vi.fn()` para mockar
`HealthService.check()` e não conecta ao PostgreSQL. Para usar Jest, adapte o
mock para `jest.fn()` e execute-o pelo runner do Jest.

Verificações HTTP:

```bash
curl -i http://localhost:3000/health
curl -i http://localhost:3000/categories
```

Com `psql`, conecte ao container e consulte o banco:

```bash
docker exec -it devflix-postgres psql -U devflix -d devflix_db
```

No prompt do `psql`:

```sql
SELECT current_database();
\dt
SELECT * FROM "Category";
\q
```

## Executar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Para preparar os arquivos de produção, rode `npm run build`; `npm run preview`
serve localmente essa build.

## Troubleshooting

- **`P1001: Can't reach database server`:** confira `docker compose ps`, aguarde
  o healthcheck e veja `docker compose logs postgres`. Verifique também se a URL
  em `backend/.env` aponta para `localhost:5432`.
- **`EADDRINUSE: 3000`:** encerre o processo que ocupa a porta ou configure
  outra `PORT` em `backend/.env`.
- **`Cannot find module generated/prisma`:** no diretório `backend/`, confira
  `.env` e rode `npm run db:generate` (ou `npx prisma generate`).
- **`DATABASE_URL` não definida:** copie `backend/.env.example` para
  `backend/.env`; execute comandos Prisma a partir de `backend/`, onde fica
  `prisma.config.ts`.
- **`PrismaClient requires an adapter`:** use o Prisma Client gerado neste
  projeto e `PrismaPg` de `@prisma/adapter-pg`; rode `npm install` e
  `npm run db:generate`.
- **Erro de importação ESM:** mantenha `"type": "module"` no package e use a
  extensão `.js` nos imports relativos TypeScript, por exemplo
  `./health.service.js`.
- **Falha de autenticação PostgreSQL após alterar variáveis do Compose:** o
  PostgreSQL mantém as credenciais iniciais no volume. Alterar
  `POSTGRES_PASSWORD` não troca a senha de um banco já inicializado; use a senha
  já existente ou altere-a dentro do PostgreSQL conscientemente. Consulte
  `docker compose logs postgres`.
- Rode `npm run build` para encontrar erros de TypeScript/configuração.
- Não use `docker compose down -v` como primeira tentativa: `-v` apaga o volume
  nomeado e os dados persistidos do banco.

## Adaptar para MySQL

É possível adaptar o projeto para MySQL: troque a imagem/serviço no Compose,
ajuste a `DATABASE_URL`, mude `provider` no schema Prisma para `mysql` e use o
driver adapter apropriado (por exemplo, o adapter MySQL suportado pela versão
do Prisma adotada). Recrie/aplique as migrações no banco correspondente.

## Tutorial 4 — Cursos e aulas

O schema agora relaciona categorias, cursos e aulas. Cursos pertencem a uma
categoria (`ON DELETE RESTRICT`), enquanto as aulas pertencem a um curso
(`ON DELETE CASCADE`). O seed usa `upsert` por slug e pela chave composta
`courseId_position`, podendo ser executado novamente sem duplicar registros.

Na raiz `devflix/`, suba e confira o PostgreSQL:

```bash
docker compose up -d
docker compose ps
```

No backend, valide o schema, aplique a migration incremental e gere o client:

```bash
cd backend
npx prisma validate
npx prisma migrate dev --name add_courses_lessons
npx prisma generate
```

Os endpoints `GET /courses` e `GET /courses/:id` incluem categoria e aulas
ordenadas por posição. Um ID numérico inexistente retorna HTTP 404; um ID que
não seja número retorna HTTP 400 pelo `ParseIntPipe`.

**Banco anterior sem histórico de migrations:** não apague nem resete o banco.
Este repositório inclui uma migration baseline para `Category` e outra
incremental para cursos e aulas. Se a tabela `Category` já existe, mas
`_prisma_migrations` ainda não existe (por exemplo, foi criada com `db push`),
marque somente a baseline como aplicada antes do comando incremental:

```bash
npx prisma migrate resolve --applied 20261123180000_baseline_categories
npx prisma migrate dev --name add_courses_lessons
```

Se o banco já tem histórico de migrations, mantenha e use esse histórico
existente; não marque uma baseline adicional. Antes de rodar, compare os
diretórios de migrations com `_prisma_migrations`. O `migrate resolve` registra
o estado atual, não executa a migration baseline, e só deve ser usado depois
de confirmar que as tabelas `Category` existentes correspondem a ela. As
migrations adicionam tabelas e relações, sem recriar nem apagar categorias.

Para inspecionar as tabelas no PostgreSQL:

```bash
docker exec -it devflix-postgres psql -U devflix -d devflix_db
```

No prompt do `psql`:

```sql
\dt
\d "Course"
\d "Lesson"
\q
```

Instale/garanta `tsx` como ferramenta de desenvolvimento e execute o seed duas
vezes para conferir que ele é idempotente:

```bash
npm install -D tsx
npx prisma db seed
npx prisma db seed
```

O `prisma.config.ts` registra o seed para `prisma db seed`. O seed mantém as
três categorias existentes e cria/atualiza os cursos publicados React para
Iniciantes, Node.js para Iniciantes e Fundamentos de SQL, junto com suas aulas.

O módulo `Courses` está no projeto. Para reproduzir sua geração em um backend
vazio, estes são os comandos do CLI (não os rode novamente neste projeto):

```bash
npx nest generate module courses
npx nest generate controller courses --no-spec
npx nest generate service courses --no-spec
```

Inicie a API e teste os resultados esperados:

```bash
npm run start:dev
curl -i http://localhost:3000/courses
curl -i http://localhost:3000/courses/1
curl -i http://localhost:3000/courses/999999
curl -i http://localhost:3000/courses/abc
npm run build
npm run test
```

Uma lista vazia antes de executar o seed é possível; após o seed, os três
cursos devem ser listados. IDs são autoincrementais, então use o ID efetivo
retornado por `/courses` para consultar um curso específico.
O teste unitário de `src/courses/courses.service.spec.ts` cobre listagem,
consulta por ID e curso inexistente com Prisma mockado.

Consultas para executar no `psql`:

```sql
SELECT c."id", c."title", c."slug", cat."name" AS "category"
FROM "Course" c
INNER JOIN "Category" cat ON cat."id" = c."categoryId"
ORDER BY c."title";

SELECT l."title" AS "lesson", l."position", c."title" AS "course"
FROM "Lesson" l
INNER JOIN "Course" c ON c."id" = l."courseId"
ORDER BY c."title", l."position";

SELECT c."id", c."title", COUNT(l."id") AS "lessonCount"
FROM "Course" c
LEFT JOIN "Lesson" l ON l."courseId" = c."id"
GROUP BY c."id", c."title"
ORDER BY c."title";
```

Teste a integridade referencial tentando inserir um curso com categoria
inexistente; o PostgreSQL deve rejeitar a linha com erro de chave estrangeira
(SQLSTATE `23503`):

```sql
INSERT INTO "Course"
  ("title", "slug", "description", "published", "createdAt", "updatedAt", "categoryId")
VALUES
  ('Curso inválido', 'curso-categoria-inexistente', 'Teste de chave estrangeira',
   false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 999999);
```

### Problemas comuns no Tutorial 4

- **`P1001: Can't reach database server`:** confirme `docker compose ps`,
  aguarde o healthcheck e consulte `docker compose logs postgres`.
- **`P2002`:** violação de valor único; confira slugs duplicados ou uma aula
  tentando repetir `position` no mesmo curso. O seed resolve os registros por
  `upsert`; não altere os slugs de forma inconsistente.
- **`P2003`:** violação de chave estrangeira; use um `categoryId` existente
  para o curso e um `courseId` existente para a aula.
- **`Property 'course' does not exist on PrismaService`:** verifique o schema,
  rode `npx prisma generate` em `backend/` e reinicie o servidor Nest.
- **`Cannot find module generated/prisma/client.js`:** gere o Prisma Client
  com `npx prisma generate` e confirme o caminho/output ESM do generator.
- **Seed não executa:** confirme `backend/.env`, `DATABASE_URL`, a entrada
  `migrations.seed` em `prisma.config.ts`, a instalação do `tsx` e rode
  `npx prisma db seed` a partir de `backend/`.
- **API retorna array vazio:** aplique as migrations, execute
  `npx prisma db seed` e confirme os dados com `SELECT * FROM "Course";`.
- **Drift de migration:** pare e investigue diferenças entre o schema,
  migrations existentes e `_prisma_migrations`; faça backup e corrija a
  migration/histórico cuidadosamente. Não descarte tabelas para contornar o
  erro.
- **Não rode `npx prisma migrate reset` sem investigar antes.** Esse comando
  apaga os dados do banco; prefira entender o drift e corrigir o histórico sem
  perda de dados.
