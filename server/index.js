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

const DB = process.env.DATABASE
const PORT = process.env.PORT || 4000 


mongoose.connect(DB).then(() => console.log("Database Connected")).catch((error) => console.log(error));

app.listen(PORT, () => console.log("Server is running"));