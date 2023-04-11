const userModal = require("../modals/user.modal");
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ mes: "email and password required" })
    }

    try {
        const alReadyExits = await userModal.findOne({ email: email })

        if (alReadyExits) {
            return res.status(400).send({ mes: "Email exits" })
        }
      
        const salt=5;
        const hasSalt= bcrypt.genSaltSync(salt)
        const hasingPassword= bcrypt.hashSync(password,hasSalt)
        const newUser = new userModal({
            email,
            password:hasingPassword
        })

        await newUser.save()

        res.status(201).send({ mes: "Signup success" })
    } catch (error) {
        res.status(500).send({ mes: "Server error", err: error.message })
    }
}


const loginUser= async(req,res)=>{
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ mes: "email and password required" })
    }

    try {
        const isExitsts = await userModal.findOne({ email: email })

        if (!isExitsts) {
            return res.status(404).send({ mes: "User not found" })
        }

        const isPassMatch= bcrypt.compareSync(password,isExitsts.password)

        if(!isPassMatch){
            return res.status(400).send({ mes: "Invalid crdentials" })  
        }else{
            const payload= {userId:isExitsts._id}
            const token = jwt.sign(payload,process.env.SECRET_KEY);

            res.status(200).send({
                mes:"login success",
                token:token
            })
        }
    } catch (error) {
        res.status(500).send({ mes: "Server error", err: error.message })   
    }
}
module.exports={
    registerUser,
    loginUser
}