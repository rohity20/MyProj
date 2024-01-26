const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./userRoute');
const ItemRoute = require('./itemRoute');

const dotenv = require('dotenv');

dotenv.config({path:"config/config.env"});

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', userRoute);
app.use('/', ItemRoute);

mongoose.connect('mongodb://localhost/user-db').then(() => console.log("Database Connected")).catch((error) => console.log(error));

app.listen(4000, () => console.log("Server is running"));