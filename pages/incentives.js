import React , { Component } from 'react'
import Header from '../components/Header'
import {Container, Row} from "react-bootstrap";
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
                        <h2>Incentive Payout for Application #6</h2>
                    </Row>
                    <br/>
                    <Row>
                        <IncentiveCalculatorContainer/>
                    </Row>
                </Container>

           </React.Fragment>
       )
    }
}

export default Incentives;


