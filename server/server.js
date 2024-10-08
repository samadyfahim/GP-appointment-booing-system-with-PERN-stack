require('dotenv').config();
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const bodyParser = require('body-parser');
const cron = require("node-cron");
const sendAppointmentReminders = require('./services/reminderService'); // Your reminder service


console.log(process.env.NODE_ENV);

// Middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

/*
    This middleware serves static files from the "public" directory when a request is made to the root URL ("/"). 
    For example, if there is a file named "styles.css" in the "public" directory, it can be accessed at "/styles.css".

*/
app.use('/', express.static(path.join(__dirname, '/public')))



/*
    This sets up a route using the external 
    routing module defined in the file "./routes/root.js". 
    The routes defined in that file will be prefixed with "/" (root).
*/

// app.use('/', express.static(path.join(__dirname, '/rout')))





const routesDir = path.join(__dirname, 'routes');

fs.readdirSync(routesDir).forEach(file => {
    if (file.endsWith('Routes.js')) {
        const route = require(path.join(routesDir, file));
        app.use(`/api/`, route);
    }
});


/*
    handle if a request is noe exist
    If the client prefers HTML, it sends the "404.html" file.
    If the client prefers JSON, it sends a JSON response with a 404 message.
    If the client prefers plain text, it sends a plain text response with a 404 message.
*/


app.all('*', (req , res) => {
    res.status(404)
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')){
        res.json({message: '404 not found json'})
    }else{
        res.type('txt').send('404 not found')
    }
})


// Set up HTTPS server
const privateKeyPath = 'server.key';
const certificatePath = 'server.crt';

// if (fs.existsSync(privateKeyPath) && fs.existsSync(certificatePath)) {
//     const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
//     const certificate = fs.readFileSync(certificatePath, 'utf8');
//     const credentials = { key: privateKey, cert: certificate };

//     const PORT = process.env.PORT || 5000;
//     const httpsServer = https.createServer(credentials, app);
//     httpsServer.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// } else {
//     console.error('Missing SSL certificate or private key.');
// }

setInterval(() => {
  console.log("Checking for upcoming appointments...");
  sendAppointmentReminders.sendAppointmentReminders;
}, 60 * 60 * 1000); 




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`))

app.use(errorHandler)

