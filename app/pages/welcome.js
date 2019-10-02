import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import IndustryUser from '../containers/Industry/IndustryUser';
import Header from '../components/Header';

class Welcome extends Component{
    render(){
        return(
            <div>
            <Header/>
            <Container>
                <IndustryUser/>
            </Container>
            </div>
        );
            
        
    }
}
export default Welcome;