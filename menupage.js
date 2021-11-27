// ================================ // 
// =========== Variables ========== //
// ================================ // 

var ipServerAdress = "";
var colorLine = "";
var coloro = "";
var IsMetapel = "";

var buttonPniyot = document.getElementById('PniyotPtuchotButton');
var header = $("header");

// ================================ // 
// ======== Event Listeners ======= //
// ================================ // 
document.getElementById('PniyotPtuchotButton').addEventListener("click", PniyotPtuchotKnisa);
document.getElementById('NewPniyaButton').addEventListener("click", NewPniyaKnisa);

// ================================== // 
// ======= Load Page Function ======= //
// ================================== // 

// $('#myModal22').on('shown.bs.modal', function () {
// 	// alert('d');
// 	document.getElementById("myModal22").setAttribute("style", "z-index:99999;")

// })


function loadpage() {
	// $("#myModal22").modal("show");

	getNumOdPniyot();
	var intervalId = window.setInterval(function () {
		getNumOdPniyot();
	}, 10000);

	ChangeColor(localStorage.getItem("CurrColor"));
	//Takes the information about the user who entered
	// if (sessionStorage.getItem("isMetapel") == 'false') {
	// 	buttonPniyot.disabled = 'true';
	// 	buttonPniyot.style.opacity = '0.6';
	// };


	// if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	// 	for (var i = 0; i < 2; i++) {
	// 		document.getElementsByClassName("buttonMenu")[i].style.width = screen.availWidth / 2.5 + "px";
	// 		document.getElementsByClassName("buttonMenu")[i].style.height = screen.availWidth / 2.5 + "px";
	// 	}
	// }
	// document.getElementById("modalButtonLo").click();

	// $(".fade").hide(0).delay(500).fadeIn(250);
	// if (sessionStorage.getItem("firstKnisa") == "yes") {
	// 	sessionStorage.setItem("firstKnisa", "no");
	// 	ShowMessageAlert("ברוך הבא", "green")
	// }
}



// ====================================== // 
// ======== Change Color Function ======= //
// ====================================== // 

function ChangeColor(color) {
	if (color == "Orange") {
		ChangeColorSpecific(colorCodes.Orange, colorCodes.OrangeLine)
		colorLine = colorCodes.OrangeLine;
		coloro = colorCodes.Orange;
	} else if (color == "Red") {
		ChangeColorSpecific(colorCodes.Red, colorCodes.RedLine)
		colorLine = colorCodes.RedLine;
		coloro = colorCodes.Red;
	} else if (color == "Green") {
		ChangeColorSpecific(colorCodes.Green, colorCodes.GreenLine)
		colorLine = colorCodes.GreenLine;
		coloro = colorCodes.Green;
	} else if (color == "Blue") {
		ChangeColorSpecific(colorCodes.Blue, colorCodes.BlueLine)
		colorLine = colorCodes.BlueLine;
		coloro = colorCodes.Blue;
	}
}

function ChangeColorSpecific(color, colorLine) {
	header.attr("style", "background-image:" + color + "; ");

	document.getElementById("ShmiraShinuim1").style.backgroundImage = color;
	document.getElementById("ShmiraKoteret1").style.backgroundImage = color;
	ColorByClassName("buttonMenu", color);
	ColorByClassName("buttonMenu1", color);
}

function ColorByClassName(className, color) {
	var elements = document.getElementsByClassName(className);
	for (var i = 0, length = elements.length; i < length; i++) {
		document.getElementsByClassName(className)[i].style.backgroundImage = color;
	}
}




// ====================================== // 
// ======== moving to Schools page ======== //
// ====================================== // 

function PniyotPtuchotKnisa() {
	// alert('d');
	$("html").fadeOut(250, function () {
		window.location.assign("./PniyotPtuchot.html");
	});
}


// ====================================== // 
// ======== moving to Schools page ======== //
// ====================================== // 

function NewPniyaKnisa() {
	$("html").fadeOut(250, function () {
		window.location.assign("./newhodaa.html");
	});
}


function setCharAt(str, index, chr) {
	if (index > str.length - 1) return str;
	return str.substr(0, index) + chr + str.substr(index + 1);
}



function deleteInfo() {
	localStorage.removeItem("toUpdate");
	localStorage.removeItem("LastUserUpdate");
}

function checklocation() {
	window.location.href = "checklocation";
}


function Metzuka() {
	// Send Hodaa 
	//ShowMessageAlert("השליחה התבצעה בהצלחה", "green");

	var xmlhttp = new XMLHttpRequest();
	urlll = WSaddress + "/addHodaaMetzuka";
	xmlhttp.open("POST", urlll, false);
	xmlhttp.setRequestHeader("Content-Type", "application/json");

	xmlhttp.onreadystatechange = function (oEvent) {
		if (xmlhttp.readyState === 4) {
			//alert(localStorage.getItem("UsernameEnteredLast"));
			if (xmlhttp.status == 200) {
				document.getElementById("Metzuka").innerHTML = "נשלח";
				document.getElementById("Metzuka").style.background = colorLine;
				document.getElementById("Metzuka").disabled = true;

				setTimeout(function () {
					ShowMessageAlert("השליחה התבצעה בהצלחה", "green");
					document.getElementById("Metzuka").style.background = coloro;
					document.getElementById("Metzuka").innerHTML = "לחצן מצוקה";
					document.getElementById("Metzuka").removeAttribute("disabled");
				}, 5000);
			} else {
				ShowMessageAlert("כישלון בשליחה, נסה שנית", "red");
			}
		}
	}

	xmlhttp.send(JSON.stringify({
		"pFName": localStorage.getItem("lastUserSaknay"),
		"latit": sessionStorage.getItem("longtitudeGPS"),
		"longtit": sessionStorage.getItem("latitudeGPS")
	}));

}


function backToRashut() {

	window.location.href = "stopMaakav";
	window.location.replace("./rashut.html");
}

function getNumOdPniyot() {
	const Httpreq1 = new XMLHttpRequest();
	Httpreq1.open(
		"GET",
		WSaddress + "/getAllShiturPniyotPtuchotsp2/" + sessionStorage.getItem("KodUser"),
		false
	);
	Httpreq1.send(null);

	var allEntriesJson = JSON.parse(CryptoJS.AES.decrypt(hexToBase64(JSON.parse(Httpreq1.responseText).encryptedData), key, { iv: iv }).toString(CryptoJS.enc.Utf8));
	document.getElementById("numofPniyot").innerHTML = allEntriesJson.length;

}

function hexToBase64(hexstring) {
	return btoa(hexstring.match(/\w{2}/g).map(function (a) {
		return String.fromCharCode(parseInt(a, 16));
	}).join(""));
}

function showModalExit() {
	// $("#myModal22").modal("show");
	// $("#myModal22").style("display")

}
