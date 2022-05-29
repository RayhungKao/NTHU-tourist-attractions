import React, { useState,useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Alert, Navbar,Nav,NavDropdown} from 'react-bootstrap'
import logo from './logo.svg';
import PoI from './pages/PoI'

// import LoadingOverlay from 'react-loading-overlay';

import './App.css';
function App() {
  const [loading,setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [user, setUser] = useState(null);

  function alertFunction(data){
    setAlertMessage(data)
    setTimeout(()=>{
        setAlertMessage(null)
    },3000)
  }
  function alertSuccessFunction(data){
    setSuccessMessage(data)
    setTimeout(()=>{
      setSuccessMessage(null)
    },10000)
  }

  return (
    <>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"/>
    {/* <AuthContext.Provider value={{user, setUser}}> */}

    <Router> 
    {/* <LoadingOverlay
            active={loading}
            spinner
            text='Loading...'
            > */}
      <div style={{ height: "100vh"}}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Rocket
        </Navbar.Brand>
        <Nav>
          <NavDropdown title="Account" id="basic-nav-dropdown">
            {
              (user)?<NavDropdown.Item href="/">Logout</NavDropdown.Item>:<NavDropdown.Item href="/login">Login</NavDropdown.Item>
            }
            <NavDropdown.Item href="/register">Create Account</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
      <br />
      {alertMessage ?
        <Alert variant={'danger'} style={{marginLeft:"20%",marginRight:"20%"}}>
            {alertMessage}
        </Alert>
        :""
      }
      {successMessage ?
        <Alert variant={'info'} style={{marginLeft:"20%",marginRight:"20%"}}>
            {successMessage}
        </Alert>
        :""
      }

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/NTHU-tourist-attractions">
            <PoI setLoading={setLoading} alertFunction={alertFunction} alertSuccessFunction={alertSuccessFunction}/>
          </Route>
        </Switch>
    </div>
      
      {/* </LoadingOverlay> */}

    </Router>
    
    {/* </AuthContext.Provider> */}
    </>
  );
}

export default App;
