const express = require('express');

const router = express.Router();


const {getAllTodos,createTodo,getTaskDetails,editTaskDetails,deleteTask,completedTask,deleteAllTodos} = require("../controllers/todoController");

router.get("/all-tasks",getAllTodos);

router.post("/create",createTodo);

router.get("/:id",getTaskDetails);

router.put("/edit/:id",editTaskDetails);

router.delete("/delete/:id",deleteTask);

router.patch("/completed/:id",completedTask);

router.delete("/delete-all-tasks",deleteAllTodos)

module.exports = router;