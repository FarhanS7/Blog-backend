const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`DB Connected success`);
  } catch (error) {
    console.log(`Error connecting to MongoDb ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
