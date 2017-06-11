
var config = {
    apiKey: "AIzaSyAsD1hh1cZc5C96HuKAemRtU2wPyQYVDBc",
    authDomain: "train-scheduler-d8bcc.firebaseapp.com",
    databaseURL: "https://train-scheduler-d8bcc.firebaseio.com",
    storageBucket: "train-scheduler-d8bcc.appspot.com",
    messagingSenderId: "947249886049"
};
firebase.initializeApp(config);
var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTime = $("#first-input") .val();
  var frequency = $("#frequency-input") .val();
  // Creates local "temporary" object for holding employee data
  var train = {
    name: trainName,
    destination: trainDestination,
    first: firstTime,
    often: frequency,
    
  };

  // Uploads employee data to the database
        database.ref().push({
          name: trainName,
          destination: trainDestination,
          frequency: frequency,
          first: firstTime
      });
  
  console.log(train.name);
  console.log(train.destination);
  console.log(train.often);
  console.log(train.first);

  // Alert
  alert("Train Added");
  // Clears all of the text-boxes 
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var tname = childSnapshot.val().name;
  var tdestination = childSnapshot.val().destination;
  var toften = childSnapshot.val().frequency;
  var tfirst = childSnapshot.val().first
  

//maths

  var firstTimeConverted = moment(tfirst,"hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % toften;
  var tminutesRemaning = toften - tRemainder;
  var nextTrain = moment().add(tminutesRemaning, "minutes");
  var nextTime = moment(nextTrain).format("hh:mm");

  // Add each train's data into the table
  $("tbody").append("<tr><td>" + tname + "</td><td>" + tdestination + "</td><td>" + toften + "</td><td>" + nextTime + "</td><td>" + tminutesRemaning + "</td></tr>");
});









