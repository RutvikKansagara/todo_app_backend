const mongoose = require("mongoose");

const dotenv = require("dotenv").config();

const connectToDb = () => {

    try {
        const MONGO_URI = process.env.MONGO_URI;

        mongoose.connect(MONGO_URI);
        console.log("-----------------------successfully connected to database------------------------")
    } catch (error) {
        console.log(error);
        console.log("error connecting to database");
        process.exit();
    }
}

module.exports = connectToDb;