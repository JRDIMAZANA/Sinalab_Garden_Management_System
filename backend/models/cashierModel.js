import pool from "../config/db.js";

export async function cashierMenu() {
  const [rows] = await pool.query("SELECT * FROM cashier");
  return rows;
}
