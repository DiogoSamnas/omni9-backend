const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');

const socketio = require("socket.io",{
    cors:{
        origin:'*',
        methods: "*",
        allowedHeaders: "*"
    }
});
const http = require('http')

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server,{
    cors:{
       origins: "*", 
    }
});


io.on('connection', socket =>{
    console.log('Usuário conectado', socket.id);

    socket.on('omni',data=>{
        console.log(data)
    })
});

mongoose.connect('mongodb+srv://omniman:omniman1911@omni9.c7xyt.mongodb.net/omni9?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(routes)

server.listen(3333);