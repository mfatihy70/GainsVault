# GainsVault

GainsVault is a simple and efficient workout tracker website.

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/mfatihy70/GainsVault.git
    cd GainsVault
    ```

2. Create a `.env` file in the `backend` directory and add the following entries:
    ```
    # Required 
    JWT_TOKEN=
    DB_NAME=
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_SSLMODE=
    DB_PORT=

    # Optional
    BACKEND_PORT=
    ```

3. Install dependencies and start the development servers:
    - Navigate to the `frontend` folder:
      ```bash
      cd frontend
      npm install
      npm run dev
      ```
    - Open a new terminal, navigate to the `backend` folder:
      ```bash
      cd backend
      npm install
      npm run dev
      ```

