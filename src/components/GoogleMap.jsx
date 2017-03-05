import React, { Component } from 'react';
import {Button, ButtonGroup, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import {initMap, getAreaName, nearbySearch } from '../helpers/GoogleMapHelper';

const initPoint = {lat: 35.6298499, lng: 139.6798734}; // 自宅
const placeTypes = [
  {
    name : 'ATM',
    id : 'atm'
  },
  {
    name : '銀行',
    id : 'bank'
  },
  {
    name : '喫茶店',
    id : 'cafe'
  },
  {
    name : 'コンビニ',
    id : 'convenience_store'
  },
  {
    name : '薬局',
    id : 'pharmacy'
  },
  {
    name : '郵便局',
    id : 'post_office'
  },
  {
    name : '飲食店',
    id : 'restaurant'
  }
];

class GoogleMap extends Component {
  constructor(props) {
    super(props); // propsという属性についてのおまじない
    this.state = {
      locationName : '現在地を取得しています'
    };
    this.initMap = this.initMap.bind(this);
    this.nearbySearch = this.nearbySearch.bind(this);
  }
  nearbySearch(e) {
    let locationTypes = e.currentTarget.getAttribute('data-type')
    nearbySearch([locationTypes], 3000);
    placeTypes.forEach((placeType, i)=>{
      if (placeType.id === locationTypes) {
        this.setState({placeType: '付近の'+placeType.name});
      }
    })
  }
  componentDidMount() {
   this.initMap();
  }
  initMap() {
    navigator.geolocation.getCurrentPosition((position) => {
      let location = {lat:position.coords.latitude, lng:position.coords.longitude}
      initMap(document.getElementById('map'), location)
      getAreaName(location, (addr) => {
        this.setState({
          locationName: addr.formatted_address,
          placeType: ''
        });
      })
    }, () => { alert("位置情報はご利用できません。") })
  }
  render() {
    return (
      <div className='Google-map-wrapper'>
        <ButtonGroup className='Map-button-group' style={{marginBottom:'20px'}}>
          <Button bsStyle="primary" bsSize="large" onClick={this.initMap}>
            <Glyphicon glyph="screenshot" />
            &nbsp;現在位置
          </Button>
          <DropdownButton bsSize="large" title="施設を選ぶ" id="dropdown">
          {
            placeTypes.map((place_type, i)=>{
              return <MenuItem data-type={place_type.id} key={i} onClick={this.nearbySearch} >{place_type.name}</MenuItem>
            })
          }
          </DropdownButton>
        </ButtonGroup>
        <p className='location-name' style={{paddingBottom:'10px'}}>{this.state.locationName}{this.state.placeType}</p>
        <div id="map" style={{height:'100vh',width:'100vw',marginLeft:'-19px'}}></div>
      </div>
    );
  }
}

export default GoogleMap;
