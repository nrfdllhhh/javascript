// Import model Student dan validator
const Student = require("../models/Student");
const { body, validationResult } = require("express-validator");

class StudentController {
  // Menampilkan semua data students
  async index(req, res) {
    try {
      const students = await Student.all();
      res.json({
        message: "Menampilkan semua students",
        data: students,
      });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan saat mengambil data students", error });
    }
  }

  // Menampilkan satu data student berdasarkan id
  async show(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.show(id);
      if (!student) {
        return res.status(404).json({ message: `Student dengan id ${id} tidak ditemukan` });
      }
      res.json({
        message: `Menampilkan student dengan id ${id}`,
        data: student,
      });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan saat mengambil student", error });
    }
  }

  // Menambahkan data student baru
  async store(req, res) {
    // Validasi input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const student = await Student.create(req.body);
      res.status(201).json({
        message: "Menambahkan data student",
        data: student,
      });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan saat menambahkan student", error });
    }
  }

  // Memperbarui data student
  async update(req, res) {
    // Validasi input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const existingStudent = await Student.show(id);
      if (!existingStudent) {
        return res.status(404).json({ message: `Student dengan id ${id} tidak ditemukan` });
      }

      const updatedStudent = await Student.update(id, req.body);
      res.json({
        message: `Memperbarui data student dengan id ${id}`,
        data: updatedStudent,
      });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan saat memperbarui student", error });
    }
  }

  // Menghapus data student
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const existingStudent = await Student.show(id);
      if (!existingStudent) {
        return res.status(404).json({ message: `Student dengan id ${id} tidak ditemukan` });
      }

      await Student.delete(id);
      res.json({
        message: `Menghapus data student dengan id ${id}`,
      });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan saat menghapus student", error });
    }
  }
}

module.exports = new StudentController();
