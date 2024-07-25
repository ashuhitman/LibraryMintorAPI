import pool, { config } from "./config.js";

// check if reports table exist
async function checkAndCreateTable() {
  try {
    // Check if the table exists
    const [rows] = await pool.query(
      `
        SELECT COUNT(*)
        AS count
        FROM information_schema.tables
        WHERE table_schema = ? AND table_name = 'reports'
      `,
      [config.database]
    );

    // If the table does not exist, create it
    if (rows[0].count === 0) {
      await pool.query(`
         CREATE TABLE reports (
      id INT AUTO_INCREMENT PRIMARY KEY,
      barcode VARCHAR(20) NOT NULL,
      checkin TIME,
      checkout TIME DEFAULT NULL,
      status TINYINT,
      created_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
        `);
      console.log('Table "reports" created.');
    } else {
      console.log('Table "reports" already exists.');
    }
  } catch (error) {
    console.error("Error checking or creating table:", error.message);
  }
}

async function checkAndCreateTableLibrayInfo() {
  try {
    // Check if the table exists
    const [rows] = await pool.query(
      `
          SELECT COUNT(*)
          AS count
          FROM information_schema.tables
          WHERE table_schema = ? AND table_name = 'libraryinfo'
        `,
      [config.database]
    );

    // If the table does not exist, create it
    if (rows[0].count === 0) {
      await pool.query(`
          CREATE TABLE libraryinfo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    institution_name VARCHAR(255) NOT NULL,
    library_name VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    );
     `);
      console.log('Table "libraryinfo" created.');
    } else {
      console.log('Table "libraryinfo" already exists.');
    }
  } catch (error) {
    console.error("Error checking or creating table:", error.message);
  }
}

async function checkAndCreateTableUsers() {
  try {
    // Check if the table exists
    const [rows] = await pool.query(
      `
            SELECT COUNT(*)
            AS count
            FROM information_schema.tables
            WHERE table_schema = ? AND table_name = 'users'
          `,
      [config.database]
    );

    // If the table does not exist, create it
    if (rows[0].count === 0) {
      await pool.query(`
            CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,  -- Unique constraint on username
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user', 'guest') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `);
      console.log('Table "users" created.');
    } else {
      console.log('Table "users" already exists.');
    }
  } catch (error) {
    console.error("Error checking or creating table:", error.message);
  }
}

checkAndCreateTable();
checkAndCreateTableLibrayInfo();
checkAndCreateTableUsers();
