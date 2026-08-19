# API REST — Gerenciamento de Alunos

Projeto de uma API REST para gerenciamento de alunos, utilizando **Node.js e Express**, com um banco de dados **MySQL executado em Docker**.

## Sobre o projeto

A aplicação foi desenvolvida para realizar operações básicas com alunos, como cadastrar, consultar, alterar e remover registros.

Nesta etapa, foi configurado um ambiente com **Docker e MySQL**, substituindo a necessidade de instalar o banco diretamente no computador. Os dados são armazenados em um volume do Docker para garantir sua persistência.

---

## Tecnologias

* Node.js
* Express
* JavaScript
* MySQL 8.4
* Docker
* Docker Compose

---

## Organização dos arquivos

```text
api-rest/
├── src/
│   └── app.js
├── docker-compose.yml
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Configuração do MySQL

O banco é criado automaticamente pelo Docker Compose com as seguintes configurações:

| Configuração | Valor            |
| ------------ | ---------------- |
| Banco        | `api_rest`       |
| Usuário      | `api_user`       |
| Senha        | `api123`         |
| Porta        | `3306`           |
| Container    | `mysql-api-rest` |

O banco possui a tabela `alunos`, formada por:

```text
id
nome
curso
```

O campo `id` é gerado automaticamente pelo MySQL.

---

## Como executar

Primeiramente, instale as dependências do projeto:

```bash
npm install
```

Depois, inicie o banco de dados:

```bash
docker compose up -d
```

Para confirmar que o container está funcionando:

```bash
docker ps
```

---

## Estrutura do banco

A tabela principal utilizada no projeto pode ser criada através do seguinte comando:

```sql
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    curso VARCHAR(100) NOT NULL
);
```

Exemplo de registro:

```sql
INSERT INTO alunos (nome, curso)
VALUES ('Bruno', 'ADS');
```

Para consultar os registros:

```sql
SELECT * FROM alunos;
```

---

## Rotas disponíveis

A API possui operações básicas de CRUD:

| Método | Rota         | Função                    |
| ------ | ------------ | ------------------------- |
| GET    | `/lista`     | Retorna todos os alunos   |
| GET    | `/lista/:id` | Busca um aluno específico |
| POST   | `/lista`     | Adiciona um aluno         |
| PUT    | `/lista/:id` | Altera um aluno           |
| DELETE | `/lista/:id` | Remove um aluno           |

### Exemplo de POST

```json
{
    "nome": "Maria",
    "curso": "ADS"
}
```

---

## Docker

O banco de dados é executado dentro de um container chamado:

```text
mysql-api-rest
```

O projeto também utiliza um volume para que os dados não sejam perdidos quando o container for removido.

Para parar os containers:

```bash
docker compose stop
```

Para removê-los:

```bash
docker compose down
```

Para remover os containers **e também os dados armazenados no volume**:

```bash
docker compose down -v
```

---

## Comandos úteis

Ver os containers ativos:

```bash
docker ps
```

Ver os containers do projeto:

```bash
docker compose ps
```

Ver os logs do MySQL:

```bash
docker compose logs mysql
```

Iniciar novamente os containers:

```bash
docker compose start
```

---

## O que foi desenvolvido nesta etapa

Nesta etapa do projeto foram realizados:

* Configuração do MySQL 8.4;
* Criação do banco `api_rest`;
* Criação do usuário para a aplicação;
* Configuração do Docker Compose;
* Criação do container MySQL;
* Configuração de porta `3306`;
* Criação de Docker Volume;
* Criação da tabela `alunos`;
* Inserção e consulta de registros utilizando SQL;
* Testes de persistência dos dados.

A conexão entre a API e o banco MySQL será realizada na próxima etapa.

---

## Versionamento

As atividades são desenvolvidas em branches separadas a partir da `main`.

O padrão utilizado é:

```text
branch_YYYYMMDD
```

Exemplo:

```text
branch_20260818
```

Após finalizar a atividade, as alterações podem ser integradas novamente à branch `main`.

---

## Autor

**Nome:** Cayo Toscano

**Unidade Curricular:** Programação Web 2

**Instituição:** Senac RJ

---

## Projeto acadêmico

Este projeto foi desenvolvido para fins acadêmicos na Unidade Curricular de **Programação Web 2 — Senac RJ**.
