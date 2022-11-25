const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const config = require('./config/db');
const account = require('./routes/account');
const Post = require('./models/post')

const app = express();

const port = process.env.PORT;

app.use(passport.initialize());

require('./config/passport')(passport);

app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

const startServer = () => {
    app.listen(port, () => {
        console.log("The server was running on the port: " + port)
    })
}

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log("Successful connection to the database")
})

mongoose.connection.on('error', (err) => {
    console.log("Not successful connection to the database ")
})

mongoose.connection.once('open', startServer)




app.get('/', (req, res)=>{
    Post.find().then( posts => res.json(posts))
})

app.get('/post/:id', (req, res)=>{
    let url = req.url.split('/')
    id = url[2]
    Post.findById(id).then( post => res.json(post))
})

app.delete('/post/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{
    let url = req.url.split('/')
    id = url[2]
    Post.deleteOne({_id: id}).then( () => res.json({success: true}))
})

app.use('/account', account)
