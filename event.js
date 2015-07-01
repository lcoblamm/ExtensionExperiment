// on click, update extension icon

var isOn = false;

var replaceTextInTab = function(tabID) {
	chrome.tabs.sendMessage(tabID, {type: "replaceText"});
};

chrome.browserAction.onClicked.addListener(function () {
	isOn = !isOn;
	chrome.browserAction.setIcon({
		path : isOn ? "aperture-science.png" : "lexAperture.png"
	});
	if (isOn) {
		// send message to all tabs to replace text
		chrome.tabs.query({}, function(tabs) {
			for (var i = 0; i < tabs.length; i++) {
				replaceTextInTab(tabs[i].id);
			};
		});
	}
});


chrome.runtime.onMessage.addListener(function(message, sender) {
	if (isOn) {
		if (message.type == "requestReplace") {
				replaceTextInTab(sender.tab.id);
		}
	}
});