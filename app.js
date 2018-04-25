const express = require('express');
const app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '/dist')));
const calendar = require(path.join(__dirname, '/dist/assets/calendar-events.json'));
const pets = require(path.join(__dirname,'/dist/assets/pets.json'));


app.listen(process.env.PORT || 3000, console.log("Listening on port 3000"));
