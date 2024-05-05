const express = require('express');
const cors = require('cors');
const menuitemsRouter = require('./routes/menuitems');
const users = require('./routes/users');

const app = express();

app.use(express.json());

app.use(express.static('public')) 


app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',
    '127.0.0.1:3306',
    'http://127.0.0.1:3306',
    'http://172.16.5.18:8080',
    'http://172.16.5.18:80',
    'http://localhost:5173',
    'http://localhost:8080',
    'http://localhost:8080:80',
    'http://localhost:8088',
    'http://172.16.4.10:8080',
    'http://172.16.4.10:8088',
    'http://172.16.4.10:80',
    'http://172.16.7.190:8080',
    'http://172.16.7.190:8088',
    'http://172.16.7.190:3306',
    'http://172.16.7.190:80',
    'http://172.16.7.190',
    'http://172.16.7.190/',
    'http://172.16.7.190:5173',
    'https://simple-express-api.onrender.com'
  ]
}));


app.use('/api/menuitems', menuitemsRouter);
app.use('/api/users', users);

module.exports = app;