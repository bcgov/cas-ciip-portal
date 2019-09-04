import React ,{ Component } from 'react';
import propTypes from 'prop-types';
import {Col, Row, Container} from 'react-bootstrap';
import { withRouter } from 'next/router';
import IncentiveCalculatorContainer from "../containers/Incentives/IncentiveCalculator";
import Header from "../components/Header";

class ApplicationRowItem extends Component {

    constructor(props) {
        super(props);
    }


    render(){
        const applicationId = this.props.router.query.application_id;
        const reportingYear = this.props.router.query.reportingyear;
        const bcghgid = this.props.router.query.bcghgid;

        const url = `http://localhost:3000/public/dashboard/985719f1-7eae-4c49-88a9-7d6c8edc1ad4?` +
                    `application_id=${applicationId}&reportingyear=${reportingYear}&bcghgid=${bcghgid}`;


        return(
            <React.Fragment>
              <div>
                <Header/>
                <Container>
                    <iframe
                        src={url}
                        frameBorder="0"
                        width="100%"
                        height="1000"
                    >
                    </iframe>
                    <IncentiveCalculatorContainer
                        bcghgid={bcghgid}
                        reportingYear={reportingYear}
                    />
                </Container>
                <hr/>
            </div>
          </React.Fragment>
        )
    }
}



export default withRouter(ApplicationRowItem);
