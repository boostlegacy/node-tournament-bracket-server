const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bracket = require('../node-tournament-bracket');

let teams = [];

for(let i = 1; i <= 200; i++){
    teams.push(new bracket.Team({name:i.toString(), seed:i}))
}

let b = new bracket.Bracket({teams:teams});

for(let i = 1; i <= b.rounds; i++){
  let round = b.get_round(i);
  for(let node of round){
    node.declare_single_win("upper");
    //node.
  }
}
console.log(b.teams['1'].rounds);

server.listen(8080);

/*
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
*/

io.on('connection', function (socket) {
    socket.on('getBracket', () => {
        socket.emit('bracket', {teams:b.teams, best_of:b.default_best_of, type:b.type});
    });
/*
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
*/

});