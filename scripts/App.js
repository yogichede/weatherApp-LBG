import React, {Component} from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      responceData: null,
      Selectedlocation: null
    };
  }
/** This function will conce user select the state/country */
  handleChange=(event)=> {
    this.fetchWeatherData(event.target.value);
  }

  /* This function used to fect the data for the selected state/country */
  fetchWeatherData=(location)=>{
    let appId = 'd3feff68009b302029cd0506be19585a';
    return new Promise((resolve, reject)=>{
      if(!location){
        return reject('No Location provided');
      }
      let enCodedLoaction = encodeURIComponent(location);
      let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + enCodedLoaction + '&appid=' + appId;
      axios.get(url).then(response=> {
          console.log('SuccessData', response.data);
          this.setState({
            responceData: response.data,
            Selectedlocation: location
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }
  render() {
    let gridView = null;
    if(this.state.responceData){
    gridView = this.state.responceData.list.map((data, i)=>{
      return (
        <div className='grid-view' key={i}>
          <div>Date: {data.dt_txt}</div>
          <div>Humidity : {data.main.humidity}</div>
          <div>Pressure : {data.main.pressure}</div>
          <div>Temperature : {data.main.temp}</div>
          <div>Wind : {data.wind.deg}°</div>
        </div>
      );
    });
  }
    return (
      <div>
        <div className='state-list'>
          <label>Slect State </label>
          <select ref='data' className='select-list'
            onChange={this.handleChange}>
            <option >Select State</option>
            <option value='Chennai'>Chennai</option>
            <option value='AndhraPradesh'>AndhraPradesh</option>
            <option value='Banglore'>Banglore</option>
            <option value='Delhi'>Delhi</option>
            <option value='Telangana'>Telangana</option>
          </select>
        </div>
        <div>
        {
        (this.state.responceData) ?
          <div>
           <div className='location-name'>
            <p className='description'> 5 day / 3 hour forecast data for {this.state.Selectedlocation} </p>
          </div>
          <div className='well location-details'>
            <div className='row'>
              {gridView}
            </div>
        </div>
      </div>
    : null
          }
        </div>
      </div>
    );
  }
}
