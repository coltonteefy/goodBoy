const express = require('express');
const app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '/dist')));
const calendar = require(path.join(__dirname, '/dist/assets/calendar-events.json'));
const pets = require(path.join(__dirname, '/dist/assets/pets.json'));

app.get('/calendar', (req, res) => res.json(calendar))
app.get('/pets', (req, res) => res.json(pets))
app.get('/**', (req, res, next) => res.sendFile(path.join(__dirname, '/dist/index.html')))

app.listen(process.env.PORT || 3000, console.log("Listening on port 3000"));
