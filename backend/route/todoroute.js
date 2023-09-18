const express = require("express")
const router = express.Router()
const TODO = require("../model/todoModel")
router.post("/add",async(req,res)=>{
    const {todo} = req.body
try{

  await  TODO.create({
        todo
    }) 
    res.status(200).json({
        success:true,
        todo
    })
}catch{
    res.status(500).json({
        success:false,

    })
}
})

router.get("/get",async(req,res)=>{
    
try{
 
   const alltodo =await TODO.find()
    res.status(200).json({
    success:true,
    alltodo
})
}
catch{
    res.json({success:false})
}
})

router.put("/update", async (req, res) => {
    const { todo, _id } = req.body;
    try {
      const updatedTodo = await TODO.findByIdAndUpdate(
        _id,
        {
          todo,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedTodo) {
        // Handle the case where the TODO item was not found
        return res.status(404).json({
          success: false,
          error: "TODO item not found",
        });
      }
  
      res.status(200).json({
        success: true,
        todo: updatedTodo, // Return the updated TODO item
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  });
  router.delete("/delete/:_id", async (req, res) => {
    const { _id } = req.params; // Get the _id from URL params
    try {
        const deletedTodo = await TODO.findByIdAndDelete(_id);
        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                error: "TODO item not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "TODO item deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
});



module.exports = router