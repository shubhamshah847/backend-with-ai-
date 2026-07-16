import express from 'express'
import userModel from '../model/user.model.js'
import connectedToDb from '../lib/db.js'
import Redis from 'ioredis'
import { rateLimiter } from '../middleware/ratelimiter.midleware.js'
import {sendEmail} from '../lib/sendemail.js'
import emailQueue from '../queue.js'

const app = express()

export const redis = new Redis('redis://localhost:6379')

connectedToDb()
app.use(express.json())

app.get('/',(req,res)=>{
    console.log('hello working')
})
app.post('/create',async(req,res)=>{
    const {username,password} = req.body

    await redis.del("user:all")
    
    

    try{
    const user = await userModel.create ({
        username,password
    })

   await emailQueue.add('send-email',{username})
   //                   job         data  
    res.json({
        message:"job created"
    })
    
}
catch(err){
    return console.log(err.message)
}    
})

app.get('/get',rateLimiter, async(req,res)=>{
    try{
    const data = await redis.get("user:all")
    if(data){
        const user = JSON.parse(data)
        return res.status(200).json(user)
    }
    const alluser = await userModel.find({})
    await redis.set("user:all",JSON.stringify(alluser))

   return res.json(alluser)
    }
    catch(err){
        console.log("error:",err.message)
    }
})

app.post('/send-otp',async(req,res)=>{
    const {username} = req.body
    const otp = Math.floor(10000+ Math.random()*90000).toString()
    await redis.set(`otp:${username}`,otp,"EX",30)
    return res.json(otp)
})

app.post('/verify-otp', async(req,res)=>{
    const {username,otp} = req.body
    const cachedOtp = await redis.get(`otp:${username}`)
    
    if(!otp ,!username){
        res.json({
            message:"otp or username required"
        })
    }
    if(cachedOtp != otp){
        res.status(400).json({
            message:"incorrect or expired otp"
        })
    }

    await redis.del(`otp:${username}`)
    return res.status(200).json({
    message:"otp verified"
    })
})



export default app