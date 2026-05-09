    const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const addNewClassRoutes = require('./routes/addNewClass.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', userRoutes);
app.use('/', addNewClassRoutes);




module.exports = app;