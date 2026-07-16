import mongoose from 'mongoose'

const connectedToDb = async () => {
    
    try{
    await mongoose.connect('mongodb+srv://test123:test123@cluster0.aftlq0o.mongodb.net/user123')
    console.log('mongoose connected')
    }
    catch(err){

        console.log('not connected mongoose : ',err.message)
    }
}

export default connectedToDb

