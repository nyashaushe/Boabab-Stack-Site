# Baobab Stack Site Project

This project is a full-stack application consisting of a Strapi backend and a frontend application (likely React/Vite).

## Project Structure

```
/
├── Baobab Stack/      # Strapi Backend
│   ├── config/        # Strapi configurations (database, server, etc.)
│   ├── src/           # Strapi source code (APIs, components, etc.)
│   ├── public/        # Public assets for Strapi
│   ├── database/      # Database migrations and seeds
│   ├── .env.example   # Example environment variables for backend
│   └── package.json   # Backend dependencies and scripts
├── src/               # Frontend Application (e.g., React with Vite)
│   ├── components/    # Frontend UI components
│   ├── services/      # Services for API calls, etc.
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Frontend entry point
├── public/            # Static assets for the frontend
├── .env               # Root environment variables (if any, or for frontend)
├── package.json       # Frontend dependencies and scripts (or root monorepo scripts)
├── vite.config.ts     # Vite configuration for frontend
└── README.md          # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js** (LTS version recommended, e.g., v18 or v20)
*   **npm** (comes with Node.js) or **yarn**
*   **PostgreSQL** (Database for Strapi)
*   **Git** (for version control)

## Setup and Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Backend Setup (Strapi - `Baobab Stack` directory):**
    *   Navigate to the backend directory:
        ```bash
        cd "Baobab Stack"
        ```
    *   Install dependencies:
        ```bash
        npm install
        # or
        # yarn install
        ```
    *   Set up environment variables:
        *   Copy the example environment file:
            ```bash
            cp .env.example .env
            ```
        *   Open the `.env` file and configure your database connection details:
            ```
            HOST=0.0.0.0
            PORT=1337
            APP_KEYS=your_generated_app_keys_here # Generate with: openssl rand -base64 32
            API_TOKEN_SALT=your_generated_api_token_salt_here # Generate with: openssl rand -base64 32
            ADMIN_JWT_SECRET=your_generated_admin_jwt_secret_here # Generate with: openssl rand -base64 32
            TRANSFER_TOKEN_SALT=your_generated_transfer_token_salt_here # Generate with: openssl rand -base64 32

            # Database
            DATABASE_CLIENT=postgres
            DATABASE_HOST=127.0.0.1
            DATABASE_PORT=5432
            DATABASE_NAME=strapi_db_name # Replace with your DB name
            DATABASE_USERNAME=strapi_user # Replace with your DB user
            DATABASE_PASSWORD=strapi_password # Replace with your DB password
            DATABASE_SSL=false # Set to true if your PostgreSQL requires SSL
            ```
        *   **Important:** Ensure your PostgreSQL server is running and you have created the database (`DATABASE_NAME`) and user (`DATABASE_USERNAME`) with the specified password and appropriate permissions.

3.  **Frontend Setup (Root directory):**
    *   Navigate back to the project root directory (if you were in `Baobab Stack`):
        ```bash
        cd ..
        ```
    *   Install frontend dependencies:
        ```bash
        npm install
        # or
        # yarn install
        ```
    *   If your frontend requires environment variables (e.g., for the Strapi API URL), create a `.env` file in the root directory (or as specified by your frontend setup, often `.env.local` for Vite/React) and add them:
        ```env
        VITE_API_URL=http://localhost:1337/api # Example for Vite
        ```

## Running the Development Servers

1.  **Start the Backend (Strapi):**
    *   Navigate to the `Baobab Stack` directory:
        ```bash
        cd "Baobab Stack"
        ```
    *   Run the development server:
        ```bash
        npm run develop
        # or
        # yarn develop
        ```
    *   The Strapi admin panel will typically be available at `http://localhost:1337/admin`. You'll need to create an administrator account on your first visit.

2.  **Start the Frontend:**
    *   Open a **new terminal** and navigate to the project root directory:
        ```bash
        cd path/to/your/project-root
        ```
    *   Run the frontend development server (assuming Vite, based on `vite.config.ts`):
        ```bash
        npm run dev
        # or
        # yarn dev
        ```
    *   The frontend application will typically be available at `http://localhost:5173` (Vite's default) or another port specified in your Vite config or terminal output.

**Note:** Some projects might have a root `package.json` script to run both frontend and backend concurrently (e.g., `npm run dev:all`). Check the `scripts` section of the root `package.json`.

## Key Technologies

*   **Backend:**
    *   Strapi (Node.js Headless CMS)
    *   PostgreSQL (Database)
*   **Frontend:**
    *   React (likely, based on `.tsx` files)
    *   Vite (Build tool and dev server)
    *   Tailwind CSS (Utility-first CSS framework, based on `tailwind.config.js`)
    *   TypeScript

## Deployment

Deployment will vary based on your hosting provider.

*   **Strapi Backend:** Refer to the [official Strapi deployment guides](https://docs.strapi.io/dev-docs/deployment) for platforms like Heroku, AWS, DigitalOcean, etc. You'll typically need to build the admin panel (`npm run build --prefix "Baobab Stack"`) and configure environment variables on your server.
*   **Frontend:**
    *   Build the static assets: `npm run build` (in the root directory).
    *   Deploy the contents of the `dist` (or similar build output) folder to a static hosting provider like Netlify, Vercel, GitHub Pages, AWS S3, etc.

## Troubleshooting

*   **PostgreSQL Connection Issues (Strapi):**
    *   Ensure your PostgreSQL server is running.
    *   Verify `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` in `Baobab Stack/.env` are correct.
    *   Check if the database user has the correct permissions for the database.
    *   Ensure no firewall is blocking the connection to port `5432` (or your configured port).
    *   If `psql` command is not found, ensure PostgreSQL's `bin` directory is in your system's PATH.
*   **Port Conflicts:** If a port (e.g., 1337 or 5173) is already in use, either stop the conflicting process or configure the application to use a different port (e.g., in `Baobab Stack/config/server.ts` for Strapi, or `vite.config.ts` for the frontend).
*   **Missing Environment Variables:** Ensure all required environment variables are set in the respective `.env` files for both backend and frontend.

## Contributing

(Add guidelines for contributing to the project if applicable.)

## License

(Specify the project's license, e.g., MIT, ISC.)