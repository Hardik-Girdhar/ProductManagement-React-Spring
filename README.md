# ProductManagement - React + Spring Boot

This is a full-stack product management application with a React frontend and a Spring Boot backend. The app lets users view, search, add, update, delete, and manage products with image upload support.

## Project Structure

```text
ProductManagement---React-Spring/
├── Backend Spring/      # Spring Boot REST API
├── Frontent React/      # React + Vite frontend
├── .gitignore
└── README.md
```

Note: the frontend folder is currently named `Frontent React` in this repository.

## Tech Stack

### Frontend

- React 18
- Vite
- Axios
- Bootstrap / React Bootstrap
- Bootstrap Icons
- React Icons
- React Router DOM
- ESLint

### Backend

- Java 17
- Spring Boot 3.5.14
- Spring Web
- Spring Data JPA
- PostgreSQL Driver
- Maven Wrapper

### Database

- PostgreSQL

## Prerequisites

Install these before running the project:

- Java 17 or later
- Node.js and npm
- PostgreSQL
- Git

You do not need to install Maven separately because the backend includes Maven Wrapper files: `mvnw` and `mvnw.cmd`.

## Database Setup

Create a PostgreSQL database named:

```text
reactProduct
```

The backend currently expects PostgreSQL to run with this configuration:

```properties
spring.datasource.url=jdbc:postgresql://localhost:1234/reactProduct
spring.datasource.username=postgres
spring.datasource.password=root
```

If your PostgreSQL port, username, or password is different, update:

```text
Backend Spring/src/main/resources/application.properties
```

The app uses:

```properties
spring.jpa.hibernate.ddl-auto=update
```

So Spring Boot will create or update the required tables automatically when the backend starts.

## Run the Backend

Open a terminal in the project root and run:

```bash
cd "Backend Spring"
./mvnw spring-boot:run
```

On Windows PowerShell, use:

```powershell
cd "Backend Spring"
.\mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

The API base path is:

```text
http://localhost:8080/api
```

## Run the Frontend

Open another terminal in the project root and run:

```bash
cd "Frontent React"
npm install
npm run dev
```

Vite will start the frontend, usually at:

```text
http://localhost:5173
```

The frontend is configured to call the backend at:

```text
http://localhost:8080/api
```

This value is defined in:

```text
Frontent React/src/axios.jsx
```

## Frontend Scripts

Run these commands from the `Frontent React` folder:

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build in the `dist` folder.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

## Backend Commands

Run these commands from the `Backend Spring` folder.

### Start Backend

```powershell
.\mvnw.cmd spring-boot:run
```

### Run Tests

```powershell
.\mvnw.cmd test
```

### Build Backend

```powershell
.\mvnw.cmd clean package
```

The generated build output will be created inside the `target` folder.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | Get all products |
| GET | `/api/product/{id}` | Get product by ID |
| POST | `/api/product` | Add a product with image |
| PUT | `/api/product/{id}` | Update a product with image |
| DELETE | `/api/product/{id}` | Delete a product |
| GET | `/api/product/{prodId}/image` | Get product image |
| GET | `/api/products/search?keyword=value` | Search products |

## Important Notes

- Start PostgreSQL before running the backend.
- Start the backend before using the frontend.
- Keep `node_modules`, `dist`, `target`, `.idea`, and `.vscode` out of Git. These are already handled by `.gitignore`.
- If the frontend cannot load products, confirm that the backend is running on port `8080` and PostgreSQL is connected successfully.
