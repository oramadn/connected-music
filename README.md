# Connected Music

## Getting Started

Follow these steps to get the project up and running using Docker.

### 1. Start the containers

Run the following command to start the database, backend, and frontend services:

```bash
docker compose up -d
```

### 2. Run database migrations

```bash
docker exec connected-music-backend npm run db:migrate
```

### 3. Seed the database

Populate the database with initial data, including the admin user:

```bash
docker exec connected-music-backend npm run db:seed
```

## Accessing the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## Default Credentials

Use the following credentials to log in:

- **Email**: admin@example.com
- **Password**: password

## Notes

- There are no tests setup
- There is no RBAC or any other authorization system setup, just a simple check if JWT exists for a user to grant the ability to add a song
