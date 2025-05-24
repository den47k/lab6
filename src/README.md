## Requirements


- MySQL database
- Node.js (v18)
- npm or yarn

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://your-repo-url.git
   cd your-repo
   ```

2. **Create a `.env` file** in the root directory with your database and JWT configuration:

   ```ini
   JWT_SECRET=SECRET_KEY

   DB_HOST=host
   DB_USER=user_name
   DB_PASSWORD=pword
   DB_NAME=db_name
   DB_PORT=post
   ```

3. **Install dependencies:**

   ```bash
   npm i
   ```

4. **Run database migrations:**

   ```bash
   npm run migrate
   ```

5. **Seed the database with initial data:**

   ```bash
   npm run seed
   ```

6. **Start the development server:**

   ```bash
   npm run dev
   ```