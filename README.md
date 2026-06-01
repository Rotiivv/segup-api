# Segup API

Projeto full stack para inscrição e consulta de serviços/eventos.
O fluxo principal foi pensado para rodar apenas com Docker e Docker Compose.

## 1. Tecnologias usadas

- Backend: Java 21, Spring Boot 4, Spring Web MVC, Spring Data JPA, Spring Validation, Flyway, MariaDB, Lombok, SpringDoc OpenAPI
- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Radix UI, `react-hook-form`, `zod`, `sonner`, `tailwind-variants`
- Infra: Docker e Docker Compose

## 2. Como rodar o backend

Pré-requisitos:
- Docker
- Docker Compose

Execução com tudo em containers:

```bash
docker compose up -d --build
```

Execução do backend com banco em container:

```bash
cd api
docker compose up -d
mvn spring-boot:run
```

O backend sobe em `http://localhost:8080`.

## 3. Como rodar o frontend

Pré-requisitos:
- Docker
- Docker Compose

Execução com tudo em containers:

```bash
docker compose up -d --build
```

Execução do frontend direto na máquina:

```bash
cd front-end
npm install
npm run dev
```

O frontend sobe em `http://localhost:3000`.

## 4. Como configurar o banco

O projeto usa MariaDB e sobe junto com o Docker Compose. A configuração fica no arquivo `.env` da raiz:

```env
DB_HOST=db
DB_PORT=3306
DB_NAME=segup
DB_USER=segup
DB_PASSWORD=segup
DB_ROOT_PASSWORD=root
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Com Docker Compose, o banco já é criado com esses valores.

Se você rodar o backend fora do Compose, o Spring Boot também carrega `api/.env` automaticamente.
Nesse modo, o banco sobe com `cd api && docker compose up -d`.

Arquivos úteis:
- `api/.env`: backend fora do Compose (`DB_HOST=localhost`)
- `api/.env.example`: template do backend fora do Compose
- `api/docker-compose.yml`: banco do backend fora do Compose
- `front-end/.env`: frontend fora do Compose (`NEXT_PUBLIC_API_URL=http://localhost:8080`)
- `.env` da raiz: execução total em containers

Os arquivos `.env` foram mantidos no repositório para facilitar a execução inicial e evitar configuração manual repetida durante o desenvolvimento local. Como referência limpa e sem dados sensíveis, os respectivos `.env.example` continuam disponíveis em cada módulo.

Migrações:
- `V1__create-registration-table.sql`
- `V2__alter-column-status-table.sql`

O backend usa Flyway e `ddl-auto: validate`, então o schema precisa bater com as migrations.

## 5. Endpoints principais

Base URL: `/api/registration`

- `POST /api/registration`
  - Cria uma inscrição
  - Retorna `protocol`, `desiredService`, `status` e `redirectUrl`

- `GET /api/registration/{cpf}/all`
  - Lista inscrições por CPF

- `PATCH /api/registration/{id}/service`
  - Atualiza o serviço desejado de uma inscrição

- `PATCH /api/registration/{id}/cancel`
  - Cancela a inscrição

- `PATCH /api/registration/{id}/confirm`
  - Confirma a inscrição

Erros mais comuns:
- `400`: validação ou JSON inválido
- `404`: inscrição não encontrada
- `409`: CPF já possui inscrição para o mesmo serviço ou a inscrição está cancelada

## 6. Fluxo da inscrição

1. O usuário acessa `/registration`.
2. Preenche CPF, nome, e-mail, telefone, serviço desejado e observação.
3. O frontend envia a criação para o backend.
4. O backend valida os dados, gera um protocolo e grava a inscrição.
5. Em caso de sucesso, o frontend exibe uma toast e redireciona para `/registration/consult`.
6. Na consulta, o usuário pesquisa pelo CPF e visualiza os registros.
7. Cada card permite confirmar, cancelar ou trocar o serviço desejado.

## 7. Decisões técnicas e limitações

- O frontend chama o backend diretamente com `fetch` usando `NEXT_PUBLIC_API_URL`.
- O schema do banco é versionado com Flyway.
- O status da inscrição não é excluído fisicamente; ele é alterado entre `CONFIRMED` e `CANCELED`.
- O serviço desejado é um enum fechado com valores fixos.
- A criação bloqueia conflito por CPF + serviço.
- O projeto está focado em um fluxo único de inscrição/consulta, sem autenticação e sem paginação.
- O backend e o frontend foram pensados para rodar localmente com Docker Compose.
- Não é necessário instalar Java, Maven ou Node.js na máquina para executar o projeto no fluxo normal.
