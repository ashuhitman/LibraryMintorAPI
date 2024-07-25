import pool, { config } from "../db/config.js";
import { getCurrentTime } from "../utils/utils.js";

// Function to get users
export async function getReports(date) {
  try {
    date = date.split("T")[0];

    // Query the database
    const [rows] = await pool.query(
      "SELECT * FROM reports WHERE created_date = ? ORDER BY created_at DESC",
      [date]
    );

    return rows;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
}
// check in or check out the user
export async function checkInOut(barcode, date, time) {
  try {
    // Check if the barcode exists for the given date
    const [rows] = await pool.query(
      "SELECT * FROM reports WHERE barcode = ? AND created_date = ? AND status=?",
      [barcode, date, 1]
    );

    if (rows.length === 0) {
      // No record exists, perform check-in
      const [result] = await pool.query(
        "INSERT INTO reports (barcode,checkin,checkout, created_date, status) VALUES (?, ?,?, ?,?)",
        [barcode, time, null, date, 1]
      );

      return {
        user_status: "in",
        message: "Checked in successfully",
        row: {
          id: result.insertId,
          barcode,
          checkin: time,
          checkout: null,
          created_date: date,
          status: 1,
        },
      };
    } else {
      // Currently checked in, perform check-out
      await pool.query(
        "UPDATE reports SET status = ?,checkout = ? WHERE id = ?",
        [0, time, rows[0].id]
      );
      return {
        user_status: "out",
        message: "Checked out successfully",
        row: { ...rows[0], status: 0, checkout: time },
      };
    }
  } catch (error) {
    console.error("Error checking in or out:", error);
    throw new Error("Failed to check in or out");
  }
}
// get rpoerts by start and end date

export async function getReportsByDate(startDate, endDate) {
  try {
    // Query the database
    const [rows] = await pool.query(
      "SELECT * FROM reports WHERE created_date BETWEEN ? AND ? ORDER BY created_at DESC",
      [startDate, endDate]
    );
    return rows;
  } catch (error) {
    console.error("Error checking in or out:", error);
    throw error;
  }
}

// get count of checked in and checked out

export async function getSummary(date) {
  try {
    // get today date

    const sql =
      "SELECT SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS checkedInCount, SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS checkedOutCount FROM reports WHERE created_date = ?";
    const [rows] = await pool.query(sql, [date]);
    console.log(rows, date);
    return rows;
    // get count where checked in and checked out
  } catch (error) {
    console.error("Error fetching data...", error);
    throw error;
  }
}
