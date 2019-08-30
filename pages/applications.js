import React , { Component } from 'react'
import ApplicationList from "../components/Applications/ApplicationList";
import Header from '../components/Header'
import {Container, Row, Col, DropdownButton, Dropdown, Jumbotron} from "react-bootstrap";

class Applications extends Component {

    render(){
       return(
           <React.Fragment>
               <Header/>
               <Container>
                  <h1>Applications</h1>
                  <hr/>
                  <br/>
                  <br/>
                  <ApplicationList/>
               </Container>
           </React.Fragment>
       )
    }
}

export default Applications;
