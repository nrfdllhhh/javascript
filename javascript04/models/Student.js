// import database
const db = require("../config/database");

class Student {
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM students";
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO students (nama, nim, email, jurusan) VALUES (?, ?, ?, ?)";
      db.query(sql, [data.nama, data.nim, data.email, data.jurusan], (err, results) => {
        if (err) reject(err);
        resolve({ id: results.insertId, ...data });
      });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE students SET nama = ?, nim = ?, email = ?, jurusan = ? WHERE id = ?";
      db.query(sql, [data.nama, data.nim, data.email, data.jurusan, id], (err, results) => {
        if (err) reject(err);
        resolve({ id, ...data });
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM students WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static show(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM students WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        if (results.length === 0) {
          resolve(null); // Return null if no record found
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM students WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Student;
