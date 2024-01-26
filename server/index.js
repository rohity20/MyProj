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

DATABASE= "mongodb+srv://2020rohityadav:n2m2BcifvtsAp1Rr@cluster0.p8tskvl.mongodb.net/?retryWrites=true&w=majority"

const DB = process.env.DATABASE
const PORT = process.env.PORT || 4000 


mongoose.connect(DATABASE,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(() => console.log("Database Connected")).catch((error) => console.log(error));

app.listen(PORT, () => console.log("Server is running"));