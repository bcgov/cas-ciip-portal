import React , { Component } from 'react'
import * as SurveyJSCreator from "survey-creator";
import "survey-creator/survey-creator.css";
import {graphql, QueryRenderer, commitMutation} from "react-relay";
import initEnvironment from '../../lib/createRelayEnvironment';
const environment = initEnvironment();

class SurveyCreator extends Component {

    constructor(props){
        super(props);
        this.createFormJson = graphql`
            mutation SurveyCreatorMutation ($input: CreateFormJsonInput!){
                createFormJson(input:$input){
                    formJson{
                        rowId
                    }
                }
            }
        `;
    }

    componentDidMount() {
        let options = { showEmbededSurveyTab: true };
        this.surveyCreator = new SurveyJSCreator.SurveyCreator(
            "surveyCreatorContainer",
            options
        );
        this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
    }


    render() {
        return (
            <React.Fragment>
                <div id="surveyCreatorContainer" />
            </React.Fragment>
        );
    }

    saveMySurvey = (field, field_value) => {

        const formJson = JSON.parse(this.surveyCreator.text);
        const variables =
            {
                "input": {
                    "formJson": {
                        "name": formJson.title,
                        "formJson": JSON.stringify(formJson)
                    }
                }
            };
        const mutation = this.createFormJson
        commitMutation(
            environment,
            {
                mutation,
                variables,
                onCompleted: (response, errors) => {
                    console.log('Response received from server.', response);
                    alert('Form Created');
                },
                onError: err => console.error(err),
            },
        );
    }



}

export default SurveyCreator;