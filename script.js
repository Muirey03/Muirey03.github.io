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
		if (completion != null)
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

function printLinks(links, completion = null)
{
	var i = 0;
	var comp;
	comp = function() {
		var newComp = i + 1 < links.length ? comp : completion;
		appendToTerminal("- ", whiteColor, true, function() {
			let linkElem = appendToTerminal(links[i][0] + "\n", whiteColor, true, newComp, "a");
			if (!links[i][1].startsWith("javascript:"))
				linkElem.target = "_blank";
			linkElem.href = links[i][1];
			i++;
		});
	};
	comp();
}

function printTweaks()
{
	let mainOutput = "*** My Tweaks ***\n";
	appendToTerminal("./mytweaks\n" + mainOutput, whiteColor, true, function() {
		links = [
			["Arc", "https://repo.dynastic.co/package/arc"],
			["Flow", "https://repo.packix.com/package/com.muirey03.flow"],
			["Centaur", "https://repo.packix.com/package/com.muirey03.centaur"],
			["Zenith", "https://repo.packix.com/package/com.muirey03.zenith"],
			["Cr4shed", "https://repo.packix.com/package/com.muirey03.cr4shed"]
		];
		printLinks(links, function() {
			printUsername();
		});
	});
}

function printOSSProjects()
{
	let mainOutput = "*** Open-source projects ***\n";
	appendToTerminal("./ossprojects\n" + mainOutput, whiteColor, true, function() {
		links = [
			["Cr4shed", "https://github.com/Muirey03/Cr4shed"],
			["LearnAI", "https://github.com/Muirey03/LearnAI"],
			["Amandus", "https://github.com/Muirey03/Amandus"],
			["MRYIPC", "https://github.com/Muirey03/MRYIPC"],
			["And more!", "https://github.com/Muirey03?tab=repositories"]
		];
		printLinks(links, function() {
			printUsername();
		});
	});
}

function printSecurity()
{
	let mainOutput = "*** Security research ***\n";
	appendToTerminal("./security\n" + mainOutput, whiteColor, true, function() {
		links = [
			["iOS kernel infoleak (CVE-2020-9964)", "https://muirey03.blogspot.com/2020/09/cve-2020-9964-ios-infoleak.html"],
			["VLC buffer-overflow (CVE-2020-13428)", "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-13428"],
			["IOAcceleratorFamily null-deref", "https://gist.github.com/Muirey03/8956c5a6e68b0b22677f27e174021013#file-nullderefpoc-m"],
			["IOUSBFamily race-condition", "https://github.com/Muirey03/iousbpoc"]
		];
		printLinks(links, function() {
			printUsername();
		});
	});
}

function start()
{
	setupCursor();
	printUsername();

	let mainOutput = "*** Tommy Muir (Muirey03) ***\n";
	mainOutput += "*** iOS Tweak Developer ***\n";
	appendToTerminal("./muirey03\n" + mainOutput, whiteColor, true, function() {
		links = [
			["iOS runtime modifications", "javascript:printTweaks();"],
			["Open-source projects", "javascript:printOSSProjects();"],
			["Security research", "javascript:printSecurity();"],
			["Muirey03 on GitHub", "https://github.com/Muirey03"],
			["@Muirey03 on Twitter", "https://twitter.com/Muirey03"],
		];
		printLinks(links, function() {
			printUsername();
		});
	});
}
