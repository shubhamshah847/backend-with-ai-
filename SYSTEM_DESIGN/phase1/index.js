import dotenv from 'dotenv'
dotenv.config()
import app from './src/app.js'


app.listen(3000,(req,res)=>{
    console.log('server is running at 3000 port')
})