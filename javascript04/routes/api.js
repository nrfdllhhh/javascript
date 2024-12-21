const express = require("express");
const StudentController = require("../controllers/StudentController");

const router = express.Router();

router.get("/students", StudentController.index);
router.post("/students", StudentController.store);
router.put("/students/:id", StudentController.update);
router.delete("/students/:id", StudentController.destroy);

module.exports = router;
