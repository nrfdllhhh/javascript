import express from "express";
import StudentController from "../controllers/StudentController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

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

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ message: "ID harus berupa angka" });
  }
  next();
};

router.get("/", (req, res) => {
  res.send("Welcome to Student API");
});

router.get("/students", StudentController.index);
router.get("/students/:id", validateId, StudentController.show);
router.post("/students", validateStudent, StudentController.store);
router.put("/students/:id", validateId, validateStudent, StudentController.update);
router.delete("/students/:id", validateId, StudentController.destroy);

export default router;
