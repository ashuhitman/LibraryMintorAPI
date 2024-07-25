import pool from "../db/config.js";

// Function to get users
export async function getUsers() {
  try {
    // Query the database
    const [rows] = await pool.query("SELECT * FROM daily_entries");

    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
