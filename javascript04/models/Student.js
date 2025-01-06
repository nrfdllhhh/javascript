// Import database
const db = require("../config/database");

class Student {
  // Mengambil semua data students
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM students";
      db.query(sql, (err, results) => {
        if (err) {
          console.error("Error fetching students:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Menambahkan data student baru
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO students (nama, nim, email, jurusan) VALUES (?, ?, ?, ?)";
      db.query(sql, [data.nama, data.nim, data.email, data.jurusan], (err, results) => {
        if (err) {
          console.error("Error creating student:", err);
          return reject(err);
        }
        resolve({ id: results.insertId, ...data });
      });
    });
  }

  // Memperbarui data student berdasarkan ID
  static update(id, data) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE students SET nama = ?, nim = ?, email = ?, jurusan = ? WHERE id = ?";
      db.query(sql, [data.nama, data.nim, data.email, data.jurusan, id], (err, results) => {
        if (err) {
          console.error(`Error updating student with ID ${id}:`, err);
          return reject(err);
        }
        if (results.affectedRows === 0) {
          return resolve(null); // Tidak ada baris yang diperbarui
        }
        resolve({ id, ...data });
      });
    });
  }

  // Mencari data student berdasarkan ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM students WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) {
          console.error(`Error finding student with ID ${id}:`, err);
          return reject(err);
        }
        resolve(results[0] || null); // Return null jika tidak ditemukan
      });
    });
  }

  // Menampilkan data student berdasarkan ID
  static show(id) {
    return this.findById(id); // Gunakan fungsi findById untuk konsistensi
  }

  // Menghapus data student berdasarkan ID
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM students WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) {
          console.error(`Error deleting student with ID ${id}:`, err);
          return reject(err);
        }
        if (results.affectedRows === 0) {
          return resolve(null); // Tidak ada baris yang dihapus
        }
        resolve({ message: `Student dengan ID ${id} berhasil dihapus.` });
      });
    });
  }
}

module.exports = Student;
