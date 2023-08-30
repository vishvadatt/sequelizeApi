const express = require('express');
const bodyParser = require('body-parser');
require('./config/db');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());
const routes = require('./routes/route');
app.use('/api',routes);



app.listen(8000,() => {
    
    console.log("Server Running on 8000");
})