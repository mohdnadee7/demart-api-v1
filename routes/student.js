const express = require("express");
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  uploadImage,
} = require("../src/services/student");
const { verifyToken } = require("../src/middleware/verifyToken");
const router = new express.Router();
const multer = require("multer");

// Initialize upload variable
const upload = multer({
  storage: multer.diskStorage({}),
});

router.post("/student",verifyToken, upload.single("image"), createStudent);
router.patch("/student/:id",verifyToken,upload.single("image"), updateStudent);
router.get("/student", verifyToken, getAllStudents);
router.get("/student/:id", verifyToken, getStudentById);
router.delete("/student/:id", verifyToken, deleteStudent);
router.post("/upload", upload.single("myImage"), uploadImage);

module.exports = router;
