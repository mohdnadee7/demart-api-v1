const customerDetail = require("../models/customer");
const UserLoanList = require("../models/userLoanList");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret, // Click 'View Credentials' below to copy your API secret
});

const applyLoan = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const {
      firstName,
      lastName,
      dob,
      fatherName,
      phoneNumber,
      city,
      address,
      loanAmount,
      loanTerms,
      status,
    } = req.body;
    const userId = req.userId;
    const createStudentRecord = new customerDetail({
      firstName,
      lastName,
      dob,
      fatherName,
      phoneNumber: Number(phoneNumber),
      city,
      address,
      profileImage: { id: result.public_id, url: result.url },
      loanAmount,
      loanTerms,
      status,
      userId,
    });
    console.log("body", req.body);
    const studentCreated = await createStudentRecord.save();
    res.status(201).send(studentCreated);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllCustomerRequests = async (req, res) => {
  try {
    console.log(req.userId, "req.userId");
    const students = await customerDetail.find({});
    res.status(200).send(students);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateLoanStatus = async (req, res) => {
  try {
    const _id = req.params.id;
    const { status, userId, startDate, interest } = req.body;
    const setLoanStatus = {
      status,
    };
    console.log(_id, setLoanStatus);
    if (status === "Approved") {
      function generateEmiDates(startDateStr, numEmis) {
        // Convert start date string to Date object
        const startDate = new Date(startDateStr);

        // Array to hold EMI dates
        const emiDates = [];

        // Iterate to generate each EMI date
        for (let i = 0; i < numEmis; i++) {
          // Create a new date for each EMI by adding months
          const emiDate = new Date(startDate);
          emiDate.setMonth(startDate.getMonth() + i);

          // Format the date as 'dd,mmm,yyyy'
          const formattedDate = emiDate
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            .replace(/ /g, ",");

          emiDates.push(formattedDate);
        }

        return emiDates;
      }

      // Example usage:
      const result = [];
      const detail = await customerDetail.findById(_id);
      const numEmis = detail.loanTerms;
      const emiDates = generateEmiDates(startDate, numEmis);
      console.log("detail", detail.loanTerms);
      const interestAmount = detail.loanAmount * (interest / 100);
      const total = detail.loanAmount + interestAmount;
      const monthlyEmi = total / detail.loanTerms;
      emiDates.forEach((date) => {
        result.push({
          monthlyEmi: monthlyEmi,
          emiDate: date,
          status: "unpaid",
        });
        console.log(date, monthlyEmi);
      });
      const loanDetail = {
        userId: userId,
        loanAmount: detail.loanAmount,
        tottleAmount: total,
        detail: result,
      };
      const createLoan = new UserLoanList(loanDetail);
      await createLoan.save();
      const response = await customerDetail.findByIdAndUpdate(
        _id,
        setLoanStatus,
        { new: true }
      );
      res.status(200).send(response);
    } else {
      await UserLoanList.deleteOne({ userId: userId });
      const result = await customerDetail.findByIdAndUpdate(
        _id,
        setLoanStatus,
        { new: true }
      );
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUserLoanList = async (req, res) => {
  try {
    const userId = req.userId;
    const loanList = await UserLoanList.aggregate([
      { $match: { userId: userId } },
    ]);
    console.log("loanList", loanList);
    res.status(200).send(loanList);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUserLoanListById = async (req, res) => {
  try {
    const userId = req.query.id;
    console.log(userId, "userId,userId");
    const loanList = await UserLoanList.aggregate([
      { $match: { userId: userId } },
    ]);
    console.log("loanList", loanList);
    res.status(200).send(loanList);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateLoanEmiStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const { index, status } = req.body;
    console.log(index, status);
    const result = await UserLoanList.updateOne(
      { userId }, // Filter to find the specific loan document
      {
        $set: {
          [`detail.${index}.status`]: status, // Update the status at the given index
        },
      }
    );
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};
module.exports = {
  applyLoan,
  getAllCustomerRequests,
  updateLoanStatus,
  getUserLoanList,
  getUserLoanListById,
  updateLoanEmiStatus,
};
