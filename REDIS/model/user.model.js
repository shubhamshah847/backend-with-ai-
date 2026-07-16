import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true]

    },
    password:{
        type:String,
        requierd:[true]
    }
})


const userModel = mongoose.model('user',userSchema)

export default userModel