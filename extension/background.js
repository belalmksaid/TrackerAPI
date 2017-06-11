var tracks = [];

chrome.contextMenus.create({
	"id": "trackrbot",
	"title": "trackrbot",
	"contexts": ["selection"],
	"onclick": contextMenuClickHandler
	}, function(){
		console.log("context menu item created");
	}
);

function contextMenuClickHandler(info, tab){
	chrome.tabs.executeScript(null, {file: "inject.js"}, function(data){
		var track = JSON.parse(data[0]);
		tracks.push(track);
	});
}
