import React, { useState, useEffect, useContext } from "react";
// import queryString from 'query-string'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Link
} from "react-router-dom";
import { Button, Alert, Nav, Form, Col, InputGroup, Row, FormControl, Container, Table } from 'react-bootstrap'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

// import { baseUrl } from '../config'
// import { AuthContext } from "../contexts";

const position = [51.505, -0.09]

function Home(props) {
    const { search } = useLocation()
    // const urlparams = queryString.parse(search)
    const [init, setinit] = useState(false)
    const [query, setQuery] = useState("")
    // const { user, setUser } = useContext(AuthContext);
    
    // var map = L.map('map').setView([51.505, -0.09], 13)
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '© OpenStreetMap'
    // }).addTo(map);

    var id, target, options;

    function success(pos) {
      var crd = pos.coords;
    
      if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
        console.log('Congratulations, you reached the target');
        navigator.geolocation.clearWatch(id);
      }
      else {
          console.log('current latitude: ' + crd.latitude + ', longitude:' + crd.longitude);
      }
      var convertedTime = new Date(pos.timestamp).toLocaleTimeString("en-US")
      console.log('retrieval time: ' + convertedTime);
    }
    
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }
    
    target = {
      latitude : 24.779918428516684,
      longitude: 121.02131832961072
    };
    
    options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 4000
    };
    
    id = navigator.geolocation.watchPosition(success, error, options);

    useEffect(() => {
    }, []);


    return (
        <>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
                    integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
                    crossorigin=""/>
            <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
                    integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
                    crossorigin=""></script>
            <div className="App">
                {
                    // (user)?<h1>Hello, {user}</h1>:""
                }
                <h1>Your location</h1>
            </div>
            <div id='map'>
                <MapContainer center={[24.7892169, 121.0025083]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
            
            <br />
            <Container>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
}

export default Home;
