// db.mjs
import mysql from "mysql2/promise";

// Create a connection pool
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: 3306,
// });

const connectionUri =
  "mysql://uzbqstv8a1qlzsqq:8b55lj0urospqhSspGA0@b5otw7f6n5j5lhzkxhbh-mysql.services.clever-cloud.com:3306/b5otw7f6n5j5lhzkxhbh";

// Parse the URI
const parsedUrl = new URL(connectionUri);

export const config = {
  host: parsedUrl.hostname,
  port: parsedUrl.port || 3306, // Default MySQL port
  user: parsedUrl.username,
  password: parsedUrl.password,
  database: parsedUrl.pathname.slice(1), // Remove the leading '/'
};
// Create a connection pool
const pool = mysql.createPool(config);

export async function checkDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection established successfully.");
    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process with a failure code
  }
}

// Export the pool with promises for async/await usage
export default pool;
