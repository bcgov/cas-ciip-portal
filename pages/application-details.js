import React ,{ Component } from 'react';
import propTypes from 'prop-types';
import {Col, Row, Container} from 'react-bootstrap';
import { withRouter } from 'next/router';
import IncentiveCalculatorContainer from "../containers/Incentives/IncentiveCalculator";
import Header from "../components/Header";

class ApplicationRowItem extends Component {

    constructor(props) {
        super(props);
        this.iframeRef = React.createRef();
    }

    resizeIframe(obj) {
        console.log('iframe', obj)
        obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
        // onLoad={e => setTimeout(() => {this.resizeIframe(this.iframeRef.current)}, 50)}
    }

    render(){
        const applicationId = this.props.router.query.application_id;
        const reportingYear = this.props.router.query.reportingyear;
        const bcghgid = this.props.router.query.bcghgid;

        const url = `http://localhost:3000/public/dashboard/985719f1-7eae-4c49-88a9-7d6c8edc1ad4?application_id=${applicationId}&reportingyear=${reportingYear}&bcghgid=${bcghgid}`;
       // const url = `https://metabase-wksv3k-dev.pathfinder.gov.bc.ca/public/dashboard/bb6a4b75-3a7f-4fab-9268-cb013ecfcb7b?application_id=${applicationId}&reportingYear=${reportingYear}&bcghgid=${bcghgid}`;

        return(
            <React.Fragment>
              <div>
                <Header/>
                <Container>
                    <iframe
                        ref={this.iframeRef}
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
