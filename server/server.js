const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const pool = require('./config/dbConn')

app.use((req, res, next) => {
    req.db = pool;
    next()
});

app.use(logger)


app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))


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


/*

DATABASE RETRIEVE DATA

app.get('/users', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM users');
      const users = result.rows;
      client.release();
  
      res.json(users);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: err.message }); // Send the error message in the response
    }
  });

*/



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

app.use(errorHandler)

