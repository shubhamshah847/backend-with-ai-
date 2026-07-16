import dotenv from 'dotenv'
dotenv.config()
import proxy from 'express-http-proxy'

import express from 'express'



const app = express()

app.use(express.json());

app.use('/auth',proxy('http://auth-services:2002'));
app.use('/product',proxy('http://product-services:2003'));
app.use('/order',proxy('http://order-services:2001'));


app.get('/',(req,res)=>{
    res.json({ message: `hello from ${process.env.SERVICE_NAME}` })
})


app.listen(process.env.PORT,(req,res)=>{
    console.log(`server is running at ${process.env.PORT} port`)
})