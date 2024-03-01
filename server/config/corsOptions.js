const allowedOrigins =require('./allowedOrigins')
const corsOptions = {
    origin: (origin, callback) => {
        if (allowed.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else {
            callback(new Error('not allwoed by cors'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 300
}

module.exports = corsOptions