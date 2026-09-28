# API REST com Express — Introdução (04/08/2026)

API RESTful desenvolvida para introdução ao desenvolvimento de aplicações backend utilizando Node.js e o framework Express.

---

## 1. Descrição
Esta API foi desenvolvida para servir como ponto de partida no aprendizado de serviços web HTTP, estabelecendo a estrutura mínima para recebimento e resposta de requisições web.

* **Objetivo da API**: Demonstrar a criação de um servidor HTTP funcional em Node.js com Express e ES Modules (`import`/`export`).
* **Problema que pretende resolver**: Simplificar a transição do desenvolvimento estático/frontend para o desenvolvimento de rotas e servidores no ambiente Node.js.
* **Consumidores**: Desenvolvedores e estudantes de backend, aplicações clientes (Web/Mobile) ou ferramentas de teste de requisições HTTP (Postman, Insomnia, cURL, Navegador).
* **Contexto de Utilização**: Ambiente acadêmico da Unidade Curricular Programação Web 2 (Senac RJ).

---

## 2. Funcionalidades
* Inicialização de servidor HTTP na porta 3000;
* Rota raiz para verificação do status da aplicação;
* Execução em modo de desenvolvimento com recarregamento automático (Nodemon);
* Modularização da aplicação separando as rotas da inicialização do servidor.

---

## 3. Tecnologias Utilizadas
* **Node.js** (Ambiente de execução JavaScript no servidor)
* **Express v5.2.1** (Framework web minimalista para Node.js)
* **JavaScript (ES Modules)**
* **Nodemon v3.1.14** (Ferramenta de desenvolvimento para auto-reload)

---

## 4. Arquitetura e Organização do Projeto
O projeto utiliza uma estrutura desacoplada simples, dividindo a inicialização da escuta de porta do objeto da aplicação Express:

```text
04082026 - NodeExpress/
├── src/
│   └── app.js          # Configuração da instância da aplicação e definição de rotas
├── server.js           # Ponto de entrada (Bootstrapping do servidor HTTP)
├── package.json        # Gerenciamento de dependências e scripts de execução
├── package-lock.json   # Lockfile de versões exatas de dependências
└── README.md           # Documentação do projeto
```

* **`src/app.js`**: Instancia o aplicativo Express, define a rota inicial e exporta o módulo `app`.
* **`server.js`**: Importa a instância de `app`, define a porta de rede (`3000`) e coloca o servidor em escuta.

---

## 5. Pré-requisitos
Antes de executar o projeto, verifique se você possui os seguintes programas instalados:

* **Node.js** (versão 18.x ou superior recomendada);
* **npm** (incluso com a instalação do Node.js);
* **Git** (para clonar e gerenciar versões).

---

## 6. Instalação

### 6.1 Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-projeto.git
```

### 6.2 Acesse a pasta do projeto
```bash
cd "04082026 - NodeExpress"
```

### 6.3 Instale as dependências
```bash
npm install
```

---

## 7. Configuração das Variáveis de Ambiente
Nesta etapa inicial do projeto, não são utilizadas variáveis de ambiente sensíveis nem conexões de banco de dados. A porta da aplicação está definida por padrão como `3000` diretamente no arquivo `server.js`.

Para etapas futuras, variáveis podem ser adicionadas criando um arquivo `.env` na raiz.

---

## 8. Execução do Projeto

### Ambiente de desenvolvimento
Para rodar a aplicação em modo de desenvolvimento com hot-reload automático via Nodemon:
```bash
npm run dev
```

### Ambiente de produção
Para iniciar o servidor diretamente com o ambiente de execução do Node.js:
```bash
node server.js
```

Após iniciar a aplicação, a API estará acessível no endereço padrão:
[http://localhost:3000](http://localhost:3000)

---

## 9. Endpoints da API

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Retorna uma mensagem de boas-vindas confirmando o funcionamento da API REST |

---

## 10. Exemplos de Requisição e Resposta

### Exemplo de requisição
`GET /`

### Exemplo de resposta
```text
Minha API REST com Express
```

---

## 11. Autenticação
A API não possui mecanismos de autenticação aplicados nesta etapa inicial. Todos os endpoints são públicos e abertos para consulta.

---

## 12. Tratamento de Erros
O tratamento de erros nesta etapa conta com os manipuladores nativos do framework Express.

### Principais códigos HTTP utilizados:
* **200 — OK**: Requisição processada com sucesso.
* **404 — Not Found**: Rota solicitada não encontrada pelo roteador do Express.
* **500 — Internal Server Error**: Erro não tratado durante a execução da requisição.

---

## 13. Testes
Nesta etapa inicial, os testes de rotas podem ser realizados via navegador ou utilitários HTTP como Postman, Insomnia ou cURL.

Exemplo via cURL:
```bash
curl http://localhost:3000/
```

---

## 14. Documentação da API
A documentação da API é disponibilizada através das especificações contidas neste arquivo `README.md`.

---

## 15. Modelo de Dados
Esta etapa do projeto não utiliza entidades persistentes nem tabelas em banco de dados.

---

## 16. Regras de Negócio
* O servidor deve responder com status HTTP 200 ao receber requisições do tipo GET na rota raiz `/`.
* A aplicação utiliza suporte nativo a módulos ES (`"type": "module"` no `package.json`).

---

## 17. Extras — Programação Web 2
* **Nodemon com auto-reload**: Configuração de scripts no `package.json` para agilizar o fluxo de desenvolvimento backend sem necessidade de reiniciar manualmente a aplicação.
* **Arquitetura modular em ES Modules**: Separação clara entre a lógica da aplicação (`src/app.js`) e a inicialização de escuta da porta (`server.js`).

---

## 18. Versionamento e Organização das Branches
O desenvolvimento das atividades da Unidade Curricular segue o padrão de versionamento estabelecido.

Branch da semana:
```text
branch_20260804
```

Fluxo esperado:
```text
main
  │
  └── branch_20260804
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
O código poderá ser utilizado para avaliação e acompanhamento acadêmico durante o curso.
