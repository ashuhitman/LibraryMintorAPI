import pool from "../db/config.js";

export async function getLibraryInfo() {
  try {
    const [rows] = await pool.query("SELECT * FROM libraryinfo");
    return rows;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
export async function setLibrayInfo(info) {
  console.log(info);
  const { id, institution_name, library_name, total_seats } = info;

  try {
    // Check if the record exists
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS count FROM libraryinfo WHERE id = ?",
      [id]
    );

    if (rows[0].count > 0) {
      // Update the existing record
      const updateSql = `
        UPDATE libraryinfo
        SET institution_name = ?, library_name = ?, total_seats = ?
        WHERE id = ?
      `;
      const updateValues = [institution_name, library_name, total_seats, id];
      const [updateResult] = await pool.query(updateSql, updateValues);
      console.log("Record updated:", updateResult);
      return { message: "Record updated successfully", result: updateResult };
    } else {
      // Insert a new record if none exists
      const insertSql = `
        INSERT INTO libraryinfo (id, institution_name, library_name, total_seats)
        VALUES (?, ?, ?, ?)
      `;
      const insertValues = [id, institution_name, library_name, total_seats];
      const [insertResult] = await pool.query(insertSql, insertValues);
      console.log("Record inserted:", insertResult);
      return { message: "Record inserted successfully", result: insertResult };
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
