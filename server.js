
// We require dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// Here we need to initialize express application
const app = express();
const PORT = process.env.PORT || 2020;

// Here we setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//Here require routes file
require('./routes/routes')(app);

// Here we are going to setup listener
app.listen(PORT, () => {
    console.log(`Note Taker app now listening on PORT: " ${PORT}`);
});  
