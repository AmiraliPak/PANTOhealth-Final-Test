const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_URL;

const connect = async () => {
    await mongoose.connect(mongo_url);
    console.log("MongoDB connected");
}

module.exports = {connect}