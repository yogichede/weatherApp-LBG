import React, { Component, PropTypes } from 'react';

import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

var list = [
  { version: 'Brian Vaughn1', subversion: 'Software', conditions: 'Software ',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
 { version: 'Brian Vaughn2', subversion: 'Software ', conditions: 'Software ',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
 { version: 'Brian Vaughn3', subversion: 'Software ', conditions: 'Software ',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
{ version: 'Brian Vaughn4', subversion: 'Software ', conditions: 'Software ',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
{ version: 'Brian Vaughn5', subversion: 'Software ', conditions: 'Software ',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
{ version: 'Brian Vaughn6', subversion: 'Software ', conditions: 'Software ',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
  // And so on...
];

export default class FriendList extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    friends: PropTypes.array.isRequired
  };
  constructor(props){
    super(props);
    this.state = {
      list: list,
      sortDirection: 'ASC',
    };
  }
  renderCustomHeader=(props)=>{
    console.log('props', props);
    let header = (
      <div>
        {props.label}
        <input type='text' onChange={(e)=> {
          if(e.target.value){
            let filtered = list.filter(a=> a[props.dataKey] === new RegExp(e.target.value));
            this.setState({list: filtered});
          }
          else {
            this.setState({list:list})
          }
        }}/>
      </div>
    );
    return header;
  }
  renderList() {
    return this.props.friends.map((friend) =>
      (
        <FriendListItem
          key={friend.id}
          id={friend.id}
          name={friend.name}
          starred={friend.starred}
          {...this.props.actions} />
      )
    );
  }

  render() {
    debugger;
    return (
      <div>
      <Table
        width={1000}
        height={800}
        headerHeight={50}
        rowHeight={50}
        rowCount={this.state.list.length}
        rowGetter={({ index }) => this.state.list[index]}
        >
        <Column
        label='Name'
        dataKey='version'
        width={300}
        headerRenderer={this.renderCustomHeader}
        sortBy={this.state.sortBy}
        sortDirection={this.state.sortDirection}
        />
        <Column
        width={300}
        label='Subversion'
        dataKey='subversion'
        headerRenderer={this.renderCustomHeader}
        />
        <Column
        width={200}
        label='Conditions'
        dataKey='conditions'
        headerRenderer={this.renderCustomHeader}
        />
        <Column
        width={200}
        label='EffectiveDate'
        dataKey='EffectiveDate'
        headerRenderer={this.renderCustomHeader}
        />
        <Column
        width={200}
        label='Experidate'
        dataKey='ExpDate'
        headerRenderer={this.renderCustomHeader}
        />
        <Column
        width={200}
        label='Received'
        dataKey='Received'
        headerRenderer={this.renderCustomHeader}
        />
      </Table>
      </div>
    );
  }
}
