import './App.css';
import Weather from './app_component/weather.component.jsx/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css'
import React from 'react';
import Form from './app_component/weather.component.jsx/form.component';



//api call api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key};



class App extends React.Component{

  constructor(){
    super();
    this.state={
    city:undefined,
    country:undefined,
    icon:undefined,
    main:undefined,
    temp_celcius:undefined,
    temp_max:undefined,
    temp_min:undefined,
    description:'',
    error:false,
     };


    this.weatherIcon={
      Thunderstorm:'wi-thunderstorm',
      Drizzle:'wi-sleet',
      Rain:'wi-storm-showers',
      Snow:'wi-snow',
      Atmosphere:'wi-fog',
      Clear:'wi-day-sunny',
      Clouds:'wi-day-fog',
    }
  }

  calCelcius(temp){
    let cell=Math.floor(temp-273.15);
    return cell;
  }

  get_WeatherIcon(icons,rangeID){
    switch(true){
      case rangeID>=200 && rangeID<=232:
        this.setState({icon:this.weatherIcon.Thunderstorm})
       break;

      case rangeID>=300 && rangeID<=321:
        this.setState({icon:this.weatherIcon.Drizzle})
      break;

      case rangeID>=500 && rangeID<=531:
        this.setState({icon:this.weatherIcon.Rain})
      break;

      case rangeID>=600 && rangeID<=622:
        this.setState({icon:this.weatherIcon.Snow})
      break;

      case rangeID>=701 && rangeID<=781:
        this.setState({icon:this.weatherIcon.Atmosphere})
      break;

      case rangeID===800 :
        this.setState({icon:this.weatherIcon.Clear})
      break;

      case rangeID>=801 && rangeID<=804:
        this.setState({icon:this.weatherIcon.Clouds})
      break;

      default:
        this.setState({icon:this.weatherIcon.Clouds})



          


    }
  }


  getWeather= async(e)=>{
    e.preventDefault();
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;


    if(!city && !country){
      this.setState({error:true})
      return;
    }
    else if(!city || !country){
      this.setState({error:true})
      return;
      
    }
    
    
    const apicall= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.REACT_APP_API_KEY}`);

    const responce=await apicall.json();
    if(responce.cod==404)
    return;

    console.log(responce);
    this.setState({
      city:`${responce.name}, ${responce.sys.country}`,
      temp_celcius: this.calCelcius(responce.main.temp),
      temp_max: this.calCelcius(responce.main.temp_max),
      temp_min: this.calCelcius(responce.main.temp_min),
      description: responce.weather[0].description,
      error:false,
    
    })
   
    this.get_WeatherIcon(this.weatherIcon,responce.weather[0].id);

  }

  state={};
  render(){
    return(
      <div className="App">
       <Form loadWeather={this.getWeather} error={this.state.error}/>
      <Weather city={this.state.city} country={this.state.country} temp_celcius={this.state.temp_celcius} temp_max={this.state.temp_max} temp_min={this.state.temp_min} description={this.state.description} weatherIcon={this.state.icon}/>
      </div>

    );
  }
}




export default App;
