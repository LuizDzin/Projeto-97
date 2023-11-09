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

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
  roomNames = childKey;
  console.log("Nome da Sala - " + roomNames);
  row = "<div class='room_name' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
  document.getElementById("output").innerHTML += row;
});
});

}

function addRoom() {
room_name = document.getElementById("room_name").value;

firebase.database().ref("/").child(room_name).update({
purpose : "adding room name"
});

localStorage.setItem("room_name", room_name);

window.location = "kwitterPage.html";
}


getData();

function redirectToRoomName(name) {
console.log(name);
localStorage.setItem("room_name", name);
window.location = "kwitterRoom.html";
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("room_name");

window.location = "index.html";
}