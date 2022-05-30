import React, {useState, useEffect} from "react";
import "rc-tabs/assets/index.css";
import "leaflet/dist/leaflet.css";
import "../styles.css";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
// import { Map as LeafMap, TileLayer, Marker, Popup } from "react-leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import {Icon} from 'leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import userIconPng from "../assets/user.png"

function PoI(props) {
  var callback = function(key) {};

  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});
  const [userInsidePoI, setUserInsidePoI] = useState({inside: false, PoI: 0});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setUserLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
    });  
    let id = navigator.geolocation.watchPosition(success, error, options);
    console.log("======================" + id + "=========================");
    
    return ()=> {
      navigator.geolocation.clearWatch(id);
      console.log("====================== clear" + id + "=========================");
    }
  }, []);

  useEffect(() => {
    console.log('userLocation: ' + userLocation.latitude + ', ' + userLocation.longitude); 
    geofence();
  }, [userLocation])

  useEffect(() => {
    console.log('userInsidePoI.inside?: ' + userInsidePoI.inside + ', userInsidePoI.PoI: ' + userInsidePoI.PoI); 
  }, [userInsidePoI])


  function geofence() {
    var distance;
    for (var i=1; i<=8; i++){
      distance = getDistance([userLocation.latitude, userLocation.longitude], [target[i].latitude, target[i].longitude])
      console.log('i=' + i + ': distance: ' + distance);

      if (distance < 50) {
        if (userInsidePoI.inside) {
          // console.log("++++++++inside+++++++");
          continue;
        }
        else {
          props.alertSuccessFunction('Congratulations, you reached one of the PoI: ' + target[i].description);
          setUserInsidePoI( {inside: true, PoI: i} );
        }
      }
      else {
        if (userInsidePoI.inside && userInsidePoI.PoI === i) {
          props.alertSuccessFunction('You are leaving one of the PoI: ' + target[i].description);
          setUserInsidePoI( {inside: false, PoI: 0} );
        }
        else {
          // console.log("-------outside---------");
          continue;
        }
      }
    }
  }

  //Calculate distance
  function getDistance(origin, destination) {
    // return distance in meters
    var lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
  }
  function toRadian(degree) {
      return degree*Math.PI/180;
  }

  // Get user's position
  var target, options;
  
  target = {
    1: {latitude: 24.795766621401005, longitude: 120.9919832462873, description: "台達館"},
    2: {latitude: 24.795332380711834, longitude: 120.99471792945154, description: "旺宏館"},
    3: {latitude: 24.794339028676507, longitude: 120.99331733144486, description: "綜二"}, 
    4: {latitude: 24.79811232481267, longitude: 120.9910483527293, description: "清華會館"},  
    5: {latitude: 24.792459765107758, longitude: 120.99004427985564, description: "梅園"}, 
    6: {latitude: 24.78792834315937, longitude: 120.99083261427393, description: "弈園"},  
    7: {latitude: 24.793869810505374, longitude: 120.99511878432668, description: "成功湖"},
    8: {latitude: 24.79066534952453, longitude: 120.99570350574783, description: "清交小徑"}, 
  };

  function success(pos) {
    var crd = pos.coords;
    // var distance;

    console.log(crd);
    setUserLocation({latitude: crd.latitude, longitude: crd.longitude});

    // for (var i=1; i<=8; i++){
    //   distance = getDistance([crd.latitude, crd.longitude], [target[i].latitude, target[i].longitude])
    //   console.log('i=' + i + ': distance: ' + distance);

    //   if (distance < 50) {
    //     if (userInsidePoI.inside) {
    //       continue;
    //     }
    //     else {
    //       props.alertSuccessFunction('Congratulations, you reached one of the PoI: ' + target[i].description);
    //       setUserInsidePoI( {inside: true, PoI: i} );
    //     }
    //   }
    //   else {
    //     if (userInsidePoI.inside && userInsidePoI === i) {
    //       props.alertSuccessFunction('You are leaving one of the PoI: ' + target[i].description);
    //       setUserInsidePoI( {inside: false, PoI: 0} );
    //     }
    //     else {
    //       continue;
    //     }
    //   }
    // }
    var convertedTime = new Date(pos.timestamp).toLocaleTimeString("en-US")
    console.log('retrieval time: ' + convertedTime);
  }

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 1000
  };

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={callback}
      renderTabBar={() => <ScrollableInkTabBar />}
      renderTabContent={() => <TabContent />}
    >
      <TabPane tab="tab 1" key="1">
        <MapContainer class="map" selected="selected" center={[24.794543367966625, 120.99341255578466]} zoom={11} style={{ height: "90vh" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {
            (userLocation.latitude)?<Marker id="user" position={[userLocation.latitude, userLocation.longitude]} icon={new Icon({iconUrl: userIconPng, iconSize: [30, 30], iconAnchor: [12, 41]})}><Popup>User現在位置. <br /> Easily customizable.</Popup></Marker>:""
          }
          <Marker id="1" position={[target[1].latitude, target[1].longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              {target[1].description} <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="2" position={[target[2].latitude, target[2].longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              {target[2].description} <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="3" position={[target[3].latitude, target[3].longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              {target[3].description} <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="4" position={[target[4].latitude, target[4].longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              {target[4].description} <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="5" position={[target[5].latitude, target[5].longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              {target[5].description} <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="6" position={[target[6].latitude, target[6].longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              {target[6].description} <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="7" position={[target[7].latitude, target[7].longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              {target[7].description} <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="8" position={[target[8].latitude, target[8].longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              {target[8].description} <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </TabPane>
      <TabPane tab="tab 2" key="2">
        second
      </TabPane>
      <TabPane tab="tab 3" key="3">
        third
      </TabPane>
    </Tabs>
  );
}

export default PoI;
