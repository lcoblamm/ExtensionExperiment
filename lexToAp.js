
var replaceText = function (origText, newText, node) {
	switch (node.nodeType) {
		case 1: // Element
		case 9: // Document
		case 11: // DocumentFragment
			var children = node.childNodes;
			for (var i = 0; i < children.length; i++)
			{
				replaceText(origText, newText, children[i]);
			}
			break;
		case 3: // Text
			var v = node.nodeValue;
			v = v.replace(new RegExp(origText, "g"), newText);
			node.nodeValue = v;
			break;
		}
}

chrome.runtime.onMessage.addListener(function(message) {
	if (message.type == "replaceText") {
		replaceText("Lexmark", "Aperture Science", document.body);
	}
});

chrome.runtime.sendMessage({ type: "requestReplace"});
