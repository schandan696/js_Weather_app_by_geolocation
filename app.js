var APPID = "7b0d7a4bf7d18cd03f1e768100c0cafb";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

function updateByGeo(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"lat=" + lat +
	"&lon=" + lon +
	"&APPID=" + APPID;
    sendRequest(url);    
}


function updateByZip(zip){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"zip=" + zip +
	"&APPID=" + APPID;
    sendRequest(url);
}

function sendRequest(url){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var data = JSON.parse(xmlhttp.responseText);
				var weather ={};
				weather.icon = data.weather[0].id;
				weather.humidity = data.main.humidity;
				weather.wind = data.wind.speed;
				weather.direction = degreesToDirection(data.wind.deg);
				weather.loc = data.name;
				weather.temp = K2C(data.main.temp);
				update(weather);
			}
		};
		xmlhttp.open("GET",url,true);
		xmlhttp.send();
}
function K2C(k){
		return k-273;
}	

function degreesToDirection(degrees){
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for( i in angles ) {
	if(degrees >= low && degrees < high){
	    console.log(angles[i]);
	    return angles[i];
	    console.log("derp");
	}
	low = (low + range) % 360;
	high = (high + range) % 360;
    }
    return "N";
    
}

function update(weather){
		wind.innerHTML = weather.wind;
		direction.innerHTML = weather.direction;
		humidity.innerHTML = weather.humidity;
		loc.innerHTML = weather.loc;
		temp.innerHTML = (weather.temp).toFixed(2);;
		icon.src = "imgs/codes/" + weather.icon + ".png";
}
function showPosition(position){
		updateByGeo(position.coords.latitude, position.coords.longitude);
}

window.onload = function (){
		temp = document.getElementById("temperature");
		loc = document.getElementById("location");
		icon = document.getElementById("icon");
		humidity = document.getElementById("humidity");
		wind = document.getElementById("wind");
		direction = document.getElementById("direction");
		
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(showPosition);
		}
		else{
				var zip = window.prompt("Could not discover your location. what is your zip code");
				updateByZip(zip);
		}
			
		
}