# 🚗 Sistema de Aluguel de Carros

> Sistema web para apoio à gestão de aluguéis de automóveis, permitindo efetuar, consultar, modificar e cancelar pedidos de aluguel pela Internet, com autenticação obrigatória e análise de pedidos por agentes (empresas e bancos).

Projeto desenvolvido para o **Laboratório 02 (LAB02)** da disciplina **DIAW — Desenvolvimento e Integração de Aplicações Web**, do curso de **Engenharia de Software da PUC Minas**, sob orientação do **Prof. Dr. João Paulo Carneiro Aramuni**.

---

## 🚧 Status do Projeto

🟡 **Em desenvolvimento** — protótipo funcional (modelagem UML, autenticação, CRUD de cliente, catálogo de frota e protótipo de pedidos de aluguel).

---

## 📚 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Catálogo de Frota](#-catálogo-de-frota)
- [Modelagem (UML)](#-modelagem-uml)
- [Instalação e Execução](#-instalação-e-execução)
  - [Pré-requisitos](#pré-requisitos)
  - [Criando o banco no Supabase](#criando-o-banco-no-supabase)
  - [Variáveis de Ambiente](#variáveis-de-ambiente)
  - [Back-end (Spring Boot)](#back-end-spring-boot)
  - [Front-end (React + Vite)](#front-end-react--vite)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Demonstração (Endpoints da API)](#-demonstração-endpoints-da-api)
- [Testes](#-testes)
- [Documentações Utilizadas](#-documentações-utilizadas)
- [Autores](#-autores)
- [Contribuição](#-contribuição)
- [Agradecimentos](#-agradecimentos)
- [Licença](#-licença)

---

## 📝 Sobre o Projeto

O **Sistema de Aluguel de Carros** tem como objetivo apoiar a gestão de aluguéis de automóveis pela Internet. O sistema só pode ser utilizado após **cadastro prévio e autenticação** (login com usuário e senha).

- **Por que existe:** centralizar e informatizar o processo de solicitação, análise e contratação de aluguéis de automóveis.
- **Qual problema resolve:** elimina o controle manual de pedidos, oferecendo um fluxo claro desde a criação do pedido pelo cliente até a avaliação financeira pelos agentes e a execução do contrato.
- **Contexto:** acadêmico — trabalho da disciplina DIAW (PUC Minas).

Perfis de usuário:

- **Clientes** (usuários individuais): introduzem, modificam, consultam e cancelam pedidos de aluguel.
- **Agentes** (empresas e bancos): modificam e avaliam pedidos. Após a análise financeira, em caso de parecer positivo, o pedido é colocado à consideração para execução do contrato. Bancos podem conceder contratos de crédito associados ao aluguel.

Sobre os dados do domínio:

- **Contratante:** RG, CPF, Nome, Endereço, profissão, entidades empregadoras e respectivos rendimentos (**máximo 3**).
- **Automóvel:** matrícula, ano, marca, modelo e placa. Conforme o contrato, pode ser registrado como propriedade de clientes, empresas ou bancos.

---

## ✨ Funcionalidades Principais

- 🔐 **Autenticação obrigatória:** cadastro e login (usuário e senha) com JWT; acesso restrito a usuários cadastrados.
- 👤 **CRUD de Cliente:** criar, consultar, atualizar e remover clientes, incluindo as entidades empregadoras (máx. 3).
- 🚘 **Catálogo de frota:** vitrine de automóveis com cards modernos (paleta azul), filtro por categoria e foto real de cada modelo.
- 📄 **Pedidos de aluguel (protótipo):** criação e visualização do status do pedido (`CRIADO`, `EM_ANALISE`, `APROVADO`, `REPROVADO`, `CANCELADO`, `CONTRATADO`).
- 🧮 **Avaliação de pedidos (agentes):** emissão de parecer positivo/negativo pelos agentes.
- 🚙 **Cadastro de automóveis:** matrícula, ano, marca, modelo, placa, categoria, valor da diária e tipo de proprietário.
- 🌱 **Frota inicial (seed):** 12 veículos cadastrados automaticamente no primeiro start, caso o banco esteja vazio.
- 🛡️ **Controle de acesso por perfil:** ações de avaliação restritas ao perfil `AGENTE`.

---

## 🛠 Tecnologias Utilizadas

### 🖥️ Back-end

- **Linguagem/Runtime:** Java 25 (JDK 25)
- **Framework:** Spring Boot 4.0.x (arquitetura MVC em camadas)
- **Build e dependências:** Apache Maven
- **Persistência:** Spring Data JPA / Hibernate
- **Banco de Dados:** Supabase (PostgreSQL)
- **Autenticação:** Spring Security + JWT (jjwt), senhas com BCrypt

### 💻 Front-end

- **Biblioteca:** React 18
- **Build Tool:** Vite
- **Roteamento:** React Router DOM
- **HTTP:** Axios
- **Estilização:** CSS puro (Design System simples, paleta azul)
- **Imagens dos veículos:** CDN público [Imagin.studio](https://www.imagin.studio/) (renderização por marca/modelo), com fallback para ilustração SVG local

---

## 🏗 Arquitetura

O sistema segue o padrão **MVC em camadas** no back-end, separando responsabilidades entre apresentação (controllers), regras de negócio (services) e persistência (repositories). O front-end consome a API REST via HTTP/JSON.

```
Front-end (React + Vite)  --HTTP/REST-->  Back-end (Spring Boot - MVC)  -->  Supabase (PostgreSQL)
```

Camadas do back-end:

- **controller** — endpoints REST (camada de apresentação).
- **service** — regras de negócio (ex.: restrição de no máximo 3 empregadoras, transições de status do pedido).
- **repository** — acesso a dados via Spring Data JPA.
- **model** — entidades persistentes (JPA).
- **dto** — objetos de transferência de dados (entrada/saída da API).
- **security** — autenticação stateless via JWT (filtro, serviço de token, UserDetails).
- **config** — configurações de segurança e CORS.
- **exception** — tratamento centralizado de erros.

Decisões arquiteturais:

- **Autenticação própria (Spring Security + JWT)** com usuários armazenados no PostgreSQL do Supabase, mantendo toda a regra de login no back-end.
- **API stateless:** o token JWT é enviado no cabeçalho `Authorization: Bearer <token>`.
- **Supabase** é utilizado como banco PostgreSQL gerenciado, via conexão JDBC padrão (Session Pooler, compatível com IPv4).

---

## 🚘 Catálogo de Frota

A tela **Frota** apresenta os automóveis em cards modernos (paleta azul), com filtro por categoria e a **foto real** de cada modelo.

- **Frota inicial (seed):** na primeira inicialização do back-end, caso a tabela de automóveis esteja vazia, são cadastrados 12 veículos de exemplo. A frota foi inspirada nas categorias típicas de locadoras brasileiras (econômico, intermediário, sedã, SUV, premium e utilitário), usando modelos de veículos reais (ex.: Fiat Mobi, Renault Kwid, Chevrolet Onix, Hyundai HB20, Volkswagen Virtus, Toyota Corolla, Hyundai Creta, Jeep Compass, Fiat Strada).
- **Imagens:** as fotos são obtidas em tempo de execução do CDN público da Imagin.studio, a partir da marca e do modelo. Caso uma imagem não carregue (sem internet ou modelo indisponível no CDN), o card exibe automaticamente uma ilustração SVG como fallback.

> As marcas e modelos citados são apenas dos veículos de exemplo da frota; o projeto não representa nem utiliza a identidade visual oficial de nenhuma locadora específica.

---

## 📐 Modelagem (UML)

Os modelos UML estão em [`docs/uml`](docs/uml), em formato **PlantUML** (texto versionável):

| Artefato | Arquivo |
|---|---|
| Diagrama de Casos de Uso | [`01-casos-de-uso.puml`](docs/uml/01-casos-de-uso.puml) |
| Histórias de Usuário | [`02-historias-de-usuario.md`](docs/uml/02-historias-de-usuario.md) |
| Diagrama de Classes | [`03-diagrama-de-classes.puml`](docs/uml/03-diagrama-de-classes.puml) |
| Diagrama de Pacotes (Visão Lógica) | [`04-diagrama-de-pacotes.puml`](docs/uml/04-diagrama-de-pacotes.puml) |

> Para visualizar os `.puml`: use a extensão *PlantUML* no VS Code ou cole o conteúdo em <https://www.plantuml.com/plantuml>.

---

## 🔧 Instalação e Execução

Este projeto é executado **localmente** (sem deploy em produção no momento). São necessários dois terminais: um para o back-end e outro para o front-end.

### Pré-requisitos

- **Java JDK 25** (ou superior)
- **Apache Maven** (o projeto também inclui o Maven Wrapper `mvnw`)
- **Node.js** (v18+; o projeto foi testado com Node 24) e **npm**
- Uma conta gratuita no **[Supabase](https://supabase.com)**

### Criando o banco no Supabase

1. Acesse <https://supabase.com> e faça login.
2. Clique em **New project**, defina um nome (ex.: `aluguel-carros`), **crie e guarde a senha do banco** e escolha a região.
3. Aguarde o provisionamento do projeto (1–2 minutos).
4. Vá em **Project Settings → Database → Connection string**, aba **JDBC**, e copie a string (algo como `jdbc:postgresql://db.<ref>.supabase.co:5432/postgres`).

> As tabelas são criadas automaticamente pelo Hibernate (`spring.jpa.hibernate.ddl-auto=update`) no primeiro start do back-end. Não é necessário rodar migrações manuais.

### Variáveis de Ambiente

**Back-end** — copie `backend/.env.example` para `backend/.env` e preencha:

```env
SERVER_PORT=8080
SPRING_DATASOURCE_URL=jdbc:postgresql://db.SEU_PROJETO.supabase.co:5432/postgres
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=sua-senha-do-banco
JWT_SECRET=troque-esta-chave-por-uma-chave-secreta-bem-longa-para-hs256
APP_CORS_ALLOWED_ORIGINS=http://localhost:5173
```

**Front-end** — copie `frontend/.env.example` para `frontend/.env`:

```env
VITE_API_URL=http://localhost:8080/api
```

### Back-end (Spring Boot)

```bash
cd backend
# Windows:
mvnw.cmd spring-boot:run
# Linux/Mac:
./mvnw spring-boot:run
```

A API estará disponível em **http://localhost:8080**.

### Front-end (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

O front-end estará disponível em **http://localhost:5173**.

> ⚠️ No Windows, se o PowerShell bloquear scripts npm, utilize o prompt `cmd` ou execute os comandos com `npm.cmd`.

---

## 📂 Estrutura de Pastas

```
.
├── docs/
│   └── uml/                     # 📐 Modelos UML (PlantUML + histórias de usuário)
│
├── backend/                     # 📁 API Spring Boot (arquitetura MVC)
│   ├── .env.example             # 🧩 Exemplo de variáveis de ambiente
│   ├── pom.xml                  # 🛠️ Build e dependências (Maven)
│   ├── mvnw / mvnw.cmd          # 🔧 Maven Wrapper
│   └── src/main/
│       ├── java/br/pucminas/diaw/aluguelcarros/
│       │   ├── controller/      # 🎮 Endpoints REST
│       │   ├── service/         # ⚙️ Regras de negócio
│       │   ├── repository/      # 🗄️ Repositórios (JPA)
│       │   ├── model/           # 🧬 Entidades persistentes + enums
│       │   ├── dto/             # ✉️ Data Transfer Objects
│       │   ├── security/        # 🛡️ JWT e autenticação
│       │   ├── config/          # 🔧 Configurações (Security, CORS)
│       │   └── exception/       # 💥 Tratamento de erros
│       └── resources/
│           └── application.properties
│
└── frontend/                    # 📁 Aplicação React + Vite
    ├── .env.example             # 🧩 Exemplo de variáveis de ambiente
    ├── package.json             # 📦 Dependências e scripts
    ├── vite.config.js           # ⚙️ Configuração do Vite
    ├── index.html
    └── src/
        ├── components/          # 🧱 Componentes (Layout, ProtectedRoute, Logo, CarImage, CarIcon)
        ├── pages/               # 📄 Páginas (Login, Registro, Automoveis, Clientes, Pedidos)
        ├── services/            # 🔌 Chamadas HTTP (Axios) e helper de imagem dos carros
        ├── context/             # 🧠 Contexto de autenticação
        └── styles/              # 🎨 Estilos globais
```

---

## 💻 Demonstração (Endpoints da API)

A API utiliza autenticação JWT. Primeiro cadastre/autentique um usuário, depois use o token nas demais rotas.

**Cadastro de usuário:**

```bash
curl -X POST http://localhost:8080/api/auth/registrar \
  -H "Content-Type: application/json" \
  -d '{"username":"cliente01","senha":"senha123","email":"cliente@exemplo.com","perfil":"CLIENTE"}'
```

Resposta esperada:

```json
{
  "token": "<jwt-token>",
  "username": "cliente01",
  "perfil": "CLIENTE"
}
```

**Login:**

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"cliente01","senha":"senha123"}'
```

**Criar cliente (autenticado):**

```bash
curl -X POST http://localhost:8080/api/clientes \
  -H "Authorization: Bearer <jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{"rg":"MG-12.345.678","cpf":"123.456.789-00","nome":"Maria Silva","endereco":"Rua A, 100","profissao":"Engenheira","empregadoras":[{"nome":"Empresa X","rendimento":5000.00}]}'
```

Principais rotas:

| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| POST | `/api/auth/registrar` | Cadastro de usuário | Público |
| POST | `/api/auth/login` | Autenticação (login) | Público |
| GET | `/api/clientes` | Listar clientes | Autenticado |
| POST | `/api/clientes` | Criar cliente | Autenticado |
| PUT | `/api/clientes/{id}` | Atualizar cliente | Autenticado |
| DELETE | `/api/clientes/{id}` | Remover cliente | Autenticado |
| GET | `/api/automoveis` | Listar a frota de automóveis | Autenticado |
| GET | `/api/automoveis/{id}` | Buscar automóvel por id | Autenticado |
| POST | `/api/automoveis` | Cadastrar automóvel | Autenticado |
| PUT | `/api/automoveis/{id}` | Atualizar automóvel | Autenticado |
| DELETE | `/api/automoveis/{id}` | Remover automóvel | Autenticado |
| GET | `/api/pedidos` | Listar pedidos | Autenticado |
| POST | `/api/pedidos/cliente/{clienteId}` | Criar pedido | Autenticado |
| PUT | `/api/pedidos/{id}/cancelar` | Cancelar pedido | Autenticado |
| PUT | `/api/pedidos/{id}/avaliar?parecerPositivo=true` | Avaliar pedido | Agente |

---

## 🧪 Testes

O projeto utiliza o ecossistema de testes do Spring Boot (JUnit 5 + Spring Security Test).

```bash
cd backend
# Windows:
mvnw.cmd test
# Linux/Mac:
./mvnw test
```

---

## 🔗 Documentações Utilizadas

- 📖 [Documentação oficial do Spring Boot](https://docs.spring.io/spring-boot/index.html)
- 📖 [Documentação do Supabase](https://supabase.com/docs)
- 📖 [Documentação do React](https://react.dev/)
- 📖 [Documentação do Vite](https://vitejs.dev/)
- 📖 [Template de README — Prof. João Paulo Aramuni](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/TEMPLATES/template_README.md)

---

## 👥 Autores

| Autor | GitHub |
|---|---|
| Vinicius Ramos Sales | [@ViniRSales](https://github.com/ViniRSales) |

---

## 🤝 Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`).
3. Commit suas mudanças seguindo [Conventional Commits](https://www.conventionalcommits.org/) (`git commit -m "feat: adiciona funcionalidade X"`).
4. Faça o push para a branch (`git push origin feature/minha-feature`).
5. Abra um Pull Request.

---

## 🙏 Agradecimentos

- **Engenharia de Software — PUC Minas**, pelo apoio institucional e estrutura acadêmica.
- **Prof. Dr. João Paulo Carneiro Aramuni**, pelos ensinamentos em Desenvolvimento e Integração de Aplicações Web e pela proposta deste laboratório.

---

## 📄 Licença

Projeto acadêmico distribuído sob a **Licença MIT**.
