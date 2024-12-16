const mongoose = require("mongoose");

const loanListSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  loanAmount: {
    type: Number,
    required: true,
    trim: true,
  },
  tottleAmount: {
    type: Number,
    require: true,
  },
  detail: [
    {
      emiDate: {
        type: String,
        required: true,
        trim: true,
      },
      status: {
        type: String,
        required: true,
        trim: true,
      },
      monthlyEmi: {
        type: Number,
        required: true,
        trim: true,
      },
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

//Creating collection in data base
const UserLoanList = new mongoose.model("LoansList", loanListSchema);

module.exports = UserLoanList;
