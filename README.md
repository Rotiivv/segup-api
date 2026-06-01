# Segup API

Projeto full stack para inscrição e consulta de serviços/eventos.
O fluxo principal foi pensado para rodar apenas com Docker e Docker Compose.

## 1. Tecnologias usadas

- Backend: Java 21, Spring Boot 4, Spring Web MVC, Spring Data JPA, Spring Validation, Flyway, MariaDB, Lombok, SpringDoc OpenAPI
- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Radix UI, `react-hook-form`, `zod`, `axios`, `sonner`, `tailwind-variants`
- Infra: Docker e Docker Compose

## 2. Como rodar o backend

Pré-requisitos:
- Docker
- Docker Compose

Execução padrão:

```bash
docker compose up --build
```

O backend sobe em `http://localhost:8080` dentro do Compose.

## 3. Como rodar o frontend

O frontend também sobe via Docker Compose.

Pré-requisitos:
- Docker
- Docker Compose

Execução padrão:

```bash
docker compose up --build
```

O frontend sobe em `http://localhost:3000` dentro do Compose.

## 4. Como configurar o banco

O projeto usa MariaDB e sobe junto com o Docker Compose. A configuração fica no arquivo `.env` da raiz:

```env
DB_HOST=db
DB_PORT=3306
DB_NAME=segup
DB_USER=segup
DB_PASSWORD=segup
DB_ROOT_PASSWORD=root
API=http://localhost:8080
```

Com Docker Compose, o banco já é criado com esses valores.

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

- O frontend usa uma rota proxy interna em Next (`/api/registration`) para simplificar a integração com o backend.
- O schema do banco é versionado com Flyway.
- O status da inscrição não é excluído fisicamente; ele é alterado entre `CONFIRMED` e `CANCELED`.
- O serviço desejado é um enum fechado com valores fixos.
- A criação bloqueia conflito por CPF + serviço.
- O projeto está focado em um fluxo único de inscrição/consulta, sem autenticação e sem paginação.
- O backend e o frontend foram pensados para rodar localmente com Docker Compose.
- Não é necessário instalar Java, Maven ou Node.js na máquina para executar o projeto no fluxo normal.
