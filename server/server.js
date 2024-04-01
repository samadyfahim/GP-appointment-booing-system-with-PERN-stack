require('dotenv').config();
const express = require('express')
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const bodyParser = require('body-parser');
console.log(process.env.NODE_ENV)
const patientController = require('./controllers/patientController');
const userController = require('./controllers/UserController');


const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
});
httpServer.listen(80);

const privateKey = fs.readFileSync('private.key', 'utf8');
const certificate = fs.readFileSync('certificate.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

const PORT = process.env.PORT || 5000 



app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

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

app.use('/', require('./routes/root'))

// Routes
app.get('/users', userController.getUsers);
app.post('/newUser', userController.createUser);
app.post('/login', userController.loginUser);
app.post('/patients', patientController.createPatient);




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


/*
    This sets the server to listen on the specified 
    port (either the one provided by the environment 
    variable PORT or the default port 3500) and logs a 
    message when the server is successfully started.
*/
app.listen(PORT, () => console.log(`server running on port ${PORT}`))
// httpsServer.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
app.use(errorHandler)

