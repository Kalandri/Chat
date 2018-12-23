var express = require("express")
var app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

server = app.listen(3000)
var io = require("socket.io")(server)

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.username = "Anonymous"

    socket.on('change_username', (data) => {
        console.log(socket.username + " changed name to " + data.username)
        socket.username = data.username
    })

    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message: data.message, username: socket.username})
    })
})
