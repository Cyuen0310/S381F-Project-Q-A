const mongoose = require("mongoose");
const uri =
  "mongodb+srv://cyuen:3dsd1014@cluster0.gcrydv5.mongodb.net/?retryWrites=true&w=majority";

async function connectdb() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectdb;
