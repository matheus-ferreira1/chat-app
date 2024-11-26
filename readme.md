# **Full Stack Chat Application with Docker**

Este projeto é uma aplicação de chat em tempo real full stack construída com **NestJS** (backend), **MySQL** (banco de dados) e **React** (frontend), containerizada usando **Docker**.

## **Features**

- Chat em tempo real usando **Socket.IO**.
- Criação de um nome de usuário aleatório ao entrar.
- Possibilidade de entrar em salas de chat existentes ou criar novas.
- Persistencia em banco de dados **MySQL**.
- Frontend e backend totalmente containerizados com **Docker**.

---

## **Tecnologias Utilizadas**

- **Backend**: NestJS, MySQL, Socket.IO
- **Frontend**: React (Vite, TypeScript)
- **Database**: MySQL
- **Containerization**: Docker, Docker Compose

---

## **Pré-requisitos**

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Docker**: [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Instalar Docker Compose](https://docs.docker.com/compose/install/)
- **Node.js**: [Instalar Node.js](https://nodejs.org/)

---

## **Como Começar**

Siga os passos abaixo para configurar e rodar a aplicação:

### **1. Clone o Repositório**

Clone este repositório para sua máquina local:

```bash
git clone https://github.com/matheus-ferreira1/chat-app.git
cd chat-app
```

### **2. Construa e Inicie os Containers**

Execute o seguinte comando para construir e iniciar os containers:

```bash
docker-compose up --build
```

Isso irá:
- Construir e iniciar o container do MySQL.
- Construir e iniciar o container do backend NestJS.
- Construir e iniciar o container do frontend React.

## Acessando a Aplicação

- Frontend: Após os containers estarem em execução, você pode acessar o frontend navegando até http://localhost:5173 no seu navegador.
- Backend: O backend estará disponível em http://localhost:3000, mas será acessado automaticamente pelo frontend.

## Detalhes de Configuração
- MySQL:
    - Banco de Dados: chatdb
    - Usuário: root
    - Senha: root
    - Porta: 3307 (mapeada da 3306 dentro do container)

- Backend:
    - O backend está acessível na porta 3000.
    - O Socket.IO está configurado para escutar conexões em ws://backend:3000.

- Frontend:
    - O frontend está disponível na porta 5173 e se comunica com o backend via URL http://backend:3000 (na rede Docker).
 
## Arquivos Importantes
- docker-compose.yml: Define os serviços (frontend, backend, mysql) e suas configurações.
- nginx.conf: Configuração do Nginx para servir o frontend React e fazer proxy de requisições WebSocket e API para o backend.
- Dockerfile (Frontend): Especifica como construir e servir o frontend React com o Nginx.
- Dockerfile (Backend): Especifica como construir o backend NestJS.

## Parando os Containers

Execute o seguinte comando para construir e iniciar os containers:

```bash
docker-compose down
```
