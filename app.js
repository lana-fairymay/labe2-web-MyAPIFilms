// Require packages and set the port
const express = require('express');
const port = 8080;
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');
//app.use(express.static(path.join(__dirname, '/public')));
 
// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
 
routes(app);
 
// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Example app listening at http://localhost:${port}`);
    console.log(`Server listening on port ${server.address().port}`);
});

