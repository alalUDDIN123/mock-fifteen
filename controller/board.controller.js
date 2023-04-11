const SubTaskModal = require("../modals/Subtask.modal");
const boardModal = require("../modals/board.modal");
const TaskModal = require("../modals/task.modal");


const createAboard = async (req, res) => {
    const { SubTitle, isCompleted, TaskTitle, description, status, name } = req.body;
    // console.log("isCompleted:-",isCompleted)

    if (!SubTitle) {
        return res.status(400).send({ mes: "Please provide sub task title" })
    }
    if (!TaskTitle) {
        return res.status(400).send({ mes: "Please provide task title" })
    }
    if (!description) {
        return res.status(400).send({ mes: "Please provide description" })
    }
   
    try {
        // creating subtask
        const subtask = new SubTaskModal({
            title: SubTitle,
            isCompleted
        })
        const savedSub = await subtask.save();

        // creating task
        const taskCreate = new TaskModal({
            title: TaskTitle,
            description,
            status,
            subtask: [savedSub._id]
        })
        const savedTask = await taskCreate.save();

        // creating board
        const createBoard = new boardModal({
            name,
            tasks: [savedTask._id]
        })
        const data = await createBoard.save();

        res.status(201).send({ mes: "Board created", data });
    } catch (error) {
        res.status(500).send({ mes: "Server error", error });
    }
}


// gettting

const getBoardsData=async(req,res)=>{

 try {
    const SubData= await SubTaskModal.find({});
    const Tasksdata= await TaskModal.find().populate("subtask");

    const boardData= await boardModal.find().populate({
        path:"tasks",
        populate:{
            path:"subtask"
        }
    });

    if(SubData.length===0 && Tasksdata.length===0 && boardData.length===0){
        return res.status(404).send({ mes: "Data not found" }) 
    }

     const formatData=boardData.map((board)=>({
        name:board.name,
        tasks:board.tasks.reduce((acc,task)=>{
            const TaskFound= Tasksdata.find((ta)=>ta._id.equals(task._id));

            if(!TaskFound) return acc;

            const subtasks=TaskFound.subtask.reduce((acc,sub)=>{
                const FoundSubs= SubData.find((su)=>su._id.equals(sub._id));

                if(!FoundSubs) return acc;

                return [
                    ...acc,
                    {
                        title:FoundSubs.title,
                        isCompleted:FoundSubs.isCompleted

                    },
                ]
            },[])

            return [
                ...acc,
                {
                    title:TaskFound.title,
                    description:TaskFound.description,
                    status:TaskFound.status,
                    subtasks
                },

            ]
        },[])
     }))

     res.status(200).send(formatData)
 } catch (error) {
    res.status(500).send({ mes: "Server error", error });
 }

}
module.exports={
    createAboard,
    getBoardsData
}