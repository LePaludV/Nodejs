      messages = [
        { 
          user:'Estragon',
          time: '10:56:37',
          content: "Tu m'as fait peur"
        },
        {
          user:'Vladimir',
          time: '10:56:55',
          content: "J'ai cru que c'était lui"
        },
        {
          user:'Estragon',
          time: '10:57:09',
          content: "Qui ?"
        },
        {
          user: 'Vladimir',
          time: '10:57:15',
          content: "Godot"
        },
        {
          user: 'Estragon',
          time: '10:57:47',
          content: "Pah ! Le vent dans les roseaux"
        }
      ];

      var appendMessage = function(message) {
        let divMessage = $("<div class='message'></div>");
        $(divMessage).append(`<div class='time'>${message.time}</div>`);
        $(divMessage).append(`<div class='user'>${message.user}</div>`);
        $(divMessage).append(`<div class='content'>${message.content}</div>`);
        $(divMessage).appendTo('#feed');
      }

      $(document).ready(function() {

        var username = window.prompt("What is your name ?","anonymous");

        messages.forEach(function(m) {
          appendMessage(m);
        });

        $('#sendMessage').submit(function(e) {
          e.preventDefault();
          let message = {
            time: new Date().toLocaleTimeString(),
            user: username,
            content: $('#message').val()
          };
          appendMessage(message);
          $("#message").val('');
          socket.emit('sendMessage', message);
          $("#message").val('');
        });

        //io stuff here
        var socket = io();
        socket.on('newMessage', function(msg){
            appendMessage(msg);
        });
    });