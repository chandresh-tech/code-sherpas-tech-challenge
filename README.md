# **Banking Application**

A full-stack banking application built with **Next.js** (frontend), **Nest.js** (backend), and **PostgreSQL** as the database, all containerized with **Docker**. This project allows users to manage accounts, perform transactions (deposit, withdraw, transfer), and view transaction history.

## **Table of Contents**

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Decisions and Design Choices](#decisions-and-design-choices)
- [API Endpoints](#api-endpoints)

---

## **Features**

- Deposit, withdraw, and transfer money between accounts.
- Support for both **IBAN** and **non-IBAN** accounts.
- Transfer restrictions to only IBAN accounts.
- View transaction history, including the balance after each transaction.
- Swagger integration for API documentation and testing.

---

## **Technologies Used**

- **Frontend:** Next.js
- **Backend:** Nest.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Containerization:** Docker + Docker Compose
- **Authentication:** (Currently not implemented)
- **API Documentation:** Swagger UI

---

## **Project Structure**

```plaintext
.
├── backend/         # Backend code (Nest.js + Prisma)
│   ├── src/
│   │   ├── modules/ # Modules for user, account, and transactions
│   │   ├── main.ts  # Entry point for the backend
│   └── prisma/      # Prisma schema and migrations
├── frontend/        # Frontend code (Next.js)
├── docker-compose.yml # Docker Compose file for orchestrating services
└── README.md        # Project documentation
```

---

## **Setup Instructions**

### Prerequisites

- Docker
- Node.js (v18 or later)
- pnpm (preferred package manager)

### Steps to Run the Project

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository>
   ```

2. Start services with Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Access the services:

   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend:** [http://localhost:3333](http://localhost:3333)
   - **Swagger UI:** [http://localhost:3333/api](http://localhost:3333/api)

4. Seed the database:

   ```bash
   DATABASE_URL=postgres://chandresh:chandresh_123@localhost:5432/bank-simulation npx prisma db seed
   ```

   > ℹ️ For the sake of simplicity I've already included the credentials directly😉 (Ideally I'll replace it with placeholder strings <username>:<password> in documentation)

---

## **Decisions and Design Choices**

1. **Database Design:**

   - An account type field (with enum values IBAN & NON_IBAN) is used to allow flexibility while maintaining transfer restrictions.
   - Standard fields like account number, accountholder name are not yet part of the schema
   - `linked_transaction_id` field in transactions supports accurate linking of transfers.

2. **RESTful API Structure:**

   - Grouped APIs under `/accounts/{accountId}` for clarity and adherence to REST principles.

3. **Containerization:**

   - Used Docker to simplify environment setup and ensure consistent deployment.

4. **Swagger Integration:**

   - Provides self-documenting API for easy testing and onboarding.

5. **Uni tests:**
   - Only covering the business logic to transfer the amount from one account to another account.
   - All APIs except transfer don't have much business logic hence don't have unit tests

---

## **Key API Endpoints**

### **Accounts**

- `GET /accounts`: Fetch all accounts.
- `GET /accounts/{accountId}/history`: Fetch transaction history of account, supports cursor based pagination.

### **Transactions**

- `POST /accounts/{accountId}/deposit`: Deposit money into an account.
- `POST /accounts/{accountId}/withdraw`: Withdraw money from an account.
- `POST /accounts/{accountId}/transfer`: Transfer money between accounts (IBAN only).
