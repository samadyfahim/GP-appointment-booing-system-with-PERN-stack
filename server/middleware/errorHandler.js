const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t$
    {req.method}\${req.url}\t${req.header.origin}`, 'errorLog.log')
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500
    res.json(status)
    res.json({message: err.message})
}

module.exports = errorHandler