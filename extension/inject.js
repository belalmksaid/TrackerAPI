var track = {};

track.selectors = [];

var selection = window.getSelection();
selection = selection.baseNode;

var value = selection.data;
var retData;

track.value = value;

console.log("Value:" + value);

selection = selection.parentElement;
while(true){
	var newSelector = {
		tag: selection.tagName,
		classes: []	
	};

	for(var i = 0; i < selection.classList.length; i++)
		newSelector.classes.push(selection.classList[i]);

	track.selectors.push(newSelector);

	selection = selection.parentElement;
	
	if(!selection)
		break;
}

track.url = location.href;

var xhr = new XMLHttpRequest();
xhr.open('POST', 'http://107.170.183.114:8000/createTrack');
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.addEventListener('load', function() {
	var data = JSON.parse(xhr.responseText);

	var track = {
		url: data.url,
		value: data.value,
		link: data.key
	};

	retData = JSON.parse(xhr.responseText);
	console.log(JSON.parse(xhr.responseText));
}, false);

xhr.send(JSON.stringify(track));

JSON.stringify(track);
