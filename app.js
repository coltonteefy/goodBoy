const express = require('express');
const app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '/dist')));
const calendar = require(path.join(__dirname, '/dist/assets/calendar-events.json'));
const pets = require(path.join(__dirname, '/dist/assets/pets.json'));

app.get('/calendar', function(req, res) {
  res.json(calendar)
});

app.get('/pets', function(req, res) {
  res.json(pets)
});
// app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '/dist/index.html')))
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
});

var port = process.env.PORT || 3000;
app.listen(port, console.log("Listening on port 3000"));
