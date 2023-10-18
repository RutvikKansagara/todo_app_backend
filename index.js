const express = require("express");
const app = express();

const dotenv = require("dotenv").config();

const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
const connectToDb = require("./config/db");
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// Set up CORS to allow only specific origins
const corsOptions = {
    origin: "https://todo-app-frontend-gilt.vercel.app", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
    optionsSuccessStatus: 204, 
  };
app.use(cors(corsOptions));


connectToDb();

const PORT = process.env.PORT || 3000;

app.use("/api/todos",todoRoutes);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});