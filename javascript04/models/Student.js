import db from "../config/database.js";
import { promisify } from "util";

// Promisify db.query
const query = promisify(db.query).bind(db);

class Student {
  // Mengambil semua data students
  static async all() {
    const sql = "SELECT * FROM students";
    try {
      const results = await query(sql);
      return results;
    } catch (err) {
      throw err;
    }
  }

  // Menambahkan data student baru
  static async create(data) {
    const sql = "INSERT INTO students (nama, nim, email, jurusan) VALUES (?, ?, ?, ?)";
    try {
      const results = await query(sql, [data.nama, data.nim, data.email, data.jurusan]);
      return { id: results.insertId, ...data };
    } catch (err) {
      throw err;
    }
  }

  // Memperbarui data student berdasarkan ID
  static async update(id, data) {
    const sql = "UPDATE students SET nama = ?, nim = ?, email = ?, jurusan = ? WHERE id = ?";
    try {
      const results = await query(sql, [data.nama, data.nim, data.email, data.jurusan, id]);
      if (results.affectedRows === 0) return null; // Tidak ada baris diperbarui
      return { id, ...data };
    } catch (err) {
      throw err;
    }
  }

  // Mencari data student berdasarkan ID
  static async findById(id) {
    const sql = "SELECT * FROM students WHERE id = ?";
    try {
      const results = await query(sql, [id]);
      return results[0] || null; // Return null jika tidak ditemukan
    } catch (err) {
      throw err;
    }
  }

  // Menampilkan data student berdasarkan ID
  static async show(id) {
    return this.findById(id);
  }

  // Menghapus data student berdasarkan ID
  static async delete(id) {
    const sql = "DELETE FROM students WHERE id = ?";
    try {
      const results = await query(sql, [id]);
      if (results.affectedRows === 0) return null; // Tidak ada baris dihapus
      return { message: `Student dengan ID ${id} berhasil dihapus.` };
    } catch (err) {
      throw err;
    }
  }
}

export default Student;
