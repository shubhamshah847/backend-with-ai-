import dotenv from 'dotenv'
dotenv.config()


import express from 'express'


const app = express()



app.use(express.json())

app.get('/',(req,res)=>{
    res.json({ message: 'hello from order service'})
})




app.listen(process.env.PORTS,(req,res)=>{
    console.log(`server is running at ${process.env.PORTS} port`)
})