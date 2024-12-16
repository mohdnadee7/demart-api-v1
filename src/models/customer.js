const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    require: true,
  },
  fatherName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  profileImage: {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    id: {
      type: String,
      required: true,
      trim: true,
    },
  },
  loanAmount: {
    type: Number,
    require: true,
    trim: true,
  },
  loanTerms: {
    type: Number,
    require: true,
    trim: true,
  },
  status: {
    type: String,
    require: true,
    trim: true,
  },
  userId: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

//Creating collection in data base
const StudentDetail = new mongoose.model("CustomertDetail", customerSchema);

module.exports = StudentDetail;
