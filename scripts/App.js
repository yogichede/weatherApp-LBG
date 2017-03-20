import React, {Component} from 'react';
import axios from 'axios';
import { Column, Table } from 'react-virtualized';
//import 'react-virtualized/styles.css';

const list = [
  { version: 'Brian Vaughn', subversion: 'Software engineer', conditions: 'Software engineer',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
 { version: 'Brian Vaughn', subversion: 'Software engineer', conditions: 'Software engineer',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
 { version: 'Brian Vaughn', subversion: 'Software engineer', conditions: 'Software engineer',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
{ version: 'Brian Vaughn', subversion: 'Software engineer', conditions: 'Software engineer',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
{ version: 'Brian Vaughn', subversion: 'Software engineer', conditions: 'Software engineer',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'}, 
{ version: 'Brian Vaughn', subversion: 'Software engineer', conditions: 'Software engineer',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
  // And so on... 
];
export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      responceData: null,
      Selectedlocation: null
    };
    
  }

  /*
cellRenderer=  ({ columnIndex, key, rowIndex, style }) => {
  debugger;
  return (
    <div
      key={key}
      style={style}
    >
      {list[rowIndex][columnIndex]}
    </div>
  )  
}*/

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
      <div>
      <Table
        width={500}
        height={400}
        headerHeight={50}
        rowHeight={40}
        rowCount={list.length}
        rowGetter={({ index }) => list[index]}
  >
    <Column
      label='Name'
      dataKey='version'
      width={100}
    />
    <Column
      width={100}
      label='Subversion'
      dataKey='subversion'
    />
        <Column
      width={100}
      label='Conditions'
      dataKey='conditions'
    />
        <Column
      width={100}
      label='EffectiveDate'
      dataKey='EffectiveDate'
    />
        <Column
      width={100}
      label='Experidate'
      dataKey='ExpDate'
    />
        <Column
      width={100}
      label='Received'
      dataKey='Received'
    />
  </Table>
       </div>
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
