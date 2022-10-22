// Require Path and Express Module..
const path = require('path');
const express = require('express');

// Init API..
const api = express();

// Use MiddleWare..
api.use(express.static(path.join(__dirname, 'public')));
api.use('/', express.static('index.html'));

// export API..
module.exports = api;