import Student from "../models/Student.js";
import { validationResult } from "express-validator";

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.all();
      res.json({ message: "Menampilkan semua students", data: students });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan saat mengambil data students", error });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.show(id);
      if (!student) {
        return res.status(404).json({ message: `Student dengan id ${id} tidak ditemukan` });
      }
      res.json({ message: `Menampilkan student dengan id ${id}`, data: student });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan saat mengambil student", error });
    }
  }

  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const student = await Student.create(req.body);
      res.status(201).json({ message: "Menambahkan data student", data: student });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan saat menambahkan student", error });
    }
  }

  async update(req, res) {
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
      res.json({ message: `Memperbarui data student dengan id ${id}`, data: updatedStudent });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan saat memperbarui student", error });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const existingStudent = await Student.show(id);
      if (!existingStudent) {
        return res.status(404).json({ message: `Student dengan id ${id} tidak ditemukan` });
      }

      await Student.delete(id);
      res.json({ message: `Menghapus data student dengan id ${id}` });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan saat menghapus student", error });
    }
  }
}

export default new StudentController();
