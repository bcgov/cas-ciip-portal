import React, { Component } from 'react'
import {graphql, QueryRenderer} from "react-relay";
import initEnvironment from '../../lib/createRelayEnvironment';
import {Button , Row, Col, DropdownButton, Dropdown} from "react-bootstrap";
const environment = initEnvironment();

class FormPicker extends Component {


    constructor(props) {
        super(props);
    }


    formSelectHandler = (formId) => {
        console.log('fid',formId)
        formId && this.props.handleFormId(formId)
    }

    formSelectButton = (form) => {
        return (
            <div>
                <Dropdown.Item key={form.rowId} onClick={() => {this.formSelectHandler(form.rowId)}}>{form.name}</Dropdown.Item>
            </div>
        )
    }

    formPicker = ({error, props}) => {
        let formNodes = [];
        if(props){
            console.log('fp', props.allFormJsons.nodes)
            const allForms = props.allFormJsons.nodes;
            allForms.forEach((form) => {
                formNodes.push(this.formSelectButton(form));
            })

        }
        return (
            <div>
                <DropdownButton id="dropdown-basic-button" title="Please select a form">
                {formNodes}
                </DropdownButton>
            </div>
        )
    };

    render() {
        return (
            <React.Fragment>

                <QueryRenderer
                    environment={environment}
                    query={graphql`
                       query FormPickerQuery {
                          allFormJsons {
                            nodes {
                               rowId
                               name
                            }
                          }
                        }
                    `}

                    render={this.formPicker}
                />

            </React.Fragment>
        );
    }
}

export default FormPicker;