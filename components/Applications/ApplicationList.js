import React ,{ Component } from 'react'
import {graphql, QueryRenderer} from "react-relay";
import initEnvironment from '../../lib/createRelayEnvironment';
import ApplicationRowItem from "./ApplicationRowItem";
const environment = initEnvironment();


class ApplicationList extends Component {

    constructor(props) {
        super(props);
    }

    listApplications = ({error, props}) => {
        console.log('ApplicationList.js > listApplications()', props, error);
        const applicationList = [];
        if(props){
            const allApplications = props.allApplications.nodes;
            allApplications.forEach((application) => {
                applicationList.push(<ApplicationRowItem application={application}/>);
            })
        }
        // Sort applications by operator name?
        applicationList.sort((a,b) => {
            const nameA = a.props.application.operatorName.toLowerCase();
            const nameB = b.props.application.operatorName.toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1
            if (nameA > nameB)
                return 1
            return 0
        })
        return applicationList;
    }

    render(){
        return(
            <QueryRenderer
                environment={environment}
                query={graphql`
                    query ApplicationListQuery {
                        allApplications{
                            nodes{
                              applicationId
                              facilityName
                              operatorName
                              applicationStatus
                            }
                        }
                    }
                `}
                render={this.listApplications}
            />
        )
    }

}

export default ApplicationList;
