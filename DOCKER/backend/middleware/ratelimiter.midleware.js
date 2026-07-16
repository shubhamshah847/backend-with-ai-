import {redis} from '../src/app.js'


export const rateLimiter = async (req,res,next) => {
    const ip = req.ip
    //  console.log(ip)
    const key = `${ip}`

    const request = await redis.incr(key)

    if (request===1){
        await redis.expire(key,60)
    }
    if(request>5){
        res.status(429).json({
            message:"too many request"
        })
        
    }

    next()
}