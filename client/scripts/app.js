  var app = {};
  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    //"'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  var escapeHtml = function (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s];
    });
  };
  
  app.init = function (data) {
    for (let i = 0; i < data.results.length; i++) {
      var username = data.results[i].username;
      var text = escapeHtml(data.results[i].text);
      var timeStamp = data.results[i].createdAt;
      var $message = `<p><div class="username">Username: ${username} </div> <br/>Message: ${text} <br/>Time Stamp: ${timeStamp}  Room:</p>`;
      $('#chats').append($message);
    }
  };

  $(document).ready(function() {
  
  //message object
    var message = {
      username: user,
      text: null,
      roomname: null
    };
    
    var messageData = {};
  
  //add messages to page????
  // var addMessages = function(data) {
  //   for (let i = messageData.length - 1; i >= 80; i--) {
  //     var $message = '${data[i].username} : ${data[i].text} ${data[i].createdAt}<p>';
  //     $('#chats').append($message);
  //     //console.log(messageData);
  //   }
  // };
  
  //submit message
    $('#submit').click(function() {
      message.text = $('#message').text();
  //post request to send a message
      $.ajax({
      // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });  
    });

      
  
  
  //get request to receive income messages
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      //headers: {'Access-Control-Allow-Origin *'},
      success: function (data) { 
        app.init(data);
        //console.log(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('no data :(', data);
      }
    });  
  
  
  
  

  
  
//don't touch me
  });

//how do we add the incoming message
  //get the data from the server

//display
 //username
 //message
 

 
 