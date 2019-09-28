const descElement = document.querySelector(".temperature-description");
const tempElement = document.querySelector(".temperature-value");
const tempMinElement = document.querySelector(".temperaturemin-value");
const tempMaxElement = document.querySelector(".temperaturemax-value");
const umiditElement = document.querySelector(".umidit-value");
const cittElement = document.querySelector(".citt");

const weather= {};

//GEOLOCALIZZAZIONE
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

//Ottengo i dati della posizione
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather2(latitude,longitude);
}

//Errore se c'è un problema con il servizio di geolocalizzazione
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

//funzione in base ai dati ottenuti dalla geolocalizzazione
function getWeather2(latitude,longitude){
  //codice dell'API
  const apiKey= '59d3570ee96f6ea2474936cfbd8ec056';
  let apiCall= `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  ricercadati(apiCall);
}

//funzione per ottenere i dati
function ricercadati(api){
  fetch(api)
      .then(function(response){
        //memorizzo in una variabile i dati dell'API
        let data=response.json();
        return data;
      })
      .then(function(data){
        weather.description=data.weather[0].description;
        weather.city=data.name;
        weather.temperature= Math.floor(data.main.temp - 273);
        weather.temperatureMin= Math.floor(data.main.temp_min - 273);
        weather.temperatureMax= Math.floor(data.main.temp_max - 273);
        weather.umidita=data.main.humidity;
      })
      .then(function(){
        displayWeather();
      });

//funzione che stampa a monitor i dati ottenuti
function displayWeather(){
  cittElement.innerHTML=weather.city;
  tempElement.innerHTML="current temperature: " + weather.temperature +" °C";
  descElement.innerHTML=weather.description;
  tempMinElement.innerHTML="minimum temperature: " + weather.temperatureMin +" °C";
  tempMaxElement.innerHTML="maximum temperature: " + weather.temperatureMax +" °C";
  umiditElement.innerHTML="current humidity: " + weather.umidita + "%";
  }
}

//Funzione per la ricerca della città tramite il testo Invio
function tasto(){
  var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    //keyCode = tasto Invio
    if (keyCode === 13){
      getWeather();
    }
}

function getWeather(){
        //codice dell'API
        const apiKey= '59d3570ee96f6ea2474936cfbd8ec056';
        //prende il valore della città (stringa in questo caso)
        var city= document.getElementById('weath').value;
        //URL da cui prendere i dati del meteo
        var apiCall='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey;

        fetch(apiCall).then(response => {
            if (response.ok) {
              ricercadati(apiCall);
            }else{
                if (response.status == 400 ) {
                  window.alert("NON HAI INSERITO NESSUNA CITTA'");
                }else
                      window.alert("QUESTA CITTA' NON ESISTE");
                  }
              })
}
