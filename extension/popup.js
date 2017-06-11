var background = chrome.extension.getBackgroundPage();
var tracks = background.tracks;

function addElement(source, value)
{
    $("tbody").append("<tr><td>"+source+"</td><td>"+value+"</td>");
}

//sets visibility of modal
function overlay() {
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}


function displayTracks(tracksIn){

for (var j = 0; j < tracksIn.length; j++){
addElement(tracksIn[j].url, tracksIn[j].value, tracksIn[j].link);
}
}

$( document ).ready(function() {
	updateValues();

    displayTracks(tracks);
    var linkClicks = $('.linkClickOpen');
    //creates event listener for each of the linkclickopen classes
    //then when the button for that class is clicked it will update the value of the submit button on the modal to the link of that whatever the fuck it was i forgot what i was typing
    for (var j = 0; j<linkClicks.length; j++){
    	linkClicks[j].addEventListener('click', function(button) {
    	console.log(button);
    	console.log(button.target.attributes.value.nodeValue);
    	var submitButton = document.getElementById('submitButton');
    	submitButton.value = button.target.attributes.value.nodeValue;
        overlay();
    });
    }
    
    //sets different method for closing
    //why?
    //fuck you
    //thats why 
    var linkClickClose = document.getElementById('linkClickClose');
    linkClickClose.addEventListener('click', function() {
        overlay();
    });


});

function updateValues(){
	for(var i = 0; i < tracks.length; i++){
		$.get('http://107.170.183.114:8000/getTrackValueByURL', {url: tracks[i].url}, 
			function(data){
				console.log(data);

				for(var j = 0; j < tracks.length; j++){
					if(data.url === tracks[j].url){
						tracks[j].value = data.value;
						console.log("value updated");
					}
				}	
			});
	}
}
