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
  // const [user, setUser] = useState({});
  const [userLatitude, setUserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");

  useEffect(() => {
  }, []);

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
  var id, target, options;
  
  target = {
    1: {latitude: 24.795697531770415, longitude: 120.99517208487173}, //台達館
    2: {latitude: 24.79616621645597, longitude: 120.9924249473166},   //旺宏館
    3: {latitude: 24.794543367966625, longitude: 120.99341255578466}, //綜二
    4: {latitude: 24.79811232481267, longitude: 120.9910483527293},   //清華會館
    5: {latitude: 24.792459765107758, longitude: 120.99004427985564}, //梅園
    6: {latitude: 24.78792834315937, longitude: 120.99083261427393},  //弈園
    7: {latitude: 24.793869810505374, longitude: 120.99511878432668,},//成功湖
    8: {latitude: 24.79066534952453, longitude: 120.99570350574783},  //清交小徑
  };

  function success(pos) {
    var crd = pos.coords;
    var distance;

    for (var i=1; i<=8; i++){
      distance = getDistance([crd.latitude, crd.longitude], [target[i].latitude, target[i].longitude])

      if (distance < 50) {
        // props.alertSuccessFunction('Congratulations, you reached one of the PoI')
        switch (i) {
          case 1: {
            props.alertSuccessFunction('Congratulations, you reached one of the PoI: 台達館');
            break; // 如果這裡沒有 break，則會繼續跑後面的 statement（不需要判斷有沒有符合條件）
          }
          case 2: {
            props.alertSuccessFunction('Congratulations, you reached one of the PoI: 旺宏館');
            break; // 如果這裡沒有 break，則會繼續跑後面的 statement（不需要判斷有沒有符合條件）
          }
          case 3: {
            props.alertSuccessFunction('Congratulations, you reached one of the PoI: 綜二');
            break; // 如果這裡沒有 break，則會繼續跑後面的 statement（不需要判斷有沒有符合條件）
          }
          case 4: {
            props.alertSuccessFunction('Congratulations, you reached one of the PoI: 清華會館');
            break; // 如果這裡沒有 break，則會繼續跑後面的 statement（不需要判斷有沒有符合條件）
          }
          case 5: {
            props.alertSuccessFunction('Congratulations, you reached one of the PoI: 梅園');
            break; // 如果這裡沒有 break，則會繼續跑後面的 statement（不需要判斷有沒有符合條件）
          }
          case 6: {
            props.alertSuccessFunction('Congratulations, you reached one of the PoI: 弈園');
            break; // 如果這裡沒有 break，則會繼續跑後面的 statement（不需要判斷有沒有符合條件）
          }
          case 7: {
            props.alertSuccessFunction('Congratulations, you reached one of the PoI: 成功湖');
            break; // 如果這裡沒有 break，則會繼續跑後面的 statement（不需要判斷有沒有符合條件）
          }
          case 8: {
            props.alertSuccessFunction('Congratulations, you reached one of the PoI: 清交小徑');
            break; // 如果這裡沒有 break，則會繼續跑後面的 statement（不需要判斷有沒有符合條件）
          }
          default: {
            break;
          }
        }
        console.log('i=' + i + ': distance: ' + distance);
        // navigator.geolocation.clearWatch(id);
      }
    }

    console.log('current latitude: ' + crd.latitude + ', longitude:' + crd.longitude);
    // console.log('distance: ' + distance);

    var convertedTime = new Date(pos.timestamp).toLocaleTimeString("en-US")
    console.log('retrieval time: ' + convertedTime);

    // setUser(pos.coords)
    setUserLatitude(crd.latitude)
    setUserLongitude(crd.longitude)
    
  }

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 4000
  };

  id = navigator.geolocation.watchPosition(success, error, options);


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
            (userLatitude)?<Marker id="user" position={[userLatitude, userLongitude]} icon={new Icon({iconUrl: userIconPng, iconSize: [30, 30], iconAnchor: [12, 41]})}><Popup>User現在位置. <br /> Easily customizable.</Popup></Marker>:""
          }
          <Marker id="1" position={[24.795697531770415, 120.99517208487173]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              台達館. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="2" position={[24.79616621645597, 120.9924249473166]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              旺宏館（路易莎）. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="3" position={[24.794543367966625, 120.99341255578466]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              綜二. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="4" position={[24.79811232481267, 120.9910483527293]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              清華會館. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="5" position={[24.792459765107758, 120.99004427985564]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              梅園. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="6" position={[24.78792834315937, 120.99083261427393]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              奕園. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="7" position={[24.793869810505374, 120.99511878432668]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              成功湖（寄梅亭）. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker id="8" position={[24.79066534952453, 120.99570350574783]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              清交小徑. <br /> Easily customizable.
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
