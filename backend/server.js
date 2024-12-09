const express = require("express");
const app = express()
const path  = require('path')
const dont  = require('dotenv')
const cors = require('cors');

dont.config({path : path.join(__dirname, 'config', 'config.env')})
const port  = process.env.PORT || 5000;

const register = require('./router/register');
const login = require('./router/login')
const getAll = require('./router/getAll')
const profile = require('./router/profile')
const newprofile  = require('./router/newpost')
const getsinglepost = require('./router/getsinlepost')
const deletepost = require('./router/deletepost')
const getallpost = require('./router/getallpost')
const singleuser = require('./router/singleuser')

const connection = require("./config/connection");
connection();



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://mern-social-media-frontend-ik8o.onrender.com");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/app', register)
app.use('/app',login)
app.use('/app', getAll )
app.use('/app', profile )
app.use('/app', newprofile)
app.use('/app',getsinglepost)
app.use('/app',deletepost)
app.use('/app', getallpost)
app.use('/app', singleuser)

app.listen(port, ()=>{
    console.log(port);
})