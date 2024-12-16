const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

//Creating collection in data base
const StudentDetail = new mongoose.model("StudentDetail", studentSchema);

module.exports = StudentDetail;
