
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAUTqq713utywkZZk4hgmk4ihyl8rwrRnw",
    authDomain: "train-scheduler-4b8ab.firebaseapp.com",
    databaseURL: "https://train-scheduler-4b8ab.firebaseio.com",
    projectId: "train-scheduler-4b8ab",
    storageBucket: "",
    messagingSenderId: "440969081330"
};
firebase.initializeApp(config);

var database = firebase.database()


$("#submitBTN").on("click", function (event) {
    event.preventDefault();
    //input fields
    var trainName = $("#trainName").val().trim()
    var trainDest = $("#trainDest").val().trim()
    var trainTime = $("#trainTime").val().trim()
    var trainFreq = $("#trainFreq").val().trim()
    console.log(trainName)
    console.log(trainDest)
    console.log(trainTime)
    console.log(trainFreq)

    //add input to database
    database.ref().push({
        trainName: trainName,
        trainDest: trainDest,
        trainTime: trainTime,
        trainFreq: trainFreq
    })

    //clear input
    $("#trainName, #trainDest, #trainTime, #trainFreq").val("")
})

database.ref().on("child_added", function (childSnapshot, prevChildKey) {
        var newTrain = childSnapshot.val().trainName
        var newDest = childSnapshot.val().trainDest
        var newTime = childSnapshot.val().trainTime
        var newFreq = childSnapshot.val().trainFreq

        var startTimeConv = moment(newTime, "hh:mm").subtract(1, "years")

        var currentTime = moment()

        var diffTime = moment().diff(moment(startTimeConv), "minutes")

        var timeRem = diffTime % newFreq

        var tMinutesTillTrain = newFreq - timeRem

        var nextTrain = moment().add(tMinutesTillTrain, "minutes")

        var getTrain = moment(nextTrain).format("HH:mm")
            
            $('#train').append("<p>"+newTrain+ "</p>")
            $('#destination').append("<p>"+newDest+ "</p>")
            $('#frequency').append("<p>"+newFreq+ "</p>")
            $('#arrival').append("<p>"+getTrain+ "</p>")
            $('#distance').append("<p>"+tMinutesTillTrain+ "</p>")
        })

