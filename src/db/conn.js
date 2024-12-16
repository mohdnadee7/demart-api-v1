const mongoose = require("mongoose");

uri =
 "mongodb+srv://js4368621:QlsmnziWRHks69ci@cluster0.ch28xho.mongodb.net/bankapp?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = () => {
    console.log("connect db")
  return mongoose.connect(uri);
};

module.exports={connectDB};

