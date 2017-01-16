// Víctor D. 2017 
var app = {
	inicio: function() {
		this.iniciaFastClick();
	},

	iniciaFastClick: function() {
		FastClick.attach(document.body);
	},

	dispositivoListo: function() {
		navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion); //, {enableHighAccuracy: true, timeout: 20000, maximumAge: 18000000 });
		//alert('3');
	},


	pintaCoordenadasEnMapa: function(position) {
		// 'L' hace referencia a un objeto de la librería leaflet.js
		var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmljdG9yZCIsImEiOiJjaXh6YTN5MmUwMDhyMzFxdXZzOHN5czAzIn0.fwRRzjHwAnyt-MyVYcGyhg', {
      		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		    maxZoom: 18
    	}).addTo(miMapa);

    	app.pintaMarcador([position.coords.latitude, position.coords.longitude], "¡Estoy aquí!", miMapa);

    	miMapa.on('click', function(evento) {
    		var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2) + ')';
    		app.pintaMarcador(evento.latlng, texto, miMapa);
    	});
    },


    


    pintaMarcador: function(latlng, texto, mapa) {
    	var marcador = L.marker(latlng).addTo(mapa);
    	marcador.bindPopup(texto).openPopup();
    },

	errorAlSolicitarLocalizacion: function(error) {
		alert('5');
		console.log(error.code + ': ' + error.message);
	}
};


if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function () {
		//alert('1');
		app.inicio();	
	}, false);

	document.addEventListener('deviceready', function () {
		//alert('2');
		app.dispositivoListo();	
	}, false);
}

