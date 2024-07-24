const mongoose = require("mongoose");

const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(
    `mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASSWORD_MONGODB}@cluster0.gbhagyg.mongodb.net/${process.env.DB_NAME}`
  );
};
module.exports = connectToDatabase;
