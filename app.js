const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8080;
app.use(express.json());

require('./routes/config')(app);
mongoose.connect('mongodb://localhost/school_test_db');

app.listen(PORT);
console.log(`Listening on Localhost: ${PORT}`);