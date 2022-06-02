const express = require('express')
const req = require('express/lib/request')
const app = express()
const morgan = require('morgan')
const http = require('http');
const server = http.createServer(app);
// Socket IO
const { Server } = require("socket.io");
const io = new Server(server);
const connection = require('./model/connect')

require('dotenv').config()
const path = require('path')
const Route = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Logger
app.use(morgan('dev'))

// Static file 
app.use(express.static(path.join(__dirname, 'public')))


// Init Routes
Route(app)

//Socket IO
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('on-chat', data => {
        console.log(data)
        const d = new Date();
        let newDate = d.getDay()
        let dataInsert = {
            id:null,
            user_name: data.user_name,
            chat: data.message,
            chat_time: newDate
        }

        var sql = 'INSERT INTO chat SET ?';
           
        connection.query(sql,dataInsert, function (error, results, fields) {
            if (error) throw error;
            console.log('insert success');
        });
        io.emit('user-chat', data)
    })

    socket.on('on-typing', data => {
         io.emit('user-type', data)
    })

    socket.on('un-typing', data => {
        io.emit('user-untype', data)
   })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'))

server.listen(process.env.PORT, () => {
    console.log(`Example app listening on port http://localhost:${process.env.PORT}`)
})