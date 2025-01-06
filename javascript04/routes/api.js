// Import dependencies
const express = require("express");
const StudentController = require("../controllers/StudentController");
const { body, validationResult } = require("express-validator");

// Inisialisasi router
const router = express.Router();

// Middleware validasi input untuk students
const validateStudent = [
  body("nama").notEmpty().withMessage("Nama harus diisi"),
  body("nim").isNumeric().withMessage("NIM harus berupa angka"),
  body("email").isEmail().withMessage("Format email tidak valid"),
  body("jurusan").notEmpty().withMessage("Jurusan harus diisi"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware validasi untuk parameter ID
const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ message: "ID harus berupa angka" });
  }
  next();
};

// Rute utama
router.get("/", (req, res) => {
  res.send("Welcome to Student API");
});

// Rute CRUD untuk students
router.get("/students", StudentController.index);
router.get("/students/:id", validateId, StudentController.show);
router.post("/students", validateStudent, StudentController.store);
router.put("/students/:id", validateId, validateStudent, StudentController.update);
router.delete("/students/:id", validateId, StudentController.destroy);

// Export router
module.exports = router;
