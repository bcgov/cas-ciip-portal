import React , { Component } from 'react'
import Header from '../components/Header'
import {Container, Row, Col, DropdownButton, Dropdown, Jumbotron} from "react-bootstrap";
import IncentiveCalculatorContainer from "../containers/Incentives/IncentiveCalculator";

class Incentives extends Component {

    constructor(props) {
        super(props);
    }


    render(){
       return(
           <React.Fragment>
                <Header/>
                <Container>
                    <Row>
                        <h1>Incentives</h1>
                        <IncentiveCalculatorContainer/>
                    </Row>
                </Container>

           </React.Fragment>
       )
    }
}

export default Incentives;


