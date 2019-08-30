import React ,{ Component } from 'react';
import propTypes from 'prop-types';
import {Col, Row, Container} from 'react-bootstrap';
import { withRouter } from 'next/router';

class ApplicationRowItem extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        const applicationId = this.props.router.query.application_id;
        
        const url = `https://metabase-wksv3k-dev.pathfinder.gov.bc.ca/public/dashboard/bb6a4b75-3a7f-4fab-9268-cb013ecfcb7b?application_id=${applicationId}`;

        return(
            <React.Fragment>
              <div>
                <Container>
                    <iframe
                        src={url}
                        frameBorder="0"
                        width="100%"
                        height="1000"
                        allowtransparency="true">
                    </iframe>
                </Container>
                <hr/>
            </div>
          </React.Fragment>
        )
    }
}

export default withRouter(ApplicationRowItem);
