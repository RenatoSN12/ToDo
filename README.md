# Projeto ToDo - Gerenciador de Tarefas

Este projeto é uma aplicação Web para gerenciamento de tarefas.

## Tecnologias utilizadas

### Frontend:
- React  
- TypeScript  
- Material UI

---

### Backend:
- ASP.NET Core Web API

---

### Banco de Dados:
- PostgreSQL

---

## Requisitos

- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)

---

## Como executar o projeto:

### 1. Clone o repositório:
```bash
git clone https://github.com/RenatoSN12/ToDo.git
```

---

### 2. Configurar o Backend:

#### 2.1 Criar o banco de dados e usuário PostgreSQL:

```sql
-- Execute no psql ou pgAdmin:

CREATE USER usuarioteste WITH PASSWORD 'q3*~K~41FGZs';
CREATE DATABASE todo_db OWNER usuarioteste;
GRANT ALL PRIVILEGES ON DATABASE todo_db TO usuarioteste;
```


#### 2.2 Adicionar a connection string com User Secrets e rodar o database update.

A aplicação utiliza o PostgreSQL na porta padrão `5432`.  
Caso sua instalação esteja usando outra porta, ajuste na configuração do comando `dotnet user-secrets set` que está destacado logo abaixo na documentação antes de rodá-lo:

```bash
cd ToDo/backend/ToDo.Api

dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost;Port=5432;Database=todo_db;User Id=usuarioteste;Password=q3*~K~41FGZs;"
dotnet ef database update
```

---

#### 2.3 Rodar a API:

``` bash
dotnet run
```

---

### 3. Configurar o Frontend

Edite o arquivo `.env` na raiz do frontend com a URL da API:

Ajuste a porta da URL conforme a porta em que a API estiver rodando.

```env
VITE_API_URL=http://localhost:5052/api
```

---

### 4. Rodar o Frontend

```bash
cd ../../frontend/todoapp
npm install
npm start
```

---

### 5. Autenticação

1. Registre-se na aplicação.
2. Faça login com suas credenciais.

---

### 6. Utilização

- Crie uma nova tarefa clicando em **"Nova Tarefa"**.
- Após criada, é possível:
  - Editar ou excluir usando os botões na tabela.
  - Marcar como concluída clicando em **"Concluir Tarefas"**.

---

## Regras de Validação

### Registro

- **Nome**:
  - Obrigatório *
  - Máximo de 120 caracteres

- **E-mail**:
  - Obrigatório *
  - Máximo de 80 caracteres
  - Formato válido

- **Senha**:
  - Obrigatória *
  - Mínimo 8 e máximo 16 caracteres
  - Deve conter ao menos:
    - 1 letra maiúscula (A-Z)
    - 1 letra minúscula (a-z)
    - 1 número (0-9)
    - 1 caractere especial: `!`, `?`, `*`, `.`

---

### Login

- **E-mail**:
  - Obrigatório *
  - Máximo de 80 caracteres
  - Formato válido

- **Senha**:
  - Obrigatória *

---

### Criação de Tarefa

- **Título**:
  - Obrigatório *
  - Máximo de 80 caracteres

- **Descrição**:
  - Opcional
  - Máximo de 255 caracteres

- **Prazo (DueDate)**:
  - Obrigatório *
  - Deve ser uma data futura

---

### Edição de Tarefa

- Campos editáveis:
  - Título (máximo 80 caracteres)
  - Descrição (máximo 255 caracteres)
  - Prazo (deve ser uma data futura)

Não é possível alterar tarefas já concluídas.

---

### Conclusão de Tarefa

- Só é possível concluir tarefas que **ainda não foram concluídas**.
