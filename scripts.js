const mydata = JSON.parse(JSON.stringify(data));
const NumOfSongsSoFar = 360;
const StartDate = new Date("06/03/22");

document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    confirmAnswer();
  } else {
      document.getElementById("response").innerHTML = "";
  }
});

function confirmAnswer() {
    if (checkAnswer()){
        showResponse(true);
    } else {
        showResponse(false);
    }
}

function checkAnswer(){
    for (let i = 0; i < mydata[getTodaysNumber()].SongName.length; i++){
        //console.log(document.getElementById("guessField").value.replace(/[.,\/#!$%\^'\*;:{}=\-_`~()]/g,"").replace("&","and").toUpperCase().replace(/\s/g,''));
        //console.log(mydata[getTodaysNumber()].SongName[i].replace(/[.,\/#!$%\^'\*;:{}=\-_`~()]/g,"").toUpperCase().replace(/\s/g,''));
        
        if (document.getElementById("guessField").value.replace(/[.,\/#!$%\^'\*;:{}=\-_`~()]/g,"").replace("&","and").toUpperCase().replace(/\s/g,'') == mydata[getTodaysNumber()].SongName[i].replace(/[.,\/#!$%\^'\*;:{}=\-_`~()]/g,"").toUpperCase().replace(/\s/g,'')){
            return true;
        }
    }
    
    return false;
}

function playSong() {
    var song = new Audio();
    song.src = './Songs/' + addZerosBeforeNumber(getTodaysNumber()) + '.mp3';
    song.volume = .5;
    song.play();
}

function playOldSong(value){
    //console.log(icount);
    var oldSong = new Audio();
    oldSong.src = './Songs/' + addZerosBeforeNumber(getTodaysNumber()-value-1) + '.mp3';
    oldSong.volume = .5;
    oldSong.play();
}


function getTodaysNumber(){
    var date1 = new Date();
    
    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - StartDate.getTime();
    
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
    
    if (guessedCorrectlyBoolean){ //true
        document.getElementById("content").innerHTML = "";
        node = document.createTextNode("Correct! The answer was " + mydata[getTodaysNumber()].SongName[0] + " by " + mydata[getTodaysNumber()].ArtistName);
        para.appendChild(node);
        contentElement.appendChild(para);
        
        var iframe = document.createElement('iframe');
        iframe.src = mydata[getTodaysNumber()].SourceLink;
        iframe.width = "560";
        iframe.height="315";
        contentElement.appendChild(iframe);
        
    } else { //false
        document.getElementById("response").innerHTML = "";
        node = document.createTextNode("Incorrect.");
        para.appendChild(node);
        responseElement.appendChild(para);
    }
}

function giveUp(){
    const responseElement = document.getElementById("response");
    const contentElement = document.getElementById("content");
    para = document.createElement("p");
    node = document.createTextNode("");
    
    document.getElementById("content").innerHTML = "";
    node = document.createTextNode("The answer was " + mydata[getTodaysNumber()].SongName[0] + " by " + mydata[getTodaysNumber()].ArtistName + ". Maybe next time!");
    para.appendChild(node);
    contentElement.appendChild(para);

    var iframe = document.createElement('iframe');
    iframe.src = mydata[getTodaysNumber()].SourceLink;
    iframe.width = "560";
    iframe.height="315";
    contentElement.appendChild(iframe);
}

function hint(){
    const responseElement = document.getElementById("response");
    const contentElement = document.getElementById("content");
    para = document.createElement("p");
    node = document.createTextNode("");
    
    document.getElementById("response").innerHTML = "";
    node = document.createTextNode(mydata[getTodaysNumber()].ArtistName + " - ???");
    para.appendChild(node);
    responseElement.appendChild(para);
}

function loadPastGames() {
    if (NumOfSongsSoFar <= getTodaysNumber()){
        for (let i = 0; i < NumOfSongsSoFar; i++){
            ActuallyLoadPastGames(i);
        }
        document.getElementById("content").innerHTML = "Sorry, we're under construction for now. Check back later :)";
    } else {
        for (let i = 0; i < getTodaysNumber(); i++){
            ActuallyLoadPastGames(i);
        }
    }
}

function ActuallyLoadPastGames(i) {
    var contentElement = document.getElementById("PastGames");
    
    var today = new Date(StartDate);
    today.setDate(StartDate.getDate() + i);
    var date = today.toLocaleDateString();

    para2 = document.createElement("span");
    node2 = document.createTextNode(mydata[i].ArtistName);
    para2.appendChild(node2);
    para2.setAttribute("id", "Spoiler");
    contentElement.prepend(para2);
    
    para2 = document.createElement("span");
    node2 = document.createTextNode(" by ");
    para2.appendChild(node2);
    contentElement.prepend(para2);
    
    para2 = document.createElement("span");
    node2 = document.createTextNode(mydata[i].SongName[0]);
    para2.appendChild(node2);
    para2.setAttribute("id", "Spoiler");
    contentElement.prepend(para2);

    var pastSongButton = new Image();
    pastSongButton.src = 'PlaySmall.png';
    pastSongButton.setAttribute("id", "pastSongButton");
    var numTemp = getTodaysNumber()-i-1;
    pastSongButton.setAttribute("onclick", "playOldSong("+numTemp+");");
    //contentElement.append(pastSongButton);
    contentElement.prepend(pastSongButton);

    para = document.createElement("p");
    node = document.createTextNode(date + " : ");
    para.setAttribute("id", "pastDate");
    para.appendChild(node);
    contentElement.prepend(para);
}