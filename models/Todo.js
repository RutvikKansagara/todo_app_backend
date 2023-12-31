const mongoose = require("mongoose");

const dotenv = require("dotenv").config();

const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim:true
    },
    description: {
      type: String,
      required: true,
      trim:true
    },
    isCompleted: {
      type: Boolean,
      default:false
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo",TodoSchema);

module.exports = Todo;