const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const faPromises = require('fs').promises
const path = require('path')


// need to be cited date formater
const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await faPromises.mkdir(path.join(__dirname, '..','logs'))
        }
        await faPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.header.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger}


