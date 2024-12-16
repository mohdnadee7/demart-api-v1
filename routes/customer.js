const express = require("express");
const { verifyToken } = require("../src/middleware/verifyToken");
const router = new express.Router();
const multer = require("multer");
const {
  applyLoan,
  getAllCustomerRequests,
  updateLoanStatus,
  getUserLoanList,
  getUserLoanListById,
  updateLoanEmiStatus,
} = require("../src/services/customer");

// Initialize upload variable
const upload = multer({
  storage: multer.diskStorage({}),
});

router.post("/apply/loan", verifyToken, upload.single("image"), applyLoan);
router.get("/customer/requests", verifyToken, getAllCustomerRequests);
router.patch("/loan/status/:id", verifyToken, updateLoanStatus);
router.get("/loan/list", verifyToken, getUserLoanList);
router.get("/users/loan/list", verifyToken, getUserLoanListById);
router.patch("/loan/emi-status/:id",verifyToken, updateLoanEmiStatus);
module.exports = router;
