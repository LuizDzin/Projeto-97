var firebaseConfig = {
  apiKey: "AIzaSyAJny7qqDebHqbLaAKziGFYbxKn_QYgWkg",
  authDomain: "projeto-93-b345d.firebaseapp.com",
  databaseURL: "https://projeto-93-b345d-default-rtdb.firebaseio.com",
  projectId: "projeto-93-b345d",
  storageBucket: "projeto-93-b345d.appspot.com",
  messagingSenderId: "50190038277",
  appId: "1:50190038277:web:8eb1baaf3977b626a0336c"
};


firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("userName");
roomName = localStorage.getItem("room_name")

function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
     firebaseMessageId = childKey;
     messageData = childData;

     console.log(firebaseMessageId);
     console.log(messageData);
     name = messageData["name"]
     message = messageData["message"]
     like = messageData["like"]
     nameWithTag = "<h4> " + name + "<img class='user_tick' src='tick.png'> </h4>";
     messageWithTag = "<h4 class='message_h4'> " + message + "</h4>";
     likeButton = "<button class='btn btn-warning' id="+ firebaseMessageId +" value="+ like +" onclick='updateLike(this.id)'>";
     spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

     row = nameWithTag + messageWithTag + likeButton + spanWithTag;
     document.getElementById("output").innerHTML += row;
  } });  }); }      
getData();

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("room_name");

  window.location = "index.html";
 }

 function send() {
msg = document.getElementById("msg").value;
firebase.database().ref(roomName).push({
  name:userName,
  message:msg,
  like:0
});

document.getElementById("msg").value = "";
 }

 function updateLike(messageId) {
console.log("botão like pressionado - " + messageId);
button_id = messageId;
likes = document.getElementById("button_id").value;
updateLikes = Number(likes) + 1;
console.log(updateLikes);

firebase.database().ref(roomName).child(messageId).update({
  like: updateLikes
});
 }
