var markers = [];
var buttons =[];
var places = [];
var rows = [];
var moment = 0;
//var now = Date.now()/1000;

	// Declared Funtions
	// Places Constructor function -> will create an object for each location and add the object to an array.
	function Places (name, latitude, longitude, array){
		this.name = name;
		this.latitude = latitude;
		this.longitude = longitude;
		this.spot = {};
		this.spot.lat = latitude;
		this.spot.lng = longitude;
		array.push(this);
	}

	// Button Maker function -> will create a button for every place object we please.
	function buttonMaker(place){
		var button = document.createElement('button');
		button.id = place.name;
		button.value = place.name;
		var lat = place.latitude;
		var lng = place.longitude;
		var buttonText = document.createTextNode(place.name);
		button.onclick = function(){
			title.innerHTML = button.value;
			results.innerHTML = "";
			function apiURL(lat, lng, time, i){
				var src = "https://api.forecast.io/forecast/e964d33cde30c141523b46f7f27e0007/";
				src += lat;
				src += ",";
				src += lng;
				src += ",";
				src += time;
				src += "?callback=getWeather";
				var script = document.createElement("script");
				script.src = src;
				console.log(src);
				document.head.appendChild(script);
				var forecastResults = new Forecast();
				document.head.removeChild(script);
			}
			
			function apiURLLoop(array){
				time = Math.round((Date.now()/1000));

				for(var i = 0; i < 11; i++){
					apiURL(lat, lng, time, i);
					time += 43200;
				}
			}
			apiURLLoop(rows);
		};
		button.appendChild(buttonText);
		buttonContainer.appendChild(button);
		buttons.push(button);
		
	}
	// Make Buttons function -> calls Button Maker function in every element in a give array (we use the array where we stored our places objects).
	function makeButtons(array){
		for(var i = 0; i < array.length; i++){
			buttonMaker(array[i]);
		}
	}
	// Declared Variables
	//  A Container div -> to hold all elements in our html page.
	var container = document.createElement('div');
	container.id = 'container';
	// A topbar div -> holds our buttons, search bar and logo.
	var topbar = document.createElement('div');
	topbar.id = 'topbar';
	container.appendChild(topbar);
	// A Button Container
	var buttonContainer = document.createElement('div');
	buttonContainer.id = 'buttonContainer';
	topbar.appendChild(buttonContainer);
	// Create a title
	var titleDiv = document.createElement('div');
	titleDiv.id = "titleDiv";
	container.appendChild(titleDiv);
	var title = document.createElement('h2');
	title.id = "title";
	title.innerHTML = "Rio de Janeiro";
	titleDiv.appendChild(title);
	// A Results table -> holds results for the current moment.
	var results = document.createElement("table");
	results.id = "results";
	for(var i = 0; i <= 120; i += 12){
		var tr = document.createElement("tr");
		tr.id = i;
		results.appendChild(tr);
	}
	container.appendChild(results);

	var urca = new Places('Urca', -22.955430, -43.164800, places);
	var copacabana = new Places('Copacabana', -22.9689662, -43.1844084, places);
	var ipanema = new Places('Ipanema', -22.986450, -43.205995, places);
	var leblon = new Places('Leblon', -22.987649, -43.221640, places);
	var sanca = new Places('Sanca', -22.999373, -43.264027, places);
	var joatinga = new Places('Joatinga', -23.014354, -43.290364, places);
	var barra = new Places('Barra', -23.012240, -43.323770, places);
	var reserva = new Places('Reserva', -23.012849, -43.388988, places);
	var macumba = new Places('Macumba', -23.033037, -43.4862847, places);  
	var recreio = new Places('Recreio', -23.028383, -43.464918, places);
	var prainha = new Places('Prainha', -23.040962, -43.505379, places);
	var grumari = new Places('Grumari', -23.048466, -43.524417, places);
	var guaratiba = new Places('Guaratiba', -23.067656, -43.567932, places);
	// Wiring Things Together
	// Here we call the Make Buttons function giving it our Places array. 
	makeButtons(places);
	document.body.appendChild(container);	


function Forecast(){
	this.init();
}
Forecast.prototype = {
	init: function(){
		window.getWeather = this.getWeather;
	},

	getWeather: function(data){
		var agora = Date.now()/1000;
		agora = Math.round(agora);
		var horario = data.currently.time;	

		var tempo = horario - agora;
		if(tempo >= 12){
			tempo -= 3600;
		} else {
			tempo = 0;
		}
		
		tempo = Math.round(tempo/12)*12;

		if(tempo != 0){
			tempo /= 3600;
			tempo += 1;
		}
		
		var html = "<td>" + "Time: " + tempo + "</td><td>" + data.currently.summary + "</td><td>"  + data.currently.temperature + " ºF </td><td>" + data.currently.windSpeed + " mph </td><td>" + Math.round(data.currently.precipProbability * 100) + "% </td><td>" + Math.round(data.currently.humidity * 100) + "% </td><td>" + data.currently.pressure + " mb </td>";
		document.getElementById(tempo).innerHTML = html;
	}
};	



alert(buttons);