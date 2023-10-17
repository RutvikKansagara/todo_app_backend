const Todo = require("../models/Todo");

const mongoose = require("mongoose");

const getAllTodos = async (req,res) => {
    try {
        const allTasks = await Todo.find({});
        if(allTasks.length === 0){
        return res.status(200).json({status:"success",message:"you does not created any tasks till now"});

        }
        res.status(200).json({status:"success",message:"all tasks fetched successfully",allTasks});
    } catch (error) {
        console.log(error);
        console.log("----------------------------------------------------------------");
        console.log(error.message);
        console.log("----------------------------------------------------------------");
        console.log(error.response);
        console.log("----------------------------------------------------------------");
        res.status(500).json({status:"error",message:error.message});
    }
}

const createTodo = async (req,res) => {
   try {
    
    const {name,description} = req.body;
    const newTask = await Todo.create({name,description});
    res.status(201).json({status:"success",message:"new task created successfully"});

   } catch (error) {
     console.log(error);
     console.log("----------------------------------------------------------------");
     console.log(error.message);
     console.log("----------------------------------------------------------------");
     console.log(error.response);
     console.log("----------------------------------------------------------------");
     res.status(500).json({status:"error",message:error.message});
   }
}

const getTaskDetails = async (req,res) => {
    try {
        const id = req.params.id;
        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "error", message: "Invalid ID format" });
        }
     const taskDetails = await Todo.findOne({_id:id});
     if (!taskDetails) {
        // If the task with the given ID is not found
        return res.status(404).json({ status: "error", message: "Task not found" });
    }
     res.status(200).json({status:"success",message:"task details fetched successfully",taskDetails:taskDetails});
    } catch (error) {
        console.log(error);
        console.log("----------------------------------------------------------------");
        console.log(error.message);
        console.log("----------------------------------------------------------------");
        console.log(error.response);
        console.log("----------------------------------------------------------------");
        res.status(500).json({status:"error",message:error.message});
    }
}

const editTaskDetails = async (req,res) => {
    try {
        const id = req.params.id;
        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "error", message: "Invalid ID format" });
        }
        const updatedTaskObj = req.body;
        const updateTask = await Todo.findByIdAndUpdate({_id:id},updatedTaskObj);

        if (!updateTask) {
            // If the task with the given ID is not found
            return res.status(404).json({ status: "error", message: "Task not found" });
        }
        res.status(200).json({status:"success",message:"task updated successfully"});

    
    } catch (error) {
        console.log(error);
        console.log("----------------------------------------------------------------");
        console.log(error.message);
        console.log("----------------------------------------------------------------");
        console.log(error.response);
        console.log("----------------------------------------------------------------");
        res.status(500).json({status:"error",message:error.message});
    }
}


const deleteTask = async (req,res) => {
    try {
      const id = req.params.id;
      // Check if the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: "error", message: "Invalid ID format" });
    }
      const deleteTask = await Todo.findByIdAndDelete({_id:id});

      if (!deleteTask) {
        // If the task with the given ID is not found
        return res.status(404).json({ status: "error", message: "Task not found" });
    }
      res.status(200).json({status:"success",message:"task deleted successfully"});
    } catch (error) {
        console.log(error);
        console.log("----------------------------------------------------------------");
        console.log(error.message);
        console.log("----------------------------------------------------------------");
        console.log(error.response);
        console.log("----------------------------------------------------------------");
        res.status(500).json({status:"error",message:error.message});
    }
}

const completedTask = async (req,res) => {
    try {
        
     const id = req.params.id;
     
     // Check if the provided ID is a valid ObjectId
     if (!mongoose.Types.ObjectId.isValid(id)) {
        
        return res.status(400).json({ status: "error", message: "Invalid ID format" });
    }
     const task = await Todo.findById(id);

     // Check if the task exists
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
     task.isCompleted = true;
     await task.save();
     res.status(200).json({status:"success",message:"task marked as completed successfully"});
    } catch (error) {
        console.log(error);
        console.log("----------------------------------------------------------------");
        console.log(error.message);
        console.log("----------------------------------------------------------------");
        console.log(error.response);
        console.log("----------------------------------------------------------------");
        res.status(500).json({status:"error",message:error.message});
    }
}

const deleteAllTodos = async (req,res) => {
    try {
        await Todo.deleteMany({});
        res.status(200).json({status:"success",message:"all tasks deleted successfully"});
    } catch (error) {
        console.log(error);
        console.log("----------------------------------------------------------------");
        console.log(error.message);
        console.log("----------------------------------------------------------------");
        console.log(error.response);
        console.log("----------------------------------------------------------------");
        res.status(500).json({status:"error",message:error.message});
    }
}
module.exports = {getAllTodos,createTodo,getTaskDetails,editTaskDetails,deleteTask,completedTask,deleteAllTodos};