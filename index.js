var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){


socket.on('inscription', function(pseudo) {
    socket.pseudo = pseudo;
    console.log("Connexion : " + pseudo)
    socket.on('disconnect', function(){
       console.log('Déconnexion : ' + pseudo);
       socket.broadcast.emit('disconnect_player', + pseudo );
    });
    socket.broadcast.emit('new_player', + socket.pseudo );
});

socket.on('buzz', function (message) {
    console.log(socket.pseudo);
    socket.broadcast.emit('late', socket.pseudo +' a la main.');
});


socket.on('release', function () {
    socket.emit('release');
});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    
