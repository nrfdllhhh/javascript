const students = require("../data/students"); // Path relatif ke data

class StudentController {
  index(req, res) {
    const data = {
      message: "Menampilkan semua students",
      data: students,
    };
    res.status(200).json(data);
  }

  store(req, res) {
    const { nama } = req.body;

    if (!nama) {
      return res.status(400).json({
        message: "Nama student harus diisi",
      });
    }

    const newStudent = { id: students.length + 1, nama };
    students.push(newStudent);

    const data = {
      message: `Menambahkan data student: ${nama}`,
      data: newStudent,
    };
    res.status(201).json(data);
  }

  update(req, res) {
    const { id } = req.params;
    const { nama } = req.body;

    const student = students.find((student) => student.id === parseInt(id));
    if (!student) {
      return res.status(404).json({
        message: "Student tidak ditemukan",
      });
    }

    if (!nama) {
      return res.status(400).json({
        message: "Nama student harus diisi",
      });
    }

    student.nama = nama;

    const data = {
      message: `Mengupdate data student dengan ID: ${id}`,
      data: student,
    };
    res.status(200).json(data);
  }

  destroy(req, res) {
    const { id } = req.params;

    const studentIndex = students.findIndex((student) => student.id === parseInt(id));
    if (studentIndex === -1) {
      return res.status(404).json({
        message: "Student tidak ditemukan",
      });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    const data = {
      message: `Menghapus data student dengan ID: ${id}`,
      data: deletedStudent[0],
    };
    res.status(200).json(data);
  }
}

module.exports = new StudentController();
