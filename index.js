const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bracket = require('../node-tournament-bracket');

let teams = [];

for(let i = 1; i <= 7; i++){
    teams.push(new bracket.Team({name:i.toString(), seed:i}))
}

let b = new bracket.Bracket({teams:teams});

server.listen(8080);

/*
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
*/

io.on('connection', function (socket) {
    socket.on('getTeams', () => {
        socket.emit('teams', b.teams);
    });
/*
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
*/

});