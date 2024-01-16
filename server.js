const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	setInterval(() => {
		socket.emit('number', parseInt(Math.random() * 10));
	}, 1000);
});

server.listen(3000, () => {
	console.log('listening on port:3000');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
