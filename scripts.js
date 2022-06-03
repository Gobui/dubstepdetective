const mydata = JSON.parse(JSON.stringify(data));

document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    confirmAnswer();
  } else {
      document.getElementById("response").innerHTML = "";
  }
});

function confirmAnswer() {
    if (document.getElementById("guessField").value.toUpperCase() == mydata[getTodaysNumber()].SongName.toUpperCase()){
        showResponse(true);
    } else {
        showResponse(false);
    }
}

var song = new Audio('./Songs/' + addZerosBeforeNumber(getTodaysNumber()) + '.mp3')

function playSong() {
    song.volume = .5;
    song.play();
}

function getTodaysNumber(){
    var date1 = new Date();
    var date2 = new Date("06/03/22");
    
    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - date2.getTime();
    
    // To calculate the no. of days between two dates
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    return Difference_In_Days;
}

function addZerosBeforeNumber(number) {
    var s = "000" + number;
    return s.substr(s.length-3);
}

function showResponse(guessedCorrectlyBoolean) {
    const responseElement = document.getElementById("response");
    const contentElement = document.getElementById("content");
    para = document.createElement("p");
    node = document.createTextNode("");
    
    if (guessedCorrectlyBoolean){
        document.getElementById("content").innerHTML = "";
        node = document.createTextNode("Correct! The answer was " + mydata[getTodaysNumber()].SongName + " by " + mydata[getTodaysNumber()].ArtistName);
        para.appendChild(node);
        contentElement.appendChild(para);
        
        var iframe = document.createElement('iframe');
        iframe.src = mydata[getTodaysNumber()].SourceLink;
        iframe.width = "560";
        iframe.height="315";
        contentElement.appendChild(iframe);
        
    } else {
        document.getElementById("response").innerHTML = "";
        node = document.createTextNode("Incorrect.");
        para.appendChild(node);
        responseElement.appendChild(para);
    }
}

function loadPastGames() {
    var today = new Date();
    var pastDate = new Date(today);
    var contentElement = document.getElementById("pastGames");
    
    for (let i = 0; i < getTodaysNumber(); i++){
        pastDate.setDate(pastDate.getDate() - 1);
        var date = pastDate.toLocaleDateString();
        
        para = document.createElement("p");
        node = document.createTextNode("");
        node = document.createTextNode(date + " : " + mydata[getTodaysNumber()-1-i].ArtistName + " - " + mydata[getTodaysNumber()-1-i].SongName);
        para.appendChild(node);
        contentElement.appendChild(para);
    }
}
