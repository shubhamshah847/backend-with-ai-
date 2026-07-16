import express from 'express'
import userModel from '../model/user.model.js'
import connectedToDb from '../lib/db.js'

const app = express()


connectedToDb()
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({ message: `hello from ${process.env.SERVER_NAME}` })
})


export default app