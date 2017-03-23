import React, { Component, PropTypes } from 'react';

//import FriendListItem from '../FriendListItem';
// import './FriendList.scss';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

var list = [
  { version: 'Brian Vaughn', subversion: 'Software', conditions: 'Software ',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
 { version: 'Brian Vaughn', subversion: 'Software ', conditions: 'Software ',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
 { version: 'Brian Vaughn', subversion: 'Software ', conditions: 'Software ',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
{ version: 'Brian Vaughn', subversion: 'Software ', conditions: 'Software ',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
{ version: 'Brian Vaughn', subversion: 'Software ', conditions: 'Software ',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
{ version: 'Brian Vaughn', subversion: 'Software ', conditions: 'Software ',EffectiveDate:"23/04/22",ExpDate: '22/05/22',Received:'20/11/22'},
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
      list: list
    };
  }
  renderCustomHeader=(props)=>{
    console.log('props', props);
    let header = (
      <div>
        {props.label}
        <input type='text' onChange={(e)=> {
          let filtered = list.filter(a=> a.version === e.target.value);
          this.setState({list: filtered});
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
        />
        <Column
        width={300}
        label='Subversion'
        dataKey='subversion'
        />
        <Column
        width={200}
        label='Conditions'
        dataKey='conditions'
        />
        <Column
        width={200}
        label='EffectiveDate'
        dataKey='EffectiveDate'
        />
        <Column
        width={200}
        label='Experidate'
        dataKey='ExpDate'
        />
        <Column
        width={200}
        label='Received'
        dataKey='Received'
        />
      </Table>
      </div>
    );
  }
}
