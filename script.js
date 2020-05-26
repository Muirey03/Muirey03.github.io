var whiteColor = "#ededed";

function htmlEntities(str)
{
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '<br>');
}

function appendToTerminal(str, color, animated = false, completion = null, elementType = "p")
{
	let terminal = document.getElementById("terminal-text");
	let p = document.createElement(elementType);
	p.style.color = color;
	terminal.appendChild(p);

	if (animated)
	{
		var id;
		var i = 0;
		id = setInterval(function() {
			p.innerHTML += htmlEntities(String(str[i]));
			if (++i >= str.length)
			{
				clearInterval(id);
				if (completion != null)
					completion();
			}
		}, 40);
	}
	else
		p.innerHTML = htmlEntities(str);

	return p;
}

function printUsername()
{
	appendToTerminal("tommy", "#4aed05");
	appendToTerminal(":", whiteColor);
	appendToTerminal("~", "#1f2eff");
	appendToTerminal("$ ", whiteColor);
}

function terminalPrint(str, completion = null)
{
	appendToTerminal(str + "\n", whiteColor, true, function() {
		printUsername();
		completion();
	});
}

function setupCursor()
{
	var hidden = false;
	setInterval(function() {
		let cursor = document.getElementById("cursor");
		if (hidden)
			cursor.style.visibility = "visible";
		else
			cursor.style.visibility = "hidden";
		hidden = !hidden;
	}, 600);
}

function start()
{
	setupCursor();
	printUsername();

	let mainOutput = "*** Tommy Muir (Muirey03) ***\n";
	mainOutput += "*** iOS Tweak Developer ***\n";
	appendToTerminal("./muirey03\n" + mainOutput, whiteColor, true, function() {
		links = [
			["@Muirey03 on Twitter", "https://twitter.com/Muirey03"],
			["Muirey03 on GitHub", "https://github.com/Muirey03"]
		];
		var i = 0;
		var comp;
		comp = function() {
			var newComp = i + 1 < links.length ? comp : printUsername;
			appendToTerminal("- ", whiteColor, true, function() {
				let linkElem = appendToTerminal(links[i][0] + "\n", whiteColor, true, newComp, "a");
				linkElem.target = "_blank";
				linkElem.href = links[i][1];
				i++;
			});
		};
		comp();
	});
}
